"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultUserType = searchParams.get("type") || "rider";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: defaultUserType,
    vehicleType: "",
    licenseNumber: "",
    vehiclePlate: "",
    termsAccepted: false,
    marketingOptIn: true
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect to onboarding or dashboard
        const redirectPath = formData.userType === "driver" 
          ? "/driver/onboarding" 
          : "/rider/onboarding";
        
        router.push(redirectPath);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-white">RideSync</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join RideSync</h1>
          <p className="text-gray-400">Create your account and start your smart journey</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in your details to get started with RideSync
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-500/20 bg-red-500/10">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-gray-200">I want to...</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rider" id="rider" />
                    <Label htmlFor="rider" className="text-gray-300 cursor-pointer">
                      🚗 Book Rides
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <Label htmlFor="driver" className="text-gray-300 cursor-pointer">
                      🚙 Drive & Earn
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Driver Specific Fields */}
              {formData.userType === "driver" && (
                <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white">Driver Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType" className="text-gray-200">Vehicle Type</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleType: value }))}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="sedan">🚗 Sedan</SelectItem>
                        <SelectItem value="suv">🚙 SUV</SelectItem>
                        <SelectItem value="hatchback">🚐 Hatchback</SelectItem>
                        <SelectItem value="luxury">✨ Luxury</SelectItem>
                        <SelectItem value="electric">⚡ Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber" className="text-gray-200">License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlate" className="text-gray-200">License Plate</Label>
                      <Input
                        id="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={(e) => setFormData(prev => ({ ...prev, vehiclePlate: e.target.value }))}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingOptIn}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketingOptIn: checked as boolean }))}
                  />
                  <Label htmlFor="marketing" className="text-sm text-gray-400 leading-relaxed">
                    I'd like to receive updates about new features and promotions
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}