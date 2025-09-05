import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock database
let rides: any[] = [];
let drivers = [
  {
    id: "driver-1",
    name: "Alex Johnson",
    rating: 4.9,
    vehicle: {
      type: "sedan",
      model: "Toyota Camry",
      plate: "ABC-123",
      color: "Silver"
    },
    location: {
      lat: 40.7128,
      lng: -74.0060
    },
    available: true
  },
  {
    id: "driver-2", 
    name: "Maria Rodriguez",
    rating: 4.8,
    vehicle: {
      type: "suv",
      model: "Honda CR-V",
      plate: "XYZ-789",
      color: "Black"
    },
    location: {
      lat: 40.7589,
      lng: -73.9851
    },
    available: true
  }
];

const JWT_SECRET = "your-secret-key-change-in-production";

function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { pickup, destination, rideType, scheduledTime, preferences = {} } = await request.json();

    if (!pickup || !destination) {
      return NextResponse.json(
        { error: "Pickup and destination are required" },
        { status: 400 }
      );
    }

    // Get AI route optimization
    const routeResponse = await fetch(`${request.nextUrl.origin}/api/ai/route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pickup,
        destination,
        preferences: {
          priority: preferences.priority || "fastest",
          ecoFriendly: preferences.ecoFriendly || false,
          ...preferences
        }
      })
    });

    let routeData = null;
    if (routeResponse.ok) {
      routeData = await routeResponse.json();
    }

    // Find available driver (smart matching algorithm)
    const availableDrivers = drivers.filter(d => d.available);
    if (availableDrivers.length === 0) {
      return NextResponse.json(
        { error: "No drivers available at the moment" },
        { status: 404 }
      );
    }

    // Select best driver based on proximity, rating, and preferences
    const selectedDriver = availableDrivers[0]; // Simplified selection

    // Create ride booking
    const newRide = {
      id: `ride-${Date.now()}`,
      riderId: (user as any).userId,
      driverId: selectedDriver.id,
      pickup,
      destination,
      rideType: rideType || "economy",
      status: "booked",
      scheduledTime: scheduledTime || new Date().toISOString(),
      driver: selectedDriver,
      route: routeData?.routes?.[0] || {
        name: "Standard Route",
        duration: "15-20 mins",
        distance: "8.2 mi", 
        cost: "$18.50",
        carbonFootprint: "2.3 kg CO₂"
      },
      pricing: {
        baseFare: 3.50,
        perMile: 1.85,
        perMinute: 0.35,
        estimatedTotal: parseFloat((routeData?.routes?.[0]?.cost || "$18.50").replace("$", "")),
        surge: 1.0
      },
      timeline: {
        booked: new Date().toISOString(),
        driverAssigned: new Date().toISOString(),
        estimatedPickup: new Date(Date.now() + 8 * 60000).toISOString(), // 8 minutes
        estimatedDropoff: new Date(Date.now() + 25 * 60000).toISOString() // 25 minutes
      },
      features: {
        aiRouting: true,
        realTimeTracking: true,
        carbonTracking: true,
        safetyFeatures: ["emergency button", "live tracking", "driver verification"]
      },
      createdAt: new Date().toISOString()
    };

    // Add to mock database
    rides.push(newRide);

    // Mark driver as busy
    selectedDriver.available = false;

    // Simulate real-time updates (in production, use WebSocket)
    setTimeout(() => {
      newRide.status = "driver-on-the-way";
    }, 2000);

    return NextResponse.json({
      success: true,
      message: "Ride booked successfully",
      ride: newRide,
      aiOptimization: routeData?.aiInsights || null
    }, { status: 201 });

  } catch (error) {
    console.error("Ride booking error:", error);
    return NextResponse.json(
      { error: "Failed to book ride" },
      { status: 500 }
    );
  }
}

// Get ride status
export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rideId = searchParams.get("rideId");

    if (rideId) {
      const ride = rides.find(r => r.id === rideId && r.riderId === (user as any).userId);
      if (!ride) {
        return NextResponse.json(
          { error: "Ride not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ride });
    }

    // Get user's rides
    const userRides = rides.filter(r => r.riderId === (user as any).userId);
    return NextResponse.json({ 
      rides: userRides,
      total: userRides.length
    });

  } catch (error) {
    console.error("Get rides error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rides" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}