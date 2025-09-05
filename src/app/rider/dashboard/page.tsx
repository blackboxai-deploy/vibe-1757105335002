"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function RiderDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeRide, setActiveRide] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    rideType: "",
    scheduledTime: ""
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulate active ride data
    setActiveRide({
      id: "ride-123",
      driver: {
        name: "Alex Johnson",
        rating: 4.9,
        vehicle: "Toyota Camry",
        plate: "ABC-123"
      },
      status: "on-the-way",
      estimatedArrival: "3 mins",
      currentLocation: "Main St & 5th Ave"
    });
  }, []);

  const handleQuickBook = async () => {
    if (!bookingData.pickup || !bookingData.destination) {
      alert("Please enter pickup and destination");
      return;
    }

    try {
      const response = await fetch("/api/rides/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const ride = await response.json();
        setActiveRide(ride);
        alert("Ride booked successfully!");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book ride");
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="text-xl font-bold text-white">RideSync</span>
              </Link>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Rider Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Hello, {user.firstName}!</span>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.firstName?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Active Ride Status */}
        {activeRide && (
          <Card className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <span className="mr-2">🚗</span>
                  Your Ride is {activeRide.status.replace("-", " ")}
                </CardTitle>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Driver</p>
                  <p className="text-white font-medium">{activeRide.driver.name}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-white">{activeRide.driver.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Vehicle</p>
                  <p className="text-white font-medium">{activeRide.driver.vehicle}</p>
                  <p className="text-gray-300">{activeRide.driver.plate}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  📞 Call Driver
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  💬 Message
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  📍 Track Live
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="book" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="book" className="text-gray-300 data-[state=active]:text-white">
              📍 Book Ride
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-300 data-[state=active]:text-white">
              📊 History
            </TabsTrigger>
            <TabsTrigger value="social" className="text-gray-300 data-[state=active]:text-white">
              👥 Social
            </TabsTrigger>
            <TabsTrigger value="eco" className="text-gray-300 data-[state=active]:text-white">
              🌱 Eco Impact
            </TabsTrigger>
          </TabsList>

          {/* Book Ride Tab */}
          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Booking */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">🚀 Quick Book</CardTitle>
                  <CardDescription className="text-gray-400">
                    Book your ride with AI-powered smart routing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm">📍 Pickup Location</label>
                    <Input
                      placeholder="Enter pickup location"
                      value={bookingData.pickup}
                      onChange={(e) => setBookingData(prev => ({ ...prev, pickup: e.target.value }))}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm">🎯 Destination</label>
                    <Input
                      placeholder="Enter destination"
                      value={bookingData.destination}
                      onChange={(e) => setBookingData(prev => ({ ...prev, destination: e.target.value }))}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-300 text-sm">🚗 Ride Type</label>
                    <Select value={bookingData.rideType} onValueChange={(value) => setBookingData(prev => ({ ...prev, rideType: value }))}>
                      <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue placeholder="Select ride type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="economy">🚗 Economy ($12-15)</SelectItem>
                        <SelectItem value="comfort">✨ Comfort ($18-22)</SelectItem>
                        <SelectItem value="premium">💎 Premium ($25-30)</SelectItem>
                        <SelectItem value="shared">👥 Shared ($8-12)</SelectItem>
                        <SelectItem value="eco">🌱 Eco-Friendly ($10-14)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleQuickBook} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    🎯 Book Now with AI Routing
                  </Button>
                </CardContent>
              </Card>

              {/* Smart Features */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">🧠 Smart Features</CardTitle>
                  <CardDescription className="text-gray-400">
                    AI-powered enhancements for your journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🤖",
                        title: "AI Route Optimization",
                        description: "Get the fastest route with real-time traffic analysis",
                        active: true
                      },
                      {
                        icon: "👥",
                        title: "Social Matching",
                        description: "Find riders with similar interests and destinations",
                        active: false
                      },
                      {
                        icon: "🌍",
                        title: "Multi-Modal Planning",
                        description: "Combine rides with public transport for efficiency",
                        active: false
                      },
                      {
                        icon: "🛡️",
                        title: "Safety Network",
                        description: "Enhanced safety with emergency contacts",
                        active: true
                      }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30">
                        <span className="text-2xl">{feature.icon}</span>
                        <div className="flex-1">
                          <p className="text-white font-medium">{feature.title}</p>
                          <p className="text-sm text-gray-400">{feature.description}</p>
                        </div>
                        <Badge className={feature.active ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-400"}>
                          {feature.active ? "Active" : "Available"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">47</div>
                  <div className="text-gray-300">Total Rides</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$234</div>
                  <div className="text-gray-300">Money Saved</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">4.9</div>
                  <div className="text-gray-300">Your Rating</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">📊 Recent Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400">🚗</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Downtown → Airport</p>
                          <p className="text-gray-400 text-sm">Dec {20 - index}, 2024 • 25 min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">${(18.50 + index * 2).toFixed(2)}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="text-gray-300">4.8</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">👥 Social Ride Matching</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect with fellow riders and build your community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <p className="text-gray-400 mb-4">Social features coming soon!</p>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Join Beta Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eco Impact Tab */}
          <TabsContent value="eco" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white">🌱 Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Carbon Saved This Month</span>
                      <span className="text-green-400">12.4 kg CO₂</span>
                    </div>
                    <Progress value={68} className="h-2 bg-gray-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">156</div>
                      <div className="text-sm text-gray-400">kg CO₂ Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">23</div>
                      <div className="text-sm text-gray-400">Trees Planted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">🏆 Achievement Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "🌟", name: "Eco Warrior", desc: "Saved 100kg CO₂" },
                      { icon: "🚀", name: "Early Adopter", desc: "Beta user" },
                      { icon: "👥", name: "Social Rider", desc: "5+ shared rides" },
                      { icon: "⭐", name: "5-Star Rider", desc: "Perfect rating" }
                    ].map((badge, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-gray-800/30">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="text-white font-medium text-sm">{badge.name}</div>
                        <div className="text-gray-400 text-xs">{badge.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}