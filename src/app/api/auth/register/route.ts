import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock database - In production, use MongoDB
let users = [
  {
    id: "1",
    email: "rider@demo.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "Rider",
    userType: "rider",
    phone: "+1234567890",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "driver@demo.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "Driver",
    userType: "driver",
    phone: "+1234567891",
    vehicleType: "sedan",
    licenseNumber: "DL123456",
    vehiclePlate: "ABC-123",
    createdAt: new Date().toISOString()
  }
];

const JWT_SECRET = "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      userType,
      vehicleType,
      licenseNumber,
      vehiclePlate,
      termsAccepted
    } = userData;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !userType) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "Terms and conditions must be accepted" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Validate driver-specific fields
    if (userType === "driver") {
      if (!vehicleType || !licenseNumber || !vehiclePlate) {
        return NextResponse.json(
          { error: "Driver information is required" },
          { status: 400 }
        );
      }
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      firstName,
      lastName,
      email,
      phone,
      password, // In production, hash the password
      userType,
      ...(userType === "driver" && {
        vehicleType,
        licenseNumber,
        vehiclePlate,
        isApproved: false, // Driver needs approval
        rating: 0,
        totalRides: 0
      }),
      ...(userType === "rider" && {
        rating: 0,
        totalRides: 0,
        carbonSaved: 0,
        achievementBadges: []
      }),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock database
    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id,
        email: newUser.email,
        userType: newUser.userType 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "Registration successful",
      token,
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}