"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "AI-Powered Smart Routing",
      description: "Revolutionary routing algorithm that adapts to real-time traffic, weather, and your preferences",
      icon: "🧠",
      color: "bg-blue-500"
    },
    {
      title: "Social Ride Matching",
      description: "Connect with like-minded riders and build meaningful connections while sharing your journey",
      icon: "🤝",
      color: "bg-green-500"
    },
    {
      title: "Carbon Footprint Tracking",
      description: "Make a positive environmental impact with detailed carbon tracking and eco-rewards",
      icon: "🌱",
      color: "bg-emerald-500"
    },
    {
      title: "Multi-Modal Integration",
      description: "Seamlessly combine rides, public transport, bikes, and walking for optimal journeys",
      icon: "🚌",
      color: "bg-purple-500"
    },
    {
      title: "Dynamic Group Rides",
      description: "Join or create group rides with smart coordination for similar destinations",
      icon: "👥",
      color: "bg-orange-500"
    },
    {
      title: "Safety Network Plus",
      description: "Advanced safety features with emergency contacts and AI-powered risk assessment",
      icon: "🛡️",
      color: "bg-red-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-white">RideSync</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" asChild className="text-white hover:bg-white/10">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
            Next-Generation Ride Sharing Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ride Smarter,
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Connect Better</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of transportation with AI-powered routing, social connections, 
            and environmental consciousness. Join the revolution that's redefining how we move.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-6 text-lg">
              <Link href="/auth/register?type=rider">Start Riding</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link href="/auth/register?type=driver">Become a Driver</Link>
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50M+</div>
              <div className="text-gray-400">Carbon Tons Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2.5M</div>
              <div className="text-gray-400">Connected Riders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.8%</div>
              <div className="text-gray-400">Safety Rating</div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <img 
              src="https://placehold.co/1200x600?text=Modern+ride+sharing+app+interface+with+smart+routing+and+eco+friendly+features" 
              alt="RideSync app interface showcasing smart routing and eco-friendly features"
              className="rounded-2xl shadow-2xl mx-auto border border-white/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            Revolutionary Features
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Why RideSync is Different
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We've reimagined ride-sharing with cutting-edge technology and human-centered design
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`border-gray-800 bg-gray-900/50 backdrop-blur transition-all duration-300 cursor-pointer ${
                  activeFeature === index ? 'border-blue-500 shadow-blue-500/25 shadow-lg' : 'hover:border-gray-700'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 ${features[activeFeature].color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-4xl">{features[activeFeature].icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
              <img 
                src={`https://placehold.co/400x300?text=${features[activeFeature].title.replace(/\s+/g, '+').replace(/[^a-zA-Z0-9+]/g, '')}+feature+demo`}
                alt={`${features[activeFeature].title} feature demonstration`}
                className="rounded-lg mx-auto border border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              How RideSync Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get from A to B with intelligence, sustainability, and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Smart Booking",
                description: "Book your ride with AI-powered suggestions for routes, timing, and sharing options",
                icon: "📱"
              },
              {
                step: "02", 
                title: "Intelligent Matching",
                description: "Get matched with compatible drivers and riders based on preferences and safety",
                icon: "🎯"
              },
              {
                step: "03",
                title: "Connected Journey",
                description: "Enjoy your ride with real-time tracking, social features, and environmental impact tracking",
                icon: "🚗"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 text-center group hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <div className="text-blue-400 font-mono text-sm mb-2">STEP {item.step}</div>
                  <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already discovered a smarter, more sustainable way to travel
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-white">RideSync</span>
            </div>
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 RideSync. Revolutionizing transportation with intelligence and sustainability.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}