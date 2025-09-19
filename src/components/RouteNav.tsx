import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Navigation, 
  MapPin, 
  Route, 
  Clock, 
  Car, 
  Train, 
  Plane,
  ArrowRight,
  Compass
} from "lucide-react";

interface RouteNavProps {
  onRouteSelect?: (origin: string, destination: string, travelMode: string) => void;
}

const RouteNav = ({ onRouteSelect }: RouteNavProps) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('driving');

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
    'Nagpur', 'Visakhapatnam', 'Indore', 'Thane', 'Bhopal', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi',
    'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai',
    'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior',
    'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
    'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Tiruchirappalli',
    'Bareilly', 'Mysore', 'Tiruppur', 'Goa', 'Shimla', 'Manali'
  ];

  const travelModes = [
    { id: 'driving', label: 'Car', icon: Car, description: 'Fastest route by car' },
    { id: 'train', label: 'Train', icon: Train, description: 'Railway connections' },
    { id: 'flight', label: 'Flight', icon: Plane, description: 'Air travel options' }
  ];

  const handlePlanRoute = () => {
    if (origin && destination && onRouteSelect) {
      onRouteSelect(origin, destination, travelMode);
    }
  };

  const popularRoutes = [
    { from: 'Delhi', to: 'Goa', duration: '2h 15m flight', mode: 'flight' },
    { from: 'Mumbai', to: 'Bangalore', duration: '1h 30m flight', mode: 'flight' },
    { from: 'Delhi', to: 'Agra', duration: '3h drive', mode: 'driving' },
    { from: 'Chennai', to: 'Bangalore', duration: '5h drive', mode: 'driving' },
    { from: 'Mumbai', to: 'Pune', duration: '3h drive', mode: 'driving' },
    { from: 'Delhi', to: 'Jaipur', duration: '4h drive', mode: 'driving' }
  ];

  return (
    <div className="space-y-6">
      {/* Route Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Plan Your Route
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {travelModes.map(mode => {
                const Icon = mode.icon;
                return (
                  <Button
                    key={mode.id}
                    variant={travelMode === mode.id ? "default" : "outline"}
                    onClick={() => setTravelMode(mode.id)}
                    className="h-auto p-4 flex-col gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{mode.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={handlePlanRoute}
            disabled={!origin || !destination}
            className="w-full"
            size="lg"
          >
            <Route className="w-4 h-4 mr-2" />
            Plan Route
          </Button>
        </CardContent>
      </Card>

      {/* Popular Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Popular Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularRoutes.map((route, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onRouteSelect?.(route.from, route.to, route.mode)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{route.from}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="font-medium">{route.to}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {route.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteNav;