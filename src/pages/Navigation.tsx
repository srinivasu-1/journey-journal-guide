import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Navigation as NavigationIcon, 
  Map, 
  Route, 
  Compass,
  MapPin,
  Plane
} from "lucide-react";
import RouteNav from "@/components/RouteNav";
import IndiaMap from "@/components/Map";

// Coordinates for major Indian cities
const cityCoordinates: Record<string, [number, number]> = {
  'Mumbai': [72.8777, 19.0760],
  'Delhi': [77.1025, 28.7041],
  'Bangalore': [77.5946, 12.9716],
  'Chennai': [80.2707, 13.0827],
  'Kolkata': [88.3639, 22.5726],
  'Hyderabad': [78.4867, 17.3850],
  'Pune': [73.8567, 18.5204],
  'Ahmedabad': [72.5714, 23.0225],
  'Jaipur': [75.7873, 26.9124],
  'Goa': [73.8567, 15.2993],
  'Agra': [78.0081, 27.1767],
  'Shimla': [77.1734, 31.1048],
  'Manali': [77.1892, 32.2432]
};

const Navigation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("plan");
  const [selectedRoute, setSelectedRoute] = useState<{
    origin: [number, number];
    destination: [number, number];
  } | null>(null);

  const handleRouteSelect = (origin: string, destination: string, travelMode: string) => {
    const originCoords = cityCoordinates[origin];
    const destCoords = cityCoordinates[destination];
    
    if (originCoords && destCoords) {
      setSelectedRoute({
        origin: originCoords,
        destination: destCoords
      });
      setActiveTab("map");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-adventure text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6" />
                <h1 className="text-2xl font-bold">TripMate Navigation</h1>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Plan Your Journey</h2>
            <p className="text-white/90">Find the best routes across India</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <Route className="w-4 h-4" />
              Plan Route
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-2">
              <NavigationIcon className="w-4 h-4" />
              Navigation
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Explore
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-6">
            <RouteNav onRouteSelect={handleRouteSelect} />
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <IndiaMap 
                  origin={selectedRoute?.origin}
                  destination={selectedRoute?.destination}
                  className="h-[600px] w-full"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <NavigationIcon className="w-5 h-5" />
                    Turn-by-Turn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get detailed driving directions with real-time traffic updates
                  </p>
                  <Button className="w-full">
                    Start Navigation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Nearby Places
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Find restaurants, gas stations, and attractions along your route
                  </p>
                  <Button variant="outline" className="w-full">
                    Find Places
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="w-5 h-5" />
                    Alternative Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Compare different routes and choose the best option
                  </p>
                  <Button variant="outline" className="w-full">
                    View Alternatives
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Andaman Islands'].map(destination => (
                    <div key={destination} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">{destination}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Explore
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Nearby Attractions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Route className="w-4 h-4 mr-2" />
                    Plan Multi-City Trip
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Get Current Location
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Compass className="w-4 h-4 mr-2" />
                    Discover New Places
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Navigation;