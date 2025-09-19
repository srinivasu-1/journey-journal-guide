import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Route, Clock } from "lucide-react";

interface MapProps {
  origin?: [number, number];
  destination?: [number, number];
  className?: string;
}

const IndiaMap = ({ origin, destination, className = "" }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [routeInfo, setRouteInfo] = useState<any>(null);

  // Popular Indian destinations with coordinates
  const indianDestinations = [
    { name: "Goa", coordinates: [73.8567, 15.2993] },
    { name: "Kerala Backwaters", coordinates: [76.2711, 9.9312] },
    { name: "Rajasthan (Jaipur)", coordinates: [75.7873, 26.9124] },
    { name: "Himachal Pradesh (Shimla)", coordinates: [77.1734, 31.1048] },
    { name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { name: "Delhi", coordinates: [77.1025, 28.7041] },
    { name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] },
    { name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { name: "Andaman Islands", coordinates: [92.6586, 11.7401] }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for popular destinations
    indianDestinations.forEach(dest => {
      const marker = new mapboxgl.Marker({
        color: '#3B82F6'
      })
      .setLngLat(dest.coordinates as [number, number])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${dest.name}</h3>
          <p class="text-sm text-gray-600">Popular Indian destination</p>
        </div>
      `))
      .addTo(map.current!);
    });

    // Add route if both origin and destination are provided
    if (origin && destination) {
      addRoute(origin, destination);
    }

    setShowTokenInput(false);
  };

  const addRoute = async (start: [number, number], end: [number, number]) => {
    if (!map.current) return;

    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      
      setRouteInfo({
        distance: (data.distance / 1000).toFixed(1) + ' km',
        duration: Math.round(data.duration / 60) + ' minutes'
      });

      const geojson = {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: route
        }
      };

      // Add route source and layer
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }

      map.current.addSource('route', {
        type: 'geojson',
        data: geojson
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3B82F6',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });

      // Add markers for start and end
      new mapboxgl.Marker({ color: '#10B981' })
        .setLngLat(start)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><h3 class="font-semibold">Origin</h3></div>'))
        .addTo(map.current);

      new mapboxgl.Marker({ color: '#EF4444' })
        .setLngLat(end)
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><h3 class="font-semibold">Destination</h3></div>'))
        .addTo(map.current);

      // Fit map to route
      const coordinates = route;
      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
      );

      for (const coord of coordinates) {
        bounds.extend(coord);
      }

      map.current.fitBounds(bounds, {
        padding: 50
      });

    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (showTokenInput) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Map Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To use the map feature, you need a Mapbox public token. Get one free at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={() => mapboxToken && initializeMap(mapboxToken)}
              disabled={!mapboxToken}
              className="w-full"
            >
              Initialize Map
            </Button>
          </div>
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="font-medium mb-1">💡 Pro tip:</p>
            <p>Connect to Supabase to store your API keys securely and avoid entering them manually.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      
      {routeInfo && (
        <Card className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-primary" />
                <span className="font-medium">{routeInfo.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{routeInfo.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndiaMap;