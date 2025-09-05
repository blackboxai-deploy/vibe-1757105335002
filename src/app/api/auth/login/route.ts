import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock database - In production, use MongoDB
const users = [
  {
    id: "1",
    email: "rider@demo.com",
    password: "demo123", // In production, use hashed passwords
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
  },
  {
    id: "3",
    email: "admin@ridesync.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    userType: "admin",
    phone: "+1234567892",
    createdAt: new Date().toISOString()
  }
];

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenExpiry = rememberMe ? "30d" : "7d";
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        userType: user.userType 
      },
      JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
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