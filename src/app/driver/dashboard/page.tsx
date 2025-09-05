"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DriverDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState<any>(null);
  const [rideRequests, setRideRequests] = useState<any[]>([]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Simulate ride requests
    setRideRequests([
      {
        id: "req-1",
        rider: {
          name: "Sarah Johnson",
          rating: 4.8,
          profileImage: null
        },
        pickup: "123 Main St",
        destination: "456 Oak Ave",
        distance: "2.3 mi",
        estimatedEarning: 18.50,
        estimatedTime: "12 min",
        rideType: "comfort"
      },
      {
        id: "req-2",
        rider: {
          name: "Mike Chen",
          rating: 4.9,
          profileImage: null
        },
        pickup: "Downtown Plaza",
        destination: "Airport Terminal 1",
        distance: "8.7 mi",
        estimatedEarning: 35.20,
        estimatedTime: "25 min",
        rideType: "premium"
      }
    ]);

    // Simulate current ride
    if (isOnline) {
      setCurrentRide({
        id: "ride-456",
        rider: {
          name: "Emma Davis",
          rating: 4.7,
          phone: "+1234567890"
        },
        pickup: "Central Station",
        destination: "University Campus",
        status: "in-progress",
        estimatedArrival: "8 mins",
        earning: 22.30
      });
    }
  }, [isOnline]);

  const handleGoOnline = () => {
    setIsOnline(true);
  };

  const handleGoOffline = () => {
    setIsOnline(false);
    setCurrentRide(null);
  };

  const handleAcceptRide = (rideId: string) => {
    const acceptedRide = rideRequests.find(req => req.id === rideId);
    if (acceptedRide) {
      setCurrentRide({
        ...acceptedRide,
        status: "accepted",
        id: `ride-${rideId}`
      });
      setRideRequests(prev => prev.filter(req => req.id !== rideId));
    }
  };

  const handleDeclineRide = (rideId: string) => {
    setRideRequests(prev => prev.filter(req => req.id !== rideId));
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
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Driver Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Status:</span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={isOnline ? handleGoOffline : handleGoOnline}
                />
                <Badge className={isOnline ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-400"}>
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
              <span className="text-white">Hi, {user.firstName}!</span>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.firstName?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Status Alert */}
        {!isOnline && (
          <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/20">
            <AlertDescription className="text-yellow-400">
              🟡 You're currently offline. Switch to online to start receiving ride requests.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Ride Status */}
        {currentRide && (
          <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <span className="mr-2">🚗</span>
                  Current Ride - {currentRide.status.replace("-", " ")}
                </CardTitle>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Rider</p>
                  <p className="text-white font-medium">{currentRide.rider.name}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-white">{currentRide.rider.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Route</p>
                  <p className="text-white font-medium">{currentRide.pickup}</p>
                  <p className="text-gray-300">→ {currentRide.destination}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    📞 Call Rider
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    💬 Message
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg">${currentRide.earning?.toFixed(2) || currentRide.estimatedEarning?.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">Estimated earning</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="rides" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="rides" className="text-gray-300 data-[state=active]:text-white">
              🚗 Ride Requests
            </TabsTrigger>
            <TabsTrigger value="earnings" className="text-gray-300 data-[state=active]:text-white">
              💰 Earnings
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-gray-300 data-[state=active]:text-white">
              📊 Performance
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="text-gray-300 data-[state=active]:text-white">
              🚙 Vehicle
            </TabsTrigger>
          </TabsList>

          {/* Ride Requests Tab */}
          <TabsContent value="rides" className="space-y-6">
            {isOnline ? (
              <div className="space-y-4">
                {rideRequests.length > 0 ? (
                  rideRequests.map((request) => (
                    <Card key={request.id} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {request.rider.name[0]}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{request.rider.name}</p>
                                <div className="flex items-center">
                                  <span className="text-yellow-400 mr-1">⭐</span>
                                  <span className="text-gray-300">{request.rider.rating}</span>
                                  <Badge className="ml-2 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                    {request.rideType}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <span className="text-green-400 mr-2">📍</span>
                                <span className="text-white">{request.pickup}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="text-red-400 mr-2">🎯</span>
                                <span className="text-white">{request.destination}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                              <span>📏 {request.distance}</span>
                              <span>⏱️ {request.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="text-right ml-6">
                            <div className="text-2xl font-bold text-green-400 mb-1">
                              ${request.estimatedEarning.toFixed(2)}
                            </div>
                            <p className="text-gray-400 text-sm mb-4">Estimated</p>
                            
                            <div className="flex flex-col space-y-2">
                              <Button 
                                onClick={() => handleAcceptRide(request.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Accept
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleDeclineRide(request.id)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardContent className="p-12 text-center">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-gray-400 mb-4">Looking for ride requests...</p>
                      <p className="text-gray-500 text-sm">Stay online to receive ride requests from nearby passengers</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">😴</div>
                  <p className="text-gray-400 mb-4">You're currently offline</p>
                  <Button onClick={handleGoOnline} className="bg-green-600 hover:bg-green-700">
                    Go Online
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$1,247</div>
                  <div className="text-gray-300">This Week</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$4,892</div>
                  <div className="text-gray-300">This Month</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">142</div>
                  <div className="text-gray-300">Total Rides</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">4.9</div>
                  <div className="text-gray-300">Rating</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">💰 Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <span className="text-green-400">💸</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Downtown → Airport</p>
                          <p className="text-gray-400 text-sm">Dec {20 - index}, 2024 • 8:30 PM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">${(25.50 + index * 3).toFixed(2)}</p>
                        <p className="text-gray-400 text-sm">12.3 mi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">📊 Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Acceptance Rate</span>
                      <span className="text-green-400">94%</span>
                    </div>
                    <Progress value={94} className="h-2 bg-gray-700" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Completion Rate</span>
                      <span className="text-blue-400">98%</span>
                    </div>
                    <Progress value={98} className="h-2 bg-gray-700" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Customer Satisfaction</span>
                      <span className="text-purple-400">4.9/5</span>
                    </div>
                    <Progress value={98} className="h-2 bg-gray-700" />
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
                      { icon: "⭐", name: "Top Rated", desc: "4.9+ rating" },
                      { icon: "🚀", name: "Speed Demon", desc: "Fast pickups" },
                      { icon: "🛡️", name: "Safety First", desc: "0 incidents" },
                      { icon: "💎", name: "Premium Driver", desc: "Elite status" }
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

          {/* Vehicle Tab */}
          <TabsContent value="vehicle" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">🚙 Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Vehicle Type</label>
                      <p className="text-white font-medium">{user.vehicleType || "Sedan"}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">License Plate</label>
                      <p className="text-white font-medium">{user.vehiclePlate || "ABC-123"}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">License Number</label>
                      <p className="text-white font-medium">{user.licenseNumber || "DL123456"}</p>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="https://placehold.co/300x200?text=Vehicle+Photo+Sedan" 
                      alt="Driver vehicle - sedan"
                      className="rounded-lg border border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Update Vehicle Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}