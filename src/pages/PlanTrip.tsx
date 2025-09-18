import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Plane, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const navigate = useNavigate();

  const handlePlanTrip = () => {
    if (destination && startDate && endDate) {
      navigate("/dashboard", { 
        state: { 
          selectedDestination: destination,
          startDate: startDate,
          endDate: endDate
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-sunset text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => navigate("/destinations")}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Plane className="w-6 h-6" />
                <h1 className="text-2xl font-bold">TripMate</h1>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">Plan Your Perfect Trip</h2>
            <p className="text-white/90 text-lg">Tell us where and when you want to go</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="w-6 h-6 text-primary" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Destination Input */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-lg font-medium">
                  Where do you want to go?
                </Label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Enter destination (city, country, or region)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-lg font-medium">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-medium">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Plan Button */}
              <Button 
                onClick={handlePlanTrip}
                disabled={!destination || !startDate || !endDate}
                variant="sunset"
                size="lg"
                className="w-full h-14 text-lg"
              >
                Create My Trip Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;