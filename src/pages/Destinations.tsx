import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Plane, ArrowRight } from "lucide-react";
import destinationsImage from "@/assets/destinations-grid.jpg";

const popularDestinations = [
  { name: "Bali, Indonesia", type: "Tropical Paradise", rating: 4.9, price: "From $89/day" },
  { name: "Paris, France", type: "Cultural Heritage", rating: 4.8, price: "From $120/day" },
  { name: "Tokyo, Japan", type: "Modern Adventure", rating: 4.9, price: "From $95/day" },
  { name: "Santorini, Greece", type: "Island Escape", rating: 4.7, price: "From $110/day" },
  { name: "New York, USA", type: "Urban Explorer", rating: 4.6, price: "From $130/day" },
  { name: "Dubai, UAE", type: "Luxury Experience", rating: 4.8, price: "From $140/day" },
];

const travelTypes = [
  "Adventure", "Beach", "Cultural", "Urban", "Nature", "Luxury"
];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handleDestinationSelect = (destination: string) => {
    // Navigate to dashboard with selected destination
    navigate("/dashboard", { state: { selectedDestination: destination } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-ocean text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6" />
              <h1 className="text-2xl font-bold">TripMate</h1>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              Profile
            </Button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">Where to next?</h2>
            <p className="text-white/90 text-lg">Discover amazing destinations around the world</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search destinations, countries, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-soft"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Travel Type Filters */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Travel Style</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedType === "" ? "default" : "outline"}
              onClick={() => setSelectedType("")}
              size="sm"
            >
              All Types
            </Button>
            {travelTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                size="sm"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Hero Destinations Image */}
        <div className="mb-8">
          <div 
            className="h-64 rounded-2xl bg-cover bg-center relative overflow-hidden shadow-card"
            style={{ backgroundImage: `url(${destinationsImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-2">Explore the World</h3>
                <p className="text-white/90">Top destinations waiting for you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Popular Destinations</h3>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-travel transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleDestinationSelect(destination.name)}
              >
                <div className="h-48 bg-gradient-ocean relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">{destination.name}</h4>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {destination.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Popular choice</span>
                    </div>
                    <span className="font-semibold text-primary">{destination.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-sunset text-white border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Plan a Trip</h4>
                <p className="text-white/90">Create your perfect itinerary</p>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                Start Planning
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-adventure text-white border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">Travel Guides</h4>
                <p className="text-white/90">Expert tips and recommendations</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => navigate("/guides")}
              >
                Explore Guides
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Destinations;