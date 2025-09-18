import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plane, Heart } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, handle authentication
    navigate("/destinations");
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">TripMate</h1>
            </div>
            <p className="text-white/90 text-lg">Your Ultimate Travel Companion</p>
          </div>

          {/* Login Form */}
          <Card className="backdrop-blur-sm bg-white/95 shadow-travel border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {isLogin ? "Welcome Back" : "Join TripMate"}
              </CardTitle>
              <p className="text-muted-foreground">
                {isLogin ? "Continue your adventure" : "Start your journey with us"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="h-12"
                      required
                    />
                  </div>
                )}
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="h-12"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="h-12"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full h-12"
                >
                  {isLogin ? "Continue Adventure" : "Start Journey"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "New to TripMate?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-primary hover:underline font-medium"
                  >
                    {isLogin ? "Create Account" : "Sign In"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <MapPin className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white/90 text-xs">Discover</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Plane className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white/90 text-xs">Plan Trips</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Heart className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-white/90 text-xs">Save Memories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;