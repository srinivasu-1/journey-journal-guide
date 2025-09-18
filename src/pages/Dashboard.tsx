import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Camera, 
  Calendar, 
  Users, 
  Plus, 
  Plane,
  Star,
  Clock,
  BookOpen,
  Heart,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDestination] = useState(
    location.state?.selectedDestination || "Your Next Adventure"
  );

  const currentTrips = [
    {
      id: 1,
      destination: "Bali, Indonesia",
      dates: "Dec 15-22, 2024",
      progress: 75,
      status: "Planning",
      daysLeft: 45
    }
  ];

  const recentMemories = [
    {
      id: 1,
      title: "Sunset at Tanah Lot",
      location: "Bali, Indonesia",
      date: "2 weeks ago",
      photos: 24
    },
    {
      id: 2,
      title: "Street Food Adventure",
      location: "Tokyo, Japan",
      date: "1 month ago",
      photos: 18
    }
  ];

  const recommendations = [
    {
      title: "Best Time to Visit Bali",
      type: "Guide",
      readTime: "5 min"
    },
    {
      title: "Essential Packing List",
      type: "Checklist",
      readTime: "3 min"
    },
    {
      title: "Local Transportation Tips",
      type: "Guide",
      readTime: "7 min"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6" />
              <h1 className="text-2xl font-bold">TripMate</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => navigate("/guides")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Guides
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Traveler!</h2>
            <p className="text-white/90">Ready for your next adventure?</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-ocean text-white border-0 cursor-pointer hover:shadow-travel transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">New Trip</h4>
                <p className="text-white/90 text-sm">Plan your next adventure</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-sunset text-white border-0 cursor-pointer hover:shadow-travel transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Capture Memory</h4>
                <p className="text-white/90 text-sm">Save your experiences</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-adventure text-white border-0 cursor-pointer hover:shadow-travel transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold">Explore Guides</h4>
                <p className="text-white/90 text-sm">Expert travel tips</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Trips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Current Trips</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trip
                </Button>
              </div>

              {currentTrips.length > 0 ? (
                <div className="space-y-4">
                  {currentTrips.map((trip) => (
                    <Card key={trip.id} className="shadow-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{trip.destination}</h4>
                            <p className="text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {trip.dates}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">{trip.status}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {trip.daysLeft} days left
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Planning Progress</span>
                            <span className="font-medium">{trip.progress}%</span>
                          </div>
                          <Progress value={trip.progress} className="h-2" />
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <Button variant="default" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit Trip</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-dashed">
                  <Plane className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="font-bold mb-2">No trips planned yet</h4>
                  <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
                  <Button variant="hero">Plan Your First Trip</Button>
                </Card>
              )}
            </section>

            {/* Recent Memories */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Recent Memories</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentMemories.map((memory) => (
                  <Card key={memory.id} className="overflow-hidden hover:shadow-card transition-all cursor-pointer">
                    <div className="h-32 bg-gradient-ocean relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-medium">{memory.title}</h4>
                        <p className="text-white/80 text-sm">{memory.location}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{memory.date}</span>
                        <div className="flex items-center gap-1">
                          <Camera className="w-4 h-4" />
                          <span>{memory.photos} photos</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommendations */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg hover:bg-muted cursor-pointer">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm mb-1">{rec.title}</h5>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">{rec.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" onClick={() => navigate("/guides")}>
                  View All Guides
                </Button>
              </CardContent>
            </Card>

            {/* Travel Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Travel Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Countries Visited</span>
                  <span className="font-bold text-lg">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trips Completed</span>
                  <span className="font-bold text-lg">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Memories Captured</span>
                  <span className="font-bold text-lg">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Guides Read</span>
                  <span className="font-bold text-lg">34</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;