import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Camera, 
  Utensils, 
  Plane,
  ArrowLeft,
  Heart,
  Share
} from "lucide-react";

const guideCategories = [
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "food", label: "Food & Dining", icon: Utensils },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "culture", label: "Culture", icon: BookOpen },
];

const featuredGuides = [
  {
    id: 1,
    title: "Ultimate Bali Travel Guide",
    author: "Sarah Chen",
    rating: 4.9,
    reviews: 1234,
    readTime: "12 min",
    category: "destinations",
    description: "Everything you need to know about exploring the Island of Gods",
    tags: ["Beaches", "Temples", "Culture", "Food"]
  },
  {
    id: 2,
    title: "Japanese Street Food Adventures",
    author: "Hiroshi Tanaka",
    rating: 4.8,
    reviews: 892,
    readTime: "8 min",
    category: "food",
    description: "Discover the best street food scenes across Japan",
    tags: ["Ramen", "Sushi", "Markets", "Local"]
  },
  {
    id: 3,
    title: "Photography Tips for European Cities",
    author: "Emma Rodriguez",
    rating: 4.7,
    reviews: 567,
    readTime: "15 min",
    category: "photography",
    description: "Capture stunning shots of Europe's most beautiful cities",
    tags: ["Architecture", "Golden Hour", "Street", "Landscape"]
  },
  {
    id: 4,
    title: "Cultural Etiquette Around the World",
    author: "Alex Thompson",
    rating: 4.9,
    reviews: 743,
    readTime: "10 min",
    category: "culture",
    description: "Navigate cultural differences with confidence",
    tags: ["Respect", "Customs", "Language", "Traditions"]
  }
];

const trendingGuides = [
  "Solo Travel Safety Tips",
  "Budget Travel Hacks",
  "Sustainable Tourism Guide",
  "Digital Nomad Essentials",
  "Family Travel Planning"
];

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

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
                <h1 className="text-2xl font-bold">TripMate Guides</h1>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              My Saved Guides
            </Button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Expert Travel Guides</h2>
            <p className="text-white/90">Discover insider tips from experienced travelers</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search guides, destinations, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/95 backdrop-blur-sm border-0 shadow-soft"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="all">All Guides</TabsTrigger>
            {guideCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <FeaturedGuidesSection guides={featuredGuides} />
          </TabsContent>

          {guideCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <FeaturedGuidesSection 
                guides={featuredGuides.filter(guide => guide.category === category.id)} 
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Trending Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Trending This Week</h3>
          <div className="flex flex-wrap gap-3">
            {trendingGuides.map((guide, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
              >
                {guide}
              </Badge>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <Card className="bg-gradient-ocean text-white border-0">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-2">Join Our Travel Community</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Share your experiences, get expert advice, and connect with fellow travelers from around the world.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Share Your Guide
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/20">
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FeaturedGuidesSection = ({ guides }: { guides: typeof featuredGuides }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {guides.map((guide) => (
      <Card key={guide.id} className="overflow-hidden hover:shadow-travel transition-all duration-300 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 line-clamp-2">{guide.title}</CardTitle>
              <p className="text-muted-foreground text-sm mb-3">{guide.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{guide.rating}</span>
                  <span>({guide.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">By {guide.author}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button variant="ocean" className="w-full mt-4">
            Read Guide
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Guides;