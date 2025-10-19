import React, { useEffect, useState } from 'react';
import { MapPin, Star, Camera, Mountain, Trees, Waves, Users, Phone, Globe, Clock, Navigation, Locate } from 'lucide-react';

interface TourismVenue {
  id: string;
  name: string;
  type: 'national_park' | 'cultural_site' | 'adventure' | 'wildlife' | 'waterfall' | 'lake' | 'mountain';
  description: string;
  coordinates: [number, number]; // [latitude, longitude]
  rating: number;
  reviews: number;
  activities: string[];
  bestTime: string;
  entryFee: string;
  contact?: {
    phone?: string;
    website?: string;
  };
  image: string;
  highlights: string[];
}

const ugandaTourismVenues: TourismVenue[] = [
  {
    id: '1',
    name: 'Bwindi Impenetrable National Park',
    type: 'national_park',
    description: 'Home to nearly half of the world\'s mountain gorillas, this UNESCO World Heritage site offers incredible gorilla trekking experiences.',
    coordinates: [-1.0667, 29.7833],
    rating: 4.9,
    reviews: 1250,
    activities: ['Gorilla Trekking', 'Bird Watching', 'Nature Walks', 'Cultural Visits'],
    bestTime: 'June-August, December-February',
    entryFee: '$15 + Gorilla Permit $700',
    contact: {
      phone: '+256 414 355 000',
      website: 'www.ugandawildlife.org'
    },
    image: 'https://images.unsplash.com/photo-1631317870276-8b2d0d8e7e8e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mountain Gorillas', 'Ancient Rainforest', 'UNESCO World Heritage', 'Batwa Cultural Experience']
  },
  {
    id: '2',
    name: 'Queen Elizabeth National Park',
    type: 'national_park',
    description: 'Uganda\'s most popular savanna park with diverse ecosystems, tree-climbing lions, and the famous Kazinga Channel.',
    coordinates: [-0.2, 29.9],
    rating: 4.7,
    reviews: 890,
    activities: ['Game Drives', 'Boat Safaris', 'Chimpanzee Tracking', 'Bird Watching'],
    bestTime: 'December-February, June-September',
    entryFee: '$40 per person',
    contact: {
      phone: '+256 414 355 000',
      website: 'www.ugandawildlife.org'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['Tree-climbing Lions', 'Kazinga Channel', 'Diverse Wildlife', 'Crater Lakes']
  },
  {
    id: '3',
    name: 'Murchison Falls National Park',
    type: 'waterfall',
    description: 'Uganda\'s largest national park featuring the spectacular Murchison Falls where the Nile explodes through a narrow gorge.',
    coordinates: [2.2833, 31.7167],
    rating: 4.8,
    reviews: 756,
    activities: ['Waterfall Viewing', 'Game Drives', 'Nile Boat Cruises', 'Fishing'],
    bestTime: 'December-February, June-September',
    entryFee: '$40 per person',
    contact: {
      phone: '+256 414 355 000',
      website: 'www.ugandawildlife.org'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['Murchison Falls', 'Nile River', 'Big Game', 'Boat Safaris']
  },
  {
    id: '4',
    name: 'Lake Bunyonyi',
    type: 'lake',
    description: 'One of Uganda\'s most beautiful lakes, dotted with 29 islands and surrounded by terraced hills.',
    coordinates: [-1.2833, 29.9167],
    rating: 4.6,
    reviews: 432,
    activities: ['Canoeing', 'Island Hopping', 'Swimming', 'Cultural Tours', 'Bird Watching'],
    bestTime: 'Year-round',
    entryFee: 'Free (activities charged separately)',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['29 Islands', 'Terraced Hills', 'Safe Swimming', 'Cultural Heritage']
  },
  {
    id: '5',
    name: 'Rwenzori Mountains National Park',
    type: 'mountain',
    description: 'The legendary "Mountains of the Moon" offering challenging treks to Africa\'s third-highest peak.',
    coordinates: [0.3833, 29.8667],
    rating: 4.5,
    reviews: 234,
    activities: ['Mountain Climbing', 'Hiking', 'Bird Watching', 'Photography'],
    bestTime: 'December-February, June-August',
    entryFee: '$30 per person',
    contact: {
      phone: '+256 414 355 000',
      website: 'www.ugandawildlife.org'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['Margherita Peak', 'Glacial Lakes', 'Unique Flora', 'Alpine Zones']
  },
  {
    id: '6',
    name: 'Jinja - Source of the Nile',
    type: 'adventure',
    description: 'The adventure capital of East Africa, where the Nile begins its journey to the Mediterranean.',
    coordinates: [0.4236, 33.2042],
    rating: 4.7,
    reviews: 1120,
    activities: ['White Water Rafting', 'Bungee Jumping', 'Kayaking', 'Quad Biking', 'Boat Cruises'],
    bestTime: 'Year-round',
    entryFee: 'Activity-dependent',
    contact: {
      phone: '+256 434 120 236',
      website: 'www.raftafrica.com'
    },
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Source of the Nile', 'Grade 5 Rapids', 'Bungee Jumping', 'Adventure Sports']
  },
  {
    id: '7',
    name: 'Kibale Forest National Park',
    type: 'wildlife',
    description: 'The primate capital of the world with 13 primate species including our closest relatives, the chimpanzees.',
    coordinates: [0.5667, 30.3833],
    rating: 4.8,
    reviews: 567,
    activities: ['Chimpanzee Tracking', 'Primate Walks', 'Bird Watching', 'Nature Walks'],
    bestTime: 'February-May, September-November',
    entryFee: '$30 + Chimp Permit $200',
    contact: {
      phone: '+256 414 355 000',
      website: 'www.ugandawildlife.org'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['13 Primate Species', 'Chimpanzee Tracking', 'Tropical Rainforest', 'Research Center']
  },
  {
    id: '8',
    name: 'Kasubi Tombs',
    type: 'cultural_site',
    description: 'UNESCO World Heritage site and burial ground of Buganda kings, showcasing traditional architecture.',
    coordinates: [0.3667, 32.5500],
    rating: 4.3,
    reviews: 189,
    activities: ['Cultural Tours', 'Historical Learning', 'Traditional Architecture', 'Royal Heritage'],
    bestTime: 'Year-round',
    entryFee: '$15 per person',
    contact: {
      phone: '+256 414 270 123'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    highlights: ['UNESCO World Heritage', 'Buganda Kingdom', 'Traditional Architecture', 'Royal Tombs']
  }
];

// Get venue type icon
const getVenueTypeIcon = (type: string) => {
  switch (type) {
    case 'national_park': return '🦍';
    case 'cultural_site': return '🏛️';
    case 'adventure': return '🚣';
    case 'wildlife': return '🐆';
    case 'waterfall': return '💧';
    case 'lake': return '🏞️';
    case 'mountain': return '⛰️';
    default: return '📍';
  }
};

// Get venue type color
const getVenueTypeColor = (type: string) => {
  const colors = {
    national_park: '#22c55e',
    cultural_site: '#f59e0b',
    adventure: '#ef4444',
    wildlife: '#10b981',
    waterfall: '#3b82f6',
    lake: '#06b6d4',
    mountain: '#8b5cf6'
  };
  return colors[type as keyof typeof colors] || '#22c55e';
};

interface TourismMapProps {
  selectedVenue?: string;
  onVenueSelect?: (venue: TourismVenue) => void;
}

export function TourismMap({ selectedVenue, onVenueSelect }: TourismMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('Getting location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('Location found!');
          setTimeout(() => setLocationStatus(''), 3000);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLocationStatus('Location unavailable');
          setTimeout(() => setLocationStatus(''), 3000);
        }
      );
    }
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'national_park': return <Trees className="h-4 w-4" />;
      case 'cultural_site': return <Users className="h-4 w-4" />;
      case 'adventure': return <Waves className="h-4 w-4" />;
      case 'wildlife': return <Camera className="h-4 w-4" />;
      case 'waterfall': return <Waves className="h-4 w-4" />;
      case 'lake': return <Waves className="h-4 w-4" />;
      case 'mountain': return <Mountain className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  // Create Google Maps embed URL
  const createMapUrl = () => {
    const center = '1.3733,32.2903'; // Uganda center
    const zoom = '7';
    return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${center}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="w-full h-full relative">
      {/* Embedded Google Map */}
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-triplugs-50">
        <iframe
          src={createMapUrl()}
          className="w-full h-full border-0"
          title="Uganda Tourism Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Location Status */}
      {locationStatus && (
        <div className="absolute top-4 right-4 bg-triplugs-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Locate className="h-4 w-4" />
            <span>{locationStatus}</span>
          </div>
        </div>
      )}

      {/* Venue Quick Access */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-triplugs-200">
          <h3 className="font-bold text-triplugs-900 mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Uganda Tourism Venues
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
            {ugandaTourismVenues.slice(0, 8).map((venue) => (
              <button
                key={venue.id}
                onClick={() => {
                  setSelectedMarker(venue.id);
                  onVenueSelect?.(venue);
                }}
                className={`p-2 rounded-lg text-left transition-all text-xs ${
                  selectedMarker === venue.id
                    ? 'bg-triplugs-500 text-white'
                    : 'bg-triplugs-50 hover:bg-triplugs-100 text-triplugs-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{getVenueTypeIcon(venue.type)}</span>
                  <span className="font-medium truncate">{venue.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span>{venue.rating}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Controls */}
      <div className="absolute top-4 left-4 space-y-2 pointer-events-auto">
        <button
          onClick={() => {
            if (navigator.geolocation) {
              setLocationStatus('Getting location...');
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                  setLocationStatus('Location found!');
                  setTimeout(() => setLocationStatus(''), 3000);
                },
                (error) => {
                  console.log('Geolocation error:', error);
                  setLocationStatus('Location unavailable');
                  setTimeout(() => setLocationStatus(''), 3000);
                }
              );
            }
          }}
          className="bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-triplugs-200 hover:bg-triplugs-50 transition-colors"
          title="Get My Location"
        >
          <Navigation className="h-4 w-4 text-triplugs-600" />
        </button>
      </div>
    </div>
  );
}

// Export venues data for use in other components
export { ugandaTourismVenues, type TourismVenue };