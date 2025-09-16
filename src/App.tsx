import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Truck, Wrench, Search, User, Menu, X, Star, Clock, Users, Camera, Compass, Mountain, Heart, Share2, Filter, Zap, TrendingUp, Award, MessageCircle, Bell, Globe, Wifi, Coffee, Car, Music, Shield, CheckCircle, AlertCircle, XCircle, Eye, ThumbsUp, Bookmark, Gift, CreditCard, Smartphone, Cloud, Route, MoreHorizontal, DollarSign, CloudRain, Navigation, AlertTriangle, Umbrella, Sun, Wind, Thermometer, Banknote, Calculator, MapIcon, Phone, FileText, Settings, Moon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  category: string;
  rating: number;
  attendees: number;
  organizer: string;
  image: string;
  recommendedTransport?: string[];
  recommendedEquipment?: string[];
  duration?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
}

interface Transport {
  id: string;
  provider: string;
  type: string;
  route: string;
  price: number;
  rating: number;
  availability: string;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  provider: string;
  image: string;
}

interface Venue {
  id: string;
  name: string;
  category: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  rating: number;
  amenities: string[];
  availability: {
    date: string;
    status: 'available' | 'booked' | 'maintenance';
  }[];
  image: string;
  description: string;
}

interface PaymentRate {
  id: string;
  service: string;
  baseRate: number;
  currency: string;
  fees: {
    processing: number;
    platform: number;
    international?: number;
  };
  acceptedMethods: string[];
}

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }[];
}

interface TravelPlan {
  id: string;
  destination: string;
  duration: string;
  budget: number;
  activities: string[];
  accommodation: string;
  transport: string;
  bestTime: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

interface SafetyInfo {
  id: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  alerts: string[];
  emergencyContacts: {
    police: string;
    medical: string;
    tourist: string;
  };
  recommendations: string[];
  lastUpdated: string;
}

interface TourismAgency {
  id: string;
  name: string;
  description: string;
  location: string;
  established: number;
  rating: number;
  reviewCount: number;
  specialties: string[];
  services: string[];
  certifications: string[];
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    whatsapp?: string;
  };
  priceRange: 'Budget' | 'Mid-Range' | 'Luxury';
  languages: string[];
  image: string;
  gallery: string[];
  packages: {
    name: string;
    duration: string;
    price: number;
    highlights: string[];
  }[];
  verified: boolean;
  licenseNumber: string;
  insurance: boolean;
}

interface AIGuide {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  languages: string[];
  personality: string;
  expertise: string[];
  features: string[];
  interactions: number;
  rating: number;
  capabilities: {
    realTimeTranslation: boolean;
    voiceInteraction: boolean;
    visualRecognition: boolean;
    culturalContext: boolean;
    emergencyAssistance: boolean;
  };
}

interface CulturalExperience {
  id: string;
  title: string;
  tribe: string;
  region: string;
  description: string;
  duration: string;
  price: number;
  maxParticipants: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  activities: string[];
  culturalElements: string[];
  communityBenefit: string;
  sustainabilityScore: number;
  image: string;
  gallery: string[];
  localGuide: {
    name: string;
    background: string;
    languages: string[];
  };
  authenticity: 'Traditional' | 'Modern Adaptation' | 'Fusion';
  seasonality: string[];
}

interface EcoTourismSite {
  id: string;
  name: string;
  type: 'National Park' | 'Wildlife Reserve' | 'Forest Reserve' | 'Wetland' | 'Mountain';
  location: string;
  description: string;
  biodiversity: {
    species: number;
    endemicSpecies: number;
    threatenedSpecies: number;
  };
  conservationStatus: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  sustainabilityFeatures: string[];
  carbonOffset: number; // kg CO2 offset per visitor
  communityImpact: {
    jobsCreated: number;
    revenueToLocal: number; // percentage
    educationPrograms: string[];
  };
  activities: string[];
  bestVisitTime: string[];
  entryFee: number;
  image: string;
  certifications: string[];
  rating: number;
  reviewCount: number;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Mountain Hiking Adventure',
    date: '2025-02-15',
    location: 'Rocky Mountains, CO',
    price: 89,
    category: 'Adventure',
    rating: 4.8,
    attendees: 24,
    organizer: 'Mountain Guides Co.',
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400',
    recommendedTransport: ['1'], // Mountain Shuttle Service
    recommendedEquipment: ['1', '3'], // Hiking Backpack, Camping Tent
    duration: '6 hours',
    difficulty: 'Moderate'
  },
  {
    id: '2',
    title: 'Wine Tasting Experience',
    date: '2025-02-20',
    location: 'Napa Valley, CA',
    price: 125,
    category: 'Culinary',
    rating: 4.9,
    attendees: 16,
    organizer: 'Valley Wines LLC',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    recommendedTransport: ['2'], // Valley Express
    recommendedEquipment: [], // No special equipment needed
    duration: '4 hours',
    difficulty: 'Easy'
  },
  {
    id: '3',
    title: 'Photography Workshop',
    date: '2025-02-25',
    location: 'Central Park, NY',
    price: 75,
    category: 'Education',
    rating: 4.7,
    attendees: 12,
    organizer: 'Photo Pro Academy',
    image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400',
    recommendedTransport: ['3'], // City Tours Inc.
    recommendedEquipment: ['2'], // DSLR Camera Kit
    duration: '3 hours',
    difficulty: 'Easy'
  }
];

const sampleTransport: Transport[] = [
  {
    id: '1',
    provider: 'Mountain Shuttle Service',
    type: 'Bus',
    route: 'Denver → Rocky Mountains',
    price: 35,
    rating: 4.6,
    availability: 'Daily 8:00 AM - 6:00 PM'
  },
  {
    id: '2',
    provider: 'Valley Express',
    type: 'Van',
    route: 'San Francisco → Napa Valley',
    price: 45,
    rating: 4.8,
    availability: 'Weekends Only'
  },
  {
    id: '3',
    provider: 'City Tours Inc.',
    type: 'Bike',
    route: 'Manhattan Tour',
    price: 25,
    rating: 4.5,
    availability: '24/7'
  }
];

const sampleEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Professional Hiking Backpack',
    category: 'Outdoor Gear',
    price: 25,
    rating: 4.7,
    provider: 'Gear Rental Co.',
    image: 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'DSLR Camera Kit',
    category: 'Photography',
    price: 45,
    rating: 4.9,
    provider: 'Camera Rentals Plus',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Camping Tent (4-person)',
    category: 'Camping',
    price: 35,
    rating: 4.6,
    provider: 'Outdoor Adventures',
    image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=400'
  }
];

const samplePaymentRates: PaymentRate[] = [
  {
    id: '1',
    service: 'Event Booking',
    baseRate: 2.9,
    currency: 'USD',
    fees: {
      processing: 0.30,
      platform: 1.5,
      international: 1.5
    },
    acceptedMethods: ['Credit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer']
  },
  {
    id: '2',
    service: 'Venue Rental',
    baseRate: 3.5,
    currency: 'USD',
    fees: {
      processing: 0.50,
      platform: 2.0
    },
    acceptedMethods: ['Credit Card', 'Bank Transfer', 'Check']
  },
  {
    id: '3',
    service: 'Equipment Rental',
    baseRate: 2.5,
    currency: 'USD',
    fees: {
      processing: 0.25,
      platform: 1.0
    },
    acceptedMethods: ['Credit Card', 'PayPal', 'Cash']
  }
];

const sampleWeatherData: WeatherData = {
  location: 'Denver, CO',
  current: {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 45,
    windSpeed: 8,
    icon: 'partly-cloudy'
  },
  forecast: [
    { date: '2025-02-15', high: 75, low: 52, condition: 'Sunny', icon: 'sunny', precipitation: 0 },
    { date: '2025-02-16', high: 68, low: 48, condition: 'Cloudy', icon: 'cloudy', precipitation: 20 },
    { date: '2025-02-17', high: 62, low: 45, condition: 'Rain', icon: 'rainy', precipitation: 80 },
    { date: '2025-02-18', high: 70, low: 50, condition: 'Partly Cloudy', icon: 'partly-cloudy', precipitation: 10 },
    { date: '2025-02-19', high: 73, low: 55, condition: 'Sunny', icon: 'sunny', precipitation: 0 }
  ]
};

const sampleTravelPlans: TravelPlan[] = [
  {
    id: '1',
    destination: 'Rocky Mountain National Park',
    duration: '3 days',
    budget: 450,
    activities: ['Hiking', 'Wildlife Viewing', 'Photography', 'Camping'],
    accommodation: 'Mountain Lodge',
    transport: 'Rental Car',
    bestTime: 'June - September',
    difficulty: 'Moderate'
  },
  {
    id: '2',
    destination: 'Napa Valley Wine Tour',
    duration: '2 days',
    budget: 650,
    activities: ['Wine Tasting', 'Vineyard Tours', 'Fine Dining', 'Spa'],
    accommodation: 'Boutique Hotel',
    transport: 'Private Van',
    bestTime: 'April - October',
    difficulty: 'Easy'
  },
  {
    id: '3',
    destination: 'Grand Canyon Adventure',
    duration: '4 days',
    budget: 800,
    activities: ['Hiking', 'River Rafting', 'Helicopter Tour', 'Stargazing'],
    accommodation: 'Canyon Lodge',
    transport: 'Tour Bus',
    bestTime: 'March - May, September - November',
    difficulty: 'Challenging'
  }
];

const sampleAIGuides: AIGuide[] = [
  {
    id: '1',
    name: 'Kato AI',
    avatar: '🤖',
    specialty: 'Wildlife & Safari Expert',
    languages: ['English', 'Swahili', 'Luganda', 'French', 'German'],
    personality: 'Enthusiastic and knowledgeable about Uganda\'s wildlife',
    expertise: ['Big 5 Animals', 'Bird Watching', 'Conservation', 'Photography Tips'],
    features: ['Real-time Animal Recognition', 'Behavior Predictions', 'Best Photo Spots', 'Safety Alerts'],
    interactions: 15420,
    rating: 4.9,
    capabilities: {
      realTimeTranslation: true,
      voiceInteraction: true,
      visualRecognition: true,
      culturalContext: true,
      emergencyAssistance: true
    }
  },
  {
    id: '2',
    name: 'Nakato Cultural AI',
    avatar: '👩🏿',
    specialty: 'Cultural Heritage Specialist',
    languages: ['English', 'Luganda', 'Runyoro', 'Ateso', 'Luo'],
    personality: 'Warm storyteller passionate about Ugandan traditions',
    expertise: ['Traditional Ceremonies', 'Local Customs', 'Historical Sites', 'Art & Crafts'],
    features: ['Cultural Context Explanations', 'Traditional Stories', 'Etiquette Guidance', 'Language Learning'],
    interactions: 12850,
    rating: 4.8,
    capabilities: {
      realTimeTranslation: true,
      voiceInteraction: true,
      visualRecognition: false,
      culturalContext: true,
      emergencyAssistance: true
    }
  },
  {
    id: '3',
    name: 'Eco-Guide AI',
    avatar: '🌿',
    specialty: 'Sustainable Tourism Expert',
    languages: ['English', 'Swahili', 'French'],
    personality: 'Environmental advocate focused on conservation',
    expertise: ['Eco-Tourism', 'Carbon Footprint', 'Conservation Projects', 'Sustainable Practices'],
    features: ['Carbon Tracking', 'Eco-Friendly Routes', 'Conservation Education', 'Impact Monitoring'],
    interactions: 8930,
    rating: 4.7,
    capabilities: {
      realTimeTranslation: true,
      voiceInteraction: true,
      visualRecognition: true,
      culturalContext: false,
      emergencyAssistance: true
    }
  }
];

const sampleCulturalExperiences: CulturalExperience[] = [
  {
    id: '1',
    title: 'Buganda Kingdom Royal Experience',
    tribe: 'Baganda',
    region: 'Central Uganda',
    description: 'Immerse yourself in the rich traditions of the Buganda Kingdom, Uganda\'s largest traditional kingdom. Experience royal ceremonies, traditional music, and ancient customs.',
    duration: '2 Days',
    price: 180,
    maxParticipants: 12,
    difficulty: 'Easy',
    activities: ['Royal Palace Tour', 'Traditional Dance Performance', 'Bark Cloth Making', 'Royal Feast'],
    culturalElements: ['Kabaka\'s Palace', 'Traditional Music', 'Royal Regalia', 'Ancient Ceremonies'],
    communityBenefit: '70% of proceeds support local artisans and cultural preservation',
    sustainabilityScore: 85,
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: ['https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'],
    localGuide: {
      name: 'Ssalongo Mukasa',
      background: 'Royal historian and cultural expert with 20+ years experience',
      languages: ['Luganda', 'English', 'Swahili']
    },
    authenticity: 'Traditional',
    seasonality: ['Year-round', 'Best during cultural festivals']
  },
  {
    id: '2',
    title: 'Karamoja Warrior Culture Immersion',
    tribe: 'Karamojong',
    region: 'Northern Uganda',
    description: 'Experience the nomadic lifestyle of the Karamojong people, known for their warrior traditions, cattle herding, and unique cultural practices.',
    duration: '3 Days',
    price: 220,
    maxParticipants: 8,
    difficulty: 'Moderate',
    activities: ['Cattle Herding', 'Traditional Wrestling', 'Manyatta Visit', 'Beadwork Workshop'],
    culturalElements: ['Warrior Traditions', 'Nomadic Lifestyle', 'Traditional Attire', 'Oral Traditions'],
    communityBenefit: '80% supports community development and education programs',
    sustainabilityScore: 90,
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: ['https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'],
    localGuide: {
      name: 'Lokwang Peter',
      background: 'Karamojong elder and cultural ambassador',
      languages: ['Karamojong', 'English', 'Swahili']
    },
    authenticity: 'Traditional',
    seasonality: ['Dry season preferred', 'March-October']
  },
  {
    id: '3',
    title: 'Batwa Pygmy Forest Experience',
    tribe: 'Batwa',
    region: 'Southwestern Uganda',
    description: 'Learn about the indigenous Batwa people, former forest dwellers of Bwindi. Discover their traditional forest survival skills and cultural adaptation.',
    duration: '1 Day',
    price: 95,
    maxParticipants: 15,
    difficulty: 'Easy',
    activities: ['Forest Walk', 'Traditional Hunting Demo', 'Fire Making', 'Medicinal Plants Tour'],
    culturalElements: ['Forest Survival Skills', 'Traditional Medicine', 'Hunting Techniques', 'Cultural Stories'],
    communityBenefit: '90% directly supports Batwa community development',
    sustainabilityScore: 95,
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: ['https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'],
    localGuide: {
      name: 'Gahinga John',
      background: 'Batwa cultural leader and forest conservation advocate',
      languages: ['Rukiga', 'English']
    },
    authenticity: 'Traditional',
    seasonality: ['Year-round', 'Avoid heavy rains']
  }
];

const sampleEcoTourismSites: EcoTourismSite[] = [
  {
    id: '1',
    name: 'Bwindi Impenetrable National Park',
    type: 'National Park',
    location: 'Southwestern Uganda',
    description: 'UNESCO World Heritage site home to nearly half of the world\'s mountain gorillas. Ancient rainforest with exceptional biodiversity and community-based conservation.',
    biodiversity: {
      species: 400,
      endemicSpecies: 10,
      threatenedSpecies: 120
    },
    conservationStatus: 'Excellent',
    sustainabilityFeatures: [
      'Community Revenue Sharing',
      'Gorilla Habituation Research',
      'Reforestation Programs',
      'Sustainable Tourism Limits'
    ],
    carbonOffset: 25,
    communityImpact: {
      jobsCreated: 450,
      revenueToLocal: 75,
      educationPrograms: ['Conservation Education', 'Eco-Guide Training', 'Community Development']
    },
    activities: ['Gorilla Trekking', 'Bird Watching', 'Nature Walks', 'Community Visits'],
    bestVisitTime: ['June-August', 'December-February'],
    entryFee: 15,
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400',
    certifications: ['UNESCO World Heritage', 'IUCN Category II', 'Sustainable Tourism Certified'],
    rating: 4.9,
    reviewCount: 1250
  },
  {
    id: '2',
    name: 'Queen Elizabeth National Park',
    type: 'National Park',
    location: 'Western Uganda',
    description: 'Uganda\'s most popular savanna park with diverse ecosystems, tree-climbing lions, and the famous Kazinga Channel boat safari.',
    biodiversity: {
      species: 618,
      endemicSpecies: 5,
      threatenedSpecies: 95
    },
    conservationStatus: 'Good',
    sustainabilityFeatures: [
      'Anti-Poaching Units',
      'Community Conservancies',
      'Solar-Powered Facilities',
      'Waste Management Systems'
    ],
    carbonOffset: 18,
    communityImpact: {
      jobsCreated: 320,
      revenueToLocal: 60,
      educationPrograms: ['Wildlife Conservation', 'Sustainable Fishing', 'Tourism Training']
    },
    activities: ['Game Drives', 'Boat Safaris', 'Chimpanzee Tracking', 'Bird Watching'],
    bestVisitTime: ['December-February', 'June-September'],
    entryFee: 40,
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    certifications: ['IUCN Category II', 'Ramsar Wetland', 'Sustainable Tourism Gold'],
    rating: 4.7,
    reviewCount: 890
  },
  {
    id: '3',
    name: 'Kibale Forest National Park',
    type: 'Forest Reserve',
    location: 'Western Uganda',
    description: 'Primate capital of the world with 13 primate species including chimpanzees. Tropical rainforest with exceptional primate research and conservation programs.',
    biodiversity: {
      species: 372,
      endemicSpecies: 8,
      threatenedSpecies: 70
    },
    conservationStatus: 'Excellent',
    sustainabilityFeatures: [
      'Primate Research Station',
      'Community Forest Management',
      'Eco-Lodge Partnerships',
      'Carbon Sequestration Projects'
    ],
    carbonOffset: 30,
    communityImpact: {
      jobsCreated: 280,
      revenueToLocal: 70,
      educationPrograms: ['Primate Conservation', 'Forest Management', 'Research Training']
    },
    activities: ['Chimpanzee Tracking', 'Primate Walks', 'Bird Watching', 'Research Participation'],
    bestVisitTime: ['February-May', 'September-November'],
    entryFee: 30,
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    certifications: ['IUCN Category II', 'Primate Research Certified', 'Community Conservation Award'],
    rating: 4.8,
    reviewCount: 670
  }
];

const sampleUgandanAgencies: TourismAgency[] = [
  {
    id: '1',
    name: 'Pearl of Africa Safaris',
    description: 'Premier safari company specializing in gorilla trekking, wildlife safaris, and cultural experiences across Uganda. Family-owned business with 15+ years of experience.',
    location: 'Kampala, Uganda',
    established: 2008,
    rating: 4.9,
    reviewCount: 247,
    specialties: ['Gorilla Trekking', 'Wildlife Safaris', 'Cultural Tours', 'Adventure Sports'],
    services: ['Airport Transfers', 'Accommodation Booking', 'Permit Arrangements', 'Professional Guides', '4WD Vehicles'],
    certifications: ['Uganda Tourism Board Licensed', 'IATA Certified', 'ISO 9001:2015'],
    contactInfo: {
      phone: '+256 700 123456',
      email: 'info@pearlofafricasafaris.com',
      website: 'www.pearlofafricasafaris.com',
      whatsapp: '+256 700 123456'
    },
    priceRange: 'Mid-Range',
    languages: ['English', 'Swahili', 'Luganda', 'French', 'German'],
    image: 'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: [
      'https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    packages: [
      {
        name: 'Bwindi Gorilla Experience',
        duration: '3 Days',
        price: 1250,
        highlights: ['Gorilla Trekking Permit', 'Professional Guide', 'Luxury Lodge', 'All Meals']
      },
      {
        name: 'Uganda Wildlife Circuit',
        duration: '7 Days',
        price: 2800,
        highlights: ['Queen Elizabeth NP', 'Murchison Falls', 'Kibale Forest', 'Game Drives']
      }
    ],
    verified: true,
    licenseNumber: 'UTB/TT/82756',
    insurance: true
  },
  {
    id: '2',
    name: 'Nile River Explorers',
    description: 'Adventure tourism specialists focusing on white water rafting, bungee jumping, and Nile River activities. Safety-certified with international standards.',
    location: 'Jinja, Uganda',
    established: 2012,
    rating: 4.8,
    reviewCount: 189,
    specialties: ['White Water Rafting', 'Bungee Jumping', 'Kayaking', 'River Cruises'],
    services: ['Safety Equipment', 'Professional Instructors', 'Photography Services', 'Transport'],
    certifications: ['International Rafting Federation', 'Uganda Tourism Board', 'First Aid Certified'],
    contactInfo: {
      phone: '+256 701 987654',
      email: 'adventures@nileexplorers.ug',
      website: 'www.nileriverexplorers.com',
      whatsapp: '+256 701 987654'
    },
    priceRange: 'Budget',
    languages: ['English', 'Swahili', 'Luganda'],
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: [
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    packages: [
      {
        name: 'Nile Rapids Adventure',
        duration: '1 Day',
        price: 95,
        highlights: ['Grade 5 Rapids', 'Safety Briefing', 'Lunch Included', 'Photos & Videos']
      },
      {
        name: 'Extreme Jinja Package',
        duration: '2 Days',
        price: 180,
        highlights: ['Rafting', 'Bungee Jump', 'Quad Biking', 'Accommodation']
      }
    ],
    verified: true,
    licenseNumber: 'UTB/TT/91234',
    insurance: true
  },
  {
    id: '3',
    name: 'Rwenzori Mountaineering Services',
    description: 'Specialized mountain climbing and trekking company for the Rwenzori Mountains (Mountains of the Moon). Expert guides and high-altitude experience.',
    location: 'Kasese, Uganda',
    established: 2005,
    rating: 4.7,
    reviewCount: 156,
    specialties: ['Mountain Climbing', 'High Altitude Trekking', 'Nature Walks', 'Bird Watching'],
    services: ['Mountain Guides', 'Climbing Equipment', 'Porter Services', 'Emergency Rescue'],
    certifications: ['Mountain Guide Association', 'Wilderness First Aid', 'Uganda Tourism Board'],
    contactInfo: {
      phone: '+256 702 456789',
      email: 'climb@rwenzorimountains.ug',
      website: 'www.rwenzorimountaineering.com',
      whatsapp: '+256 702 456789'
    },
    priceRange: 'Mid-Range',
    languages: ['English', 'Swahili', 'Lukonzo', 'French'],
    image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: [
      'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    packages: [
      {
        name: 'Margherita Peak Expedition',
        duration: '9 Days',
        price: 1850,
        highlights: ['Summit Attempt', 'Professional Guides', 'All Equipment', 'Mountain Huts']
      },
      {
        name: 'Rwenzori Circuit Trek',
        duration: '6 Days',
        price: 1200,
        highlights: ['Scenic Routes', 'Wildlife Viewing', 'Cultural Encounters', 'Camping']
      }
    ],
    verified: true,
    licenseNumber: 'UTB/TT/67890',
    insurance: true
  },
  {
    id: '4',
    name: 'Kampala Cultural Heritage Tours',
    description: 'Authentic cultural experiences showcasing Ugandan traditions, history, and local communities. Supporting sustainable tourism and local development.',
    location: 'Kampala, Uganda',
    established: 2015,
    rating: 4.6,
    reviewCount: 203,
    specialties: ['Cultural Tours', 'Historical Sites', 'Community Tourism', 'Art & Crafts'],
    services: ['Cultural Guides', 'Community Visits', 'Craft Workshops', 'Traditional Meals'],
    certifications: ['Uganda Tourism Board', 'Community Tourism Certified', 'Cultural Heritage Approved'],
    contactInfo: {
      phone: '+256 703 567890',
      email: 'culture@kampalaheritage.ug',
      website: 'www.kampalaheritage.com',
      whatsapp: '+256 703 567890'
    },
    priceRange: 'Budget',
    languages: ['English', 'Luganda', 'Swahili', 'French', 'Spanish'],
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    packages: [
      {
        name: 'Kampala City Heritage Walk',
        duration: '4 Hours',
        price: 35,
        highlights: ['Historical Sites', 'Local Markets', 'Traditional Lunch', 'Cultural Guide']
      },
      {
        name: 'Buganda Kingdom Experience',
        duration: '2 Days',
        price: 150,
        highlights: ['Royal Tombs', 'Palace Visit', 'Traditional Ceremonies', 'Craft Making']
      }
    ],
    verified: true,
    licenseNumber: 'UTB/TT/45678',
    insurance: true
  },
  {
    id: '5',
    name: 'Murchison Falls Expeditions',
    description: 'Luxury safari experiences in Murchison Falls National Park. Specializing in boat safaris, game drives, and exclusive lodge accommodations.',
    location: 'Masindi, Uganda',
    established: 2010,
    rating: 4.9,
    reviewCount: 178,
    specialties: ['Luxury Safaris', 'Boat Cruises', 'Game Drives', 'Photography Tours'],
    services: ['Luxury Vehicles', 'Professional Photographers', 'Exclusive Lodges', 'Private Guides'],
    certifications: ['Uganda Tourism Board', 'Luxury Travel Association', 'Wildlife Conservation Certified'],
    contactInfo: {
      phone: '+256 704 678901',
      email: 'luxury@murchisonexpeditions.ug',
      website: 'www.murchisonexpeditions.com',
      whatsapp: '+256 704 678901'
    },
    priceRange: 'Luxury',
    languages: ['English', 'French', 'German', 'Swahili'],
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
    gallery: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    packages: [
      {
        name: 'Murchison Luxury Safari',
        duration: '4 Days',
        price: 2200,
        highlights: ['Luxury Lodge', 'Private Game Drives', 'Nile Boat Safari', 'Gourmet Meals']
      },
      {
        name: 'Photography Masterclass',
        duration: '5 Days',
        price: 2800,
        highlights: ['Professional Photographer', 'Wildlife Photography', 'Editing Workshop', 'Print Portfolio']
      }
    ],
    verified: true,
    licenseNumber: 'UTB/TT/12345',
    insurance: true
  }
];

const sampleSafetyInfo: SafetyInfo[] = [
  {
    id: '1',
    location: 'Denver, CO',
    riskLevel: 'Low',
    alerts: ['High altitude awareness for visitors', 'Weather changes quickly in mountains'],
    emergencyContacts: {
      police: '911',
      medical: '911',
      tourist: '(303) 892-1505'
    },
    recommendations: [
      'Stay hydrated at high altitude',
      'Check weather before mountain activities',
      'Inform someone of your travel plans'
    ],
    lastUpdated: '2025-02-14'
  },
  {
    id: '2',
    location: 'Austin, TX',
    riskLevel: 'Low',
    alerts: ['Flash flood warnings during heavy rain'],
    emergencyContacts: {
      police: '911',
      medical: '911',
      tourist: '(512) 474-5171'
    },
    recommendations: [
      'Avoid low-lying areas during storms',
      'Stay updated on weather alerts',
      'Keep emergency supplies in vehicle'
    ],
    lastUpdated: '2025-02-14'
  }
];

const sampleVenues: Venue[] = [
  {
    id: '1',
    name: 'Mountain View Conference Center',
    category: 'Conference Hall',
    location: 'Denver, CO',
    capacity: 200,
    pricePerDay: 850,
    rating: 4.8,
    amenities: ['WiFi', 'Projector', 'Catering', 'Parking', 'AC'],
    availability: [
      { date: '2025-02-15', status: 'available' },
      { date: '2025-02-16', status: 'booked' },
      { date: '2025-02-17', status: 'available' },
      { date: '2025-02-18', status: 'available' },
      { date: '2025-02-19', status: 'maintenance' },
    ],
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Modern conference center with stunning mountain views'
  },
  {
    id: '2',
    name: 'Riverside Outdoor Pavilion',
    category: 'Outdoor Venue',
    location: 'Austin, TX',
    capacity: 500,
    pricePerDay: 1200,
    rating: 4.9,
    amenities: ['Stage', 'Sound System', 'Lighting', 'Restrooms', 'Parking'],
    availability: [
      { date: '2025-02-15', status: 'available' },
      { date: '2025-02-16', status: 'available' },
      { date: '2025-02-17', status: 'booked' },
      { date: '2025-02-18', status: 'available' },
      { date: '2025-02-19', status: 'available' },
    ],
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Beautiful outdoor pavilion perfect for festivals and large gatherings'
  },
  {
    id: '3',
    name: 'Historic Downtown Gallery',
    category: 'Art Gallery',
    location: 'Portland, OR',
    capacity: 80,
    pricePerDay: 450,
    rating: 4.7,
    amenities: ['Gallery Lighting', 'Security', 'Climate Control', 'Reception Area'],
    availability: [
      { date: '2025-02-15', status: 'booked' },
      { date: '2025-02-16', status: 'available' },
      { date: '2025-02-17', status: 'available' },
      { date: '2025-02-18', status: 'available' },
      { date: '2025-02-19', status: 'available' },
    ],
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Elegant gallery space in the heart of downtown'
  }
];

type StakeholderType = 'seeker' | 'organizer' | 'transport' | 'equipment';
type ServiceType = 'payments' | 'weather' | 'planning' | 'safety' | 'misc' | 'agencies' | 'ai-guide' | 'cultural' | 'eco-tourism';

// AI-Powered Utility Functions
const toggleFavorite = (id: string, favorites: string[], setFavorites: React.Dispatch<React.SetStateAction<string[]>>) => {
  setFavorites(prev => 
    prev.includes(id) 
      ? prev.filter(fav => fav !== id)
      : [...prev, id]
  );
};

const generateAIRecommendations = (userPreferences: any, currentContext: string) => {
  const recommendations = [
    `Based on your interest in ${userPreferences.interests.join(' and ')}, I recommend the Mountain Hiking Adventure`,
    `The weather is perfect for outdoor activities today - 72°F with sunny skies`,
    `AI suggests visiting Bwindi National Park during 2-4 PM for optimal gorilla sighting chances`,
    `Your budget range suggests mid-range accommodations with excellent value`,
    `Cultural tip: Learning basic Luganda greetings will enhance your local interactions`
  ];
  return recommendations;
};

const aiSmartSearch = (query: string, data: any[]) => {
  // AI-powered semantic search simulation
  const keywords = query.toLowerCase().split(' ');
  return data.filter(item => 
    keywords.some(keyword => 
      item.title?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword) ||
      item.specialties?.some((spec: string) => spec.toLowerCase().includes(keyword))
    )
  );
};

const aiPriceOptimization = (basePrice: number, demand: string, season: string) => {
  let multiplier = 1;
  if (demand === 'high') multiplier += 0.2;
  if (season === 'peak') multiplier += 0.15;
  return Math.round(basePrice * multiplier);
};

const aiPersonalizedSorting = (items: any[], userPreferences: any) => {
  return items.sort((a, b) => {
    let scoreA = 0, scoreB = 0;
    
    // Interest matching
    if (userPreferences.interests.includes(a.category?.toLowerCase())) scoreA += 10;
    if (userPreferences.interests.includes(b.category?.toLowerCase())) scoreB += 10;
    
    // Budget matching
    if (userPreferences.budget === 'budget' && a.price < 100) scoreA += 5;
    if (userPreferences.budget === 'budget' && b.price < 100) scoreB += 5;
    
    // Rating boost
    scoreA += a.rating || 0;
    scoreB += b.rating || 0;
    
    return scoreB - scoreA;
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'text-forest-600 bg-forest-100';
    case 'booked': return 'text-earth-600 bg-earth-100';
    case 'maintenance': return 'text-stone-600 bg-stone-100';
    default: return 'text-stone-600 bg-stone-100';
  }
};

const notifications = [
  { id: 1, type: 'ai', message: 'AI found 3 perfect matches for your interests!', time: '1 min ago', unread: true },
  { id: 2, type: 'booking', message: 'Smart booking: Mountain Hiking + Transport bundle available', time: '5 min ago', unread: true },
  { id: 3, type: 'ai', message: 'AI Tip: Best time to visit Bwindi is 2-4 PM today', time: '15 min ago', unread: true },
  { id: 4, type: 'weather', message: 'AI Weather Alert: Perfect conditions for gorilla trekking!', time: '1 hour ago', unread: false },
  { id: 5, type: 'ai', message: 'Price drop detected: Cultural tour now 20% off', time: '2 hours ago', unread: false },
];

function App() {
  const [activeTab, setActiveTab] = useState<StakeholderType>('seeker');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenueCategory, setSelectedVenueCategory] = useState('all');
  const [organizerView, setOrganizerView] = useState<'dashboard' | 'venues' | 'create'>('dashboard');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser] = useState({ name: 'Alex Johnson', avatar: '👤', points: 1250, level: 'Explorer' });
  const [weatherData] = useState({ temp: 72, condition: 'Sunny', location: 'Denver, CO' });
  const [liveEvents] = useState(3);
  const [onlineUsers] = useState(1247);
  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<'event' | 'transport' | 'equipment' | 'summary'>('event');
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [aiAssistantActive, setAiAssistantActive] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [aiChatHistory, setAiChatHistory] = useState<{role: 'user' | 'ai', message: string, timestamp: Date}[]>([]);
  const [aiPersonalization, setAiPersonalization] = useState({
    interests: ['wildlife', 'culture'],
    budget: 'mid-range',
    travelStyle: 'adventure',
    language: 'english'
  });
  const [aiPredictions, setAiPredictions] = useState({
    weatherOptimal: true,
    crowdLevel: 'moderate',
    bestTimeToVisit: '2:00 PM',
    recommendedDuration: '4 hours'
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const stakeholderTabs = [
    { id: 'seeker' as StakeholderType, label: 'Event Seekers', icon: Calendar, color: 'bg-forest-600' },
    { id: 'organizer' as StakeholderType, label: 'Event Organizers', icon: Users, color: 'bg-earth-600' },
    { id: 'transport' as StakeholderType, label: 'Transport Providers', icon: Truck, color: 'bg-sunshine-600' },
    { id: 'equipment' as StakeholderType, label: 'Equipment Rentals', icon: Wrench, color: 'bg-stone-600' }
  ];

  const additionalServices = [
    { id: 'ai-guide' as ServiceType, label: 'AI-Powered Guides', icon: Zap, color: 'bg-forest-600', description: 'Smart AI companions for your Uganda journey' },
    { id: 'cultural' as ServiceType, label: 'Cultural Experiences', icon: Users, color: 'bg-earth-600', description: 'Authentic tribal and cultural immersions' },
    { id: 'eco-tourism' as ServiceType, label: 'Eco-Tourism', icon: Mountain, color: 'bg-sunshine-600', description: 'Sustainable wildlife and nature experiences' },
    { id: 'agencies' as ServiceType, label: 'Tourism Agencies', icon: Award, color: 'bg-stone-600', description: 'Verified Ugandan tourism companies' },
    { id: 'payments' as ServiceType, label: 'Payments & Rates', icon: CreditCard, color: 'bg-earth-600', description: 'Payment processing rates and methods' },
    { id: 'weather' as ServiceType, label: 'Weather Info', icon: Cloud, color: 'bg-sunshine-600', description: 'Real-time weather and forecasts' },
    { id: 'planning' as ServiceType, label: 'Travel Planning', icon: Route, color: 'bg-stone-600', description: 'Curated travel plans and itineraries' },
    { id: 'safety' as ServiceType, label: 'Safety & Security', icon: Shield, color: 'bg-earth-600', description: 'Safety information and emergency contacts' },
    { id: 'misc' as ServiceType, label: 'Miscellaneous', icon: MoreHorizontal, color: 'bg-forest-600', description: 'Additional travel services and tools' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200 nature-pattern transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-dark-100/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-stone-300 dark:border-dark-300 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-forest-600 dark:text-forest-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-forest-600 to-earth-600 dark:from-forest-400 dark:to-earth-400 bg-clip-text text-transparent">
                TourismHub
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {stakeholderTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${tab.color} text-white shadow-lg`
                        : 'text-stone-700 hover:bg-earth-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm border border-earth-200 dark:border-dark-300 hover:bg-white dark:hover:bg-dark-200 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-sunshine-600" />
                ) : (
                  <Moon className="h-5 w-5 text-stone-600" />
                )}
              </button>

              {/* AI Status Indicator */}
              <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-forest-500 to-forest-600 text-white px-4 py-2 rounded-full shadow-lg">
                <Zap className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">AI Active</span>
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>

              {/* AI-Enhanced Weather Widget */}
              <div className="hidden lg:flex items-center space-x-2 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm px-3 py-2 rounded-full border border-earth-200 dark:border-dark-300">
                <div className="text-sunshine-500">☀️</div>
                <span className="text-sm font-medium text-stone-700 dark:text-dark-800">{weatherData.temp}°F</span>
                <span className="text-xs text-stone-500 dark:text-dark-700">{weatherData.location}</span>
                {aiPredictions.weatherOptimal && (
                  <div className="text-xs bg-forest-100 text-forest-800 px-2 py-0.5 rounded-full ml-2">
                    AI: Perfect!
                  </div>
                )}
              </div>

              {/* Live Stats */}
              <div className="hidden lg:flex items-center space-x-4 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm px-4 py-2 rounded-full border border-earth-200 dark:border-dark-300">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-forest-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-stone-700 dark:text-dark-800">{liveEvents} Live</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4 text-earth-500" />
                  <span className="text-sm font-medium text-stone-700 dark:text-dark-800">{onlineUsers.toLocaleString()}</span>
                </div>
              </div>

              {/* AI-Powered Search */}
              <div className="relative hidden md:block">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-forest-500 absolute left-3 top-1/2 transform -translate-y-1/2 animate-pulse" />
                  <Search className="h-4 w-4 text-stone-400 absolute left-8 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ask AI: 'Find gorilla trekking tours'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 pr-12 py-2 w-80 border border-earth-300 rounded-full focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                  />
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-forest-600"
                  >
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-200 p-3 z-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 text-forest-500" />
                      <span className="text-sm font-medium text-stone-900">AI Suggestions</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-stone-600 hover:bg-forest-50 p-2 rounded cursor-pointer">
                        🦍 Gorilla trekking in Bwindi National Park
                      </div>
                      <div className="text-sm text-stone-600 hover:bg-forest-50 p-2 rounded cursor-pointer">
                        🏔️ Mountain hiking adventures in Rwenzori
                      </div>
                      <div className="text-sm text-stone-600 hover:bg-forest-50 p-2 rounded cursor-pointer">
                        🎭 Cultural experiences with Buganda Kingdom
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-stone-600 hover:text-forest-600 transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-earth-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-stone-200 z-50">
                    <div className="p-4 border-b border-stone-200">
                      <h3 className="font-semibold text-stone-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-stone-100 hover:bg-stone-50 ${notification.unread ? 'bg-forest-50/30' : ''}`}>
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded-full ${notification.unread ? 'bg-forest-100' : 'bg-stone-100'}`}>
                              {notification.type === 'ai' && <Zap className="h-4 w-4 text-forest-600" />}
                              {notification.type === 'booking' && <Calendar className="h-4 w-4 text-earth-600" />}
                              {notification.type === 'review' && <Star className="h-4 w-4 text-sunshine-600" />}
                              {notification.type === 'payment' && <CreditCard className="h-4 w-4 text-earth-600" />}
                              {notification.type === 'weather' && <Cloud className="h-4 w-4 text-sunshine-600" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-stone-900">{notification.message}</p>
                              <p className="text-xs text-stone-500 mt-1">{notification.time}</p>
                            </div>
                            {notification.unread && <div className="w-2 h-2 bg-forest-500 rounded-full"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-sm text-forest-600 hover:text-forest-700 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-earth-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">{currentUser.avatar}</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-stone-900">{currentUser.name}</p>
                    <p className="text-xs text-stone-500">{currentUser.level} • {currentUser.points} pts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4 text-sunshine-500" />
                  <span className="text-sm font-medium text-sunshine-600">{currentUser.points}</span>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-stone-700 hover:bg-earth-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-earth-200">
              <div className="space-y-2">
                {stakeholderTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? `${tab.color} text-white`
                          : 'text-stone-700 hover:bg-earth-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Culinary">Culinary</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm text-stone-600">${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="date">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-forest-600 text-white py-2 px-4 rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-forest-500 to-forest-600 text-white px-6 py-2 rounded-full flex items-center space-x-2">
              <Zap className="h-5 w-5 animate-pulse" />
              <span className="font-medium">AI-Powered Tourism Platform</span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-6">
            Your AI Gateway to{' '}
            <span className="bg-gradient-to-r from-forest-600 via-sunshine-600 to-earth-600 bg-clip-text text-transparent">
              Uganda's Wonders
            </span>
          </h2>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            Experience Uganda like never before with AI-powered recommendations, smart cultural insights, and personalized adventure planning.
          </p>

          {/* AI Stats */}
          <div className="flex items-center justify-center space-x-8 mb-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse"></div>
              <span className="text-stone-600">AI analyzing 15.2K+ tourist preferences</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-sunshine-500" />
              <span className="text-stone-600">Smart recommendations in real-time</span>
            </div>
          </div>
          
          {/* Main Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stakeholderTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveService(null);
                  }}
                  className={`p-6 rounded-2xl border-2 border-stone-300 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-md ${
                    activeTab === tab.id && !activeService ? 'ring-2 ring-offset-2 ring-forest-500 border-forest-300 shadow-lg' : 'hover:border-stone-400 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${tab.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">{tab.label}</h3>
                  <p className="text-stone-600 text-sm mb-2">
                    {tab.id === 'seeker' && 'AI-curated experiences just for you'}
                    {tab.id === 'organizer' && 'Smart event management with AI insights'}
                    {tab.id === 'transport' && 'AI-optimized routes and pricing'}
                    {tab.id === 'equipment' && 'Smart equipment recommendations'}
                  </p>
                  {/* AI Personalization Indicator */}
                  <div className="flex items-center justify-center space-x-1 text-xs">
                    <Zap className="h-3 w-3 text-forest-500" />
                    <span className="text-forest-600 font-medium">
                      {tab.id === 'seeker' && `${Math.floor(Math.random() * 20) + 80}% match`}
                      {tab.id === 'organizer' && 'AI-powered'}
                      {tab.id === 'transport' && 'Smart routing'}
                      {tab.id === 'equipment' && 'Auto-suggest'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Additional Services Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-8">Additional Tourism Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {additionalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setActiveService(service.id);
                      setActiveTab('seeker'); // Reset main tab
                    }}
                    className={`p-4 rounded-xl border-2 border-stone-300 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-md ${
                      activeService === service.id ? 'ring-2 ring-offset-2 ring-forest-500 border-forest-300 shadow-lg' : 'hover:border-stone-400 hover:shadow-lg'
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 mb-1">{service.label}</h4>
                    <p className="text-xs text-stone-600 mb-2">{service.description}</p>
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="h-2 w-2 text-forest-500" />
                      <span className="text-xs text-forest-600 font-medium">AI-Enhanced</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Service-Specific Content */}
          {activeService === 'ai-guide' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="h-12 w-12 text-forest-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">AI-Powered Uganda Guides</h3>
                </div>
                <p className="text-stone-600 max-w-3xl mx-auto">
                  Meet your intelligent travel companions! Our AI guides provide real-time assistance, cultural insights, and personalized recommendations throughout your Uganda adventure.
                </p>
              </div>

              {/* AI Guides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {sampleAIGuides.map((guide) => (
                  <div key={guide.id} className="bg-white rounded-2xl nature-card p-6 text-center">
                    {/* AI Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      {guide.avatar}
                    </div>
                    
                    <h4 className="text-xl font-bold text-stone-900 mb-2">{guide.name}</h4>
                    <p className="text-forest-600 font-medium mb-3">{guide.specialty}</p>
                    <p className="text-stone-600 text-sm mb-4">{guide.personality}</p>

                    {/* Rating & Interactions */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                        <span className="font-semibold">{guide.rating}</span>
                      </div>
                      <div className="text-sm text-stone-600">
                        {guide.interactions.toLocaleString()} interactions
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-stone-900 mb-2">Languages</h5>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {guide.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-sunshine-100 text-sunshine-800 text-xs px-2 py-1 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-stone-900 mb-2">AI Capabilities</h5>
                      <div className="space-y-2">
                        {Object.entries(guide.capabilities).map(([capability, enabled]) => (
                          <div key={capability} className="flex items-center justify-between text-sm">
                            <span className="text-stone-600 capitalize">
                              {capability.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            {enabled ? (
                              <CheckCircle className="h-4 w-4 text-forest-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-stone-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-stone-900 mb-2">Expertise</h5>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {guide.expertise.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-forest-100 text-forest-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-forest-600 text-white py-3 rounded-lg hover:bg-forest-700 transition-colors organic-btn font-medium">
                      Activate {guide.name}
                    </button>
                  </div>
                ))}
              </div>

              {/* AI Features Showcase */}
              <div className="bg-gradient-to-r from-forest-50 to-sunshine-50 rounded-2xl p-8 mb-12">
                <h4 className="text-2xl font-bold text-stone-900 text-center mb-8">AI Guide Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Real-Time Chat</h5>
                    <p className="text-stone-600 text-sm">Ask questions and get instant responses in your preferred language</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Visual Recognition</h5>
                    <p className="text-stone-600 text-sm">Point your camera at animals, plants, or landmarks for instant information</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sunshine-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Navigation className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Smart Navigation</h5>
                    <p className="text-stone-600 text-sm">Get personalized routes and recommendations based on your interests</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Emergency Support</h5>
                    <p className="text-stone-600 text-sm">24/7 emergency assistance and safety monitoring</p>
                  </div>
                </div>
              </div>

              {/* Demo Chat Interface */}
              <div className="bg-white rounded-2xl nature-card p-6">
                <h4 className="text-xl font-bold text-stone-900 mb-4">Try AI Guide Demo</h4>
                <div className="bg-stone-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center text-white text-sm">🤖</div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">Hello! I'm Kato AI, your Uganda wildlife guide. What would you like to explore today?</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-forest-100 p-3 rounded-lg">
                        <p className="text-sm">Tell me about mountain gorillas in Bwindi</p>
                      </div>
                      <div className="w-8 h-8 bg-stone-400 rounded-full flex items-center justify-center text-white text-sm">👤</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-forest-600 rounded-full flex items-center justify-center text-white text-sm">🤖</div>
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm">Bwindi is home to nearly half of the world's mountain gorillas! There are about 459 gorillas in 19 habituated groups. The best time to visit is during dry seasons (June-August, December-February). Would you like me to help you plan a gorilla trekking experience?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Ask your AI guide anything about Uganda..."
                    className="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                  <button className="bg-forest-600 text-white px-6 py-2 rounded-lg hover:bg-forest-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeService === 'cultural' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-earth-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Authentic Cultural Experiences</h3>
                </div>
                <p className="text-stone-600 max-w-3xl mx-auto">
                  Immerse yourself in Uganda's rich cultural heritage through authentic experiences with local communities. Support sustainable tourism while learning about diverse tribal traditions.
                </p>
              </div>

              {/* Cultural Experiences Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {sampleCulturalExperiences.map((experience) => (
                  <div key={experience.id} className="bg-white rounded-2xl nature-card overflow-hidden">
                    <div className="relative">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          experience.authenticity === 'Traditional' ? 'bg-forest-500 text-white' :
                          experience.authenticity === 'Modern Adaptation' ? 'bg-sunshine-500 text-white' :
                          'bg-earth-500 text-white'
                        }`}>
                          {experience.authenticity}
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-stone-900">${experience.price}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-forest-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-stone-900">Sustainability: {experience.sustainabilityScore}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-stone-900 mb-1">{experience.title}</h4>
                          <p className="text-earth-600 font-medium">{experience.tribe} • {experience.region}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-stone-600">{experience.duration}</div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            experience.difficulty === 'Easy' ? 'bg-forest-100 text-forest-800' :
                            experience.difficulty === 'Moderate' ? 'bg-sunshine-100 text-sunshine-800' :
                            'bg-earth-100 text-earth-800'
                          }`}>
                            {experience.difficulty}
                          </div>
                        </div>
                      </div>

                      <p className="text-stone-600 text-sm mb-4 leading-relaxed">{experience.description}</p>

                      {/* Cultural Elements */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Cultural Elements</h5>
                        <div className="flex flex-wrap gap-1">
                          {experience.culturalElements.map((element, index) => (
                            <span
                              key={index}
                              className="bg-earth-100 text-earth-800 text-xs px-2 py-1 rounded"
                            >
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Activities Included</h5>
                        <div className="grid grid-cols-2 gap-1">
                          {experience.activities.map((activity, index) => (
                            <div key={index} className="flex items-center text-sm text-stone-600">
                              <CheckCircle className="h-3 w-3 text-forest-500 mr-2 flex-shrink-0" />
                              <span>{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Local Guide */}
                      <div className="mb-4 bg-stone-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-stone-900 mb-2">Your Local Guide</h5>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-earth-600 rounded-full flex items-center justify-center text-white font-bold">
                            {experience.localGuide.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-stone-900">{experience.localGuide.name}</p>
                            <p className="text-xs text-stone-600 mb-1">{experience.localGuide.background}</p>
                            <div className="flex flex-wrap gap-1">
                              {experience.localGuide.languages.map((lang, index) => (
                                <span
                                  key={index}
                                  className="bg-white text-stone-600 text-xs px-1 py-0.5 rounded"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Community Benefit */}
                      <div className="mb-6 bg-forest-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Heart className="h-4 w-4 text-forest-600 mr-2" />
                          <h5 className="font-semibold text-stone-900">Community Impact</h5>
                        </div>
                        <p className="text-sm text-stone-600">{experience.communityBenefit}</p>
                      </div>

                      {/* Booking Info */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-stone-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Max {experience.maxParticipants} participants</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-earth-600">${experience.price}</div>
                          <div className="text-xs text-stone-500">per person</div>
                        </div>
                      </div>

                      <button className="w-full bg-earth-600 text-white py-3 rounded-lg hover:bg-earth-700 transition-colors organic-btn font-medium">
                        Book Cultural Experience
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cultural Impact Section */}
              <div className="bg-gradient-to-r from-earth-50 to-forest-50 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-stone-900 text-center mb-8">Cultural Tourism Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Community Empowerment</h5>
                    <p className="text-stone-600 text-sm">Direct economic benefits to local communities through authentic cultural sharing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Cultural Preservation</h5>
                    <p className="text-stone-600 text-sm">Supporting the preservation of traditional practices and knowledge</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sunshine-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Authentic Connections</h5>
                    <p className="text-stone-600 text-sm">Meaningful cultural exchange between visitors and local communities</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === 'eco-tourism' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Mountain className="h-12 w-12 text-sunshine-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Sustainable Eco-Tourism</h3>
                </div>
                <p className="text-stone-600 max-w-3xl mx-auto">
                  Explore Uganda's incredible biodiversity while supporting conservation efforts and local communities. Our eco-tourism sites prioritize sustainability and environmental protection.
                </p>
              </div>

              {/* Eco-Tourism Sites Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {sampleEcoTourismSites.map((site) => (
                  <div key={site.id} className="bg-white rounded-2xl nature-card overflow-hidden">
                    <div className="relative">
                      <img
                        src={site.image}
                        alt={site.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          site.conservationStatus === 'Excellent' ? 'bg-forest-500 text-white' :
                          site.conservationStatus === 'Good' ? 'bg-sunshine-500 text-white' :
                          'bg-earth-500 text-white'
                        }`}>
                          {site.conservationStatus}
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-stone-900">${site.entryFee}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                          <span className="font-semibold text-stone-900">{site.rating}</span>
                          <span className="text-stone-600 text-sm ml-1">({site.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-stone-900 mb-1">{site.name}</h4>
                          <p className="text-sunshine-600 font-medium">{site.type} • {site.location}</p>
                        </div>
                      </div>

                      <p className="text-stone-600 text-sm mb-4 leading-relaxed">{site.description}</p>

                      {/* Biodiversity Stats */}
                      <div className="mb-4 bg-forest-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-stone-900 mb-2">Biodiversity</h5>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <div className="text-lg font-bold text-forest-600">{site.biodiversity.species}</div>
                            <div className="text-xs text-stone-600">Species</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-earth-600">{site.biodiversity.endemicSpecies}</div>
                            <div className="text-xs text-stone-600">Endemic</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-sunshine-600">{site.biodiversity.threatenedSpecies}</div>
                            <div className="text-xs text-stone-600">Threatened</div>
                          </div>
                        </div>
                      </div>

                      {/* Sustainability Features */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Sustainability Features</h5>
                        <div className="space-y-1">
                          {site.sustainabilityFeatures.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-stone-600">
                              <CheckCircle className="h-3 w-3 text-forest-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Carbon Offset */}
                      <div className="mb-4 bg-sunshine-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Mountain className="h-4 w-4 text-sunshine-600 mr-2" />
                            <span className="font-semibold text-stone-900">Carbon Offset</span>
                          </div>
                          <span className="text-lg font-bold text-sunshine-600">{site.carbonOffset} kg CO₂</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1">Per visitor contribution to carbon sequestration</p>
                      </div>

                      {/* Community Impact */}
                      <div className="mb-4 bg-earth-50 p-3 rounded-lg">
                        <h5 className="font-semibold text-stone-900 mb-2">Community Impact</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="font-bold text-earth-600">{site.communityImpact.jobsCreated}</div>
                            <div className="text-xs text-stone-600">Jobs Created</div>
                          </div>
                          <div>
                            <div className="font-bold text-earth-600">{site.communityImpact.revenueToLocal}%</div>
                            <div className="text-xs text-stone-600">Local Revenue</div>
                          </div>
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Activities</h5>
                        <div className="flex flex-wrap gap-1">
                          {site.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Best Visit Time */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-stone-900 mb-2">Best Visit Time</h5>
                        <div className="flex flex-wrap gap-1">
                          {site.bestVisitTime.map((time, index) => (
                            <span
                              key={index}
                              className="bg-sunshine-100 text-sunshine-800 text-xs px-2 py-1 rounded"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-sunshine-600 text-white py-3 rounded-lg hover:bg-sunshine-700 transition-colors organic-btn font-medium">
                        Plan Eco-Visit
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sustainability Impact */}
              <div className="bg-gradient-to-r from-sunshine-50 to-forest-50 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-stone-900 text-center mb-8">Your Eco-Tourism Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mountain className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Conservation Funding</h5>
                    <p className="text-stone-600 text-sm">Your visit directly funds wildlife protection and habitat conservation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Local Employment</h5>
                    <p className="text-stone-600 text-sm">Supporting local communities through sustainable job creation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sunshine-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Carbon Positive</h5>
                    <p className="text-stone-600 text-sm">Every visit contributes to carbon sequestration and climate action</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-stone-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Research Support</h5>
                    <p className="text-stone-600 text-sm">Contributing to scientific research and species monitoring programs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === 'agencies' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Award className="h-12 w-12 text-forest-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Verified Ugandan Tourism Agencies</h3>
                </div>
                <p className="text-stone-600 max-w-3xl mx-auto">
                  Connect with legitimate, licensed tourism companies in Uganda. All agencies are verified by the Uganda Tourism Board and offer comprehensive insurance coverage for international tourists.
                </p>
              </div>

              {/* Filter Options */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['All', 'Gorilla Trekking', 'Adventure Sports', 'Cultural Tours', 'Luxury Safaris', 'Budget Tours'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 rounded-full border border-earth-300 text-earth-600 hover:bg-earth-50 transition-colors text-sm"
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Agencies Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sampleUgandanAgencies.map((agency) => (
                  <div key={agency.id} className="bg-white rounded-2xl nature-card overflow-hidden">
                    {/* Agency Header */}
                    <div className="relative">
                      <img
                        src={agency.image}
                        alt={agency.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {agency.verified && (
                          <div className="bg-forest-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </div>
                        )}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          agency.priceRange === 'Budget' ? 'bg-forest-100 text-forest-800' :
                          agency.priceRange === 'Mid-Range' ? 'bg-sunshine-100 text-sunshine-800' :
                          'bg-earth-100 text-earth-800'
                        }`}>
                          {agency.priceRange}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                          <span className="font-semibold text-stone-900">{agency.rating}</span>
                          <span className="text-stone-600 text-sm ml-1">({agency.reviewCount})</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Agency Info */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-xl font-bold text-stone-900">{agency.name}</h4>
                          <span className="text-sm text-stone-500">Est. {agency.established}</span>
                        </div>
                        <div className="flex items-center text-sm text-stone-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {agency.location}
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed">{agency.description}</p>
                      </div>

                      {/* Specialties */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Specialties</h5>
                        <div className="flex flex-wrap gap-1">
                          {agency.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-forest-100 text-forest-800 text-xs px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Certifications & License</h5>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Shield className="h-4 w-4 text-forest-500 mr-2" />
                            <span className="text-stone-600">License: {agency.licenseNumber}</span>
                          </div>
                          {agency.insurance && (
                            <div className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 text-forest-500 mr-2" />
                              <span className="text-stone-600">Comprehensive Insurance Coverage</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agency.certifications.map((cert, index) => (
                            <span
                              key={index}
                              className="bg-earth-100 text-earth-800 text-xs px-2 py-1 rounded"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-stone-900 mb-2">Languages Spoken</h5>
                        <div className="flex flex-wrap gap-1">
                          {agency.languages.map((language, index) => (
                            <span
                              key={index}
                              className="bg-sunshine-100 text-sunshine-800 text-xs px-2 py-1 rounded"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Popular Packages */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-stone-900 mb-3">Popular Packages</h5>
                        <div className="space-y-3">
                          {agency.packages.slice(0, 2).map((pkg, index) => (
                            <div key={index} className="bg-stone-50 p-3 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <h6 className="font-medium text-stone-900">{pkg.name}</h6>
                                <div className="text-right">
                                  <div className="font-bold text-forest-600">${pkg.price}</div>
                                  <div className="text-xs text-stone-500">{pkg.duration}</div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-white text-stone-600 text-xs px-2 py-0.5 rounded"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-stone-900 mb-3">Contact Information</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-forest-500 mr-2" />
                            <span className="text-stone-600">{agency.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-forest-500 mr-2" />
                            <span className="text-stone-600">{agency.contactInfo.website}</span>
                          </div>
                          {agency.contactInfo.whatsapp && (
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 text-forest-500 mr-2" />
                              <span className="text-stone-600">WhatsApp: {agency.contactInfo.whatsapp}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-forest-600 text-white py-3 px-4 rounded-lg hover:bg-forest-700 transition-colors organic-btn font-medium">
                          Contact Agency
                        </button>
                        <button className="px-4 py-3 border border-earth-300 text-earth-600 rounded-lg hover:bg-earth-50 transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="px-4 py-3 border border-earth-300 text-earth-600 rounded-lg hover:bg-earth-50 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 bg-forest-50 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-stone-900 text-center mb-6">Why Choose Verified Agencies?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Licensed & Insured</h5>
                    <p className="text-stone-600 text-sm">All agencies are licensed by Uganda Tourism Board with comprehensive insurance coverage.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">Quality Assured</h5>
                    <p className="text-stone-600 text-sm">Regular quality checks and customer feedback monitoring ensure excellent service standards.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-sunshine-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h5 className="font-semibold text-stone-900 mb-2">24/7 Support</h5>
                    <p className="text-stone-600 text-sm">Direct communication with agencies and emergency support throughout your Uganda experience.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === 'payments' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <CreditCard className="h-12 w-12 text-forest-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Payment Rates & Methods</h3>
                </div>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Transparent pricing and secure payment options for all tourism services.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {samplePaymentRates.map((rate) => (
                  <div key={rate.id} className="bg-white rounded-xl nature-card p-6">
                    <h5 className="text-lg font-semibold text-stone-900 mb-4">{rate.service}</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Base Rate:</span>
                        <span className="font-semibold text-forest-600">{rate.baseRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Processing Fee:</span>
                        <span className="font-semibold">${rate.fees.processing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Platform Fee:</span>
                        <span className="font-semibold">{rate.fees.platform}%</span>
                      </div>
                      {rate.fees.international && (
                        <div className="flex justify-between">
                          <span className="text-stone-600">International:</span>
                          <span className="font-semibold">{rate.fees.international}%</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <p className="text-sm text-stone-600 mb-2">Accepted Methods:</p>
                      <div className="flex flex-wrap gap-1">
                        {rate.acceptedMethods.map((method, index) => (
                          <span
                            key={index}
                            className="bg-forest-100 text-forest-800 text-xs px-2 py-1 rounded"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeService === 'weather' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Cloud className="h-12 w-12 text-sunshine-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Weather Information</h3>
                </div>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Real-time weather data and forecasts to help you plan your perfect trip.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Weather */}
                <div className="bg-white rounded-xl nature-card p-6">
                  <h5 className="text-lg font-semibold text-stone-900 mb-4">Current Weather - {sampleWeatherData.location}</h5>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Sun className="h-12 w-12 text-sunshine-500 mr-4" />
                      <div>
                        <div className="text-3xl font-bold text-stone-900">{sampleWeatherData.current.temperature}°F</div>
                        <div className="text-stone-600">{sampleWeatherData.current.condition}</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Wind className="h-5 w-5 text-stone-500 mr-2" />
                      <span className="text-stone-600">{sampleWeatherData.current.windSpeed} mph</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer className="h-5 w-5 text-stone-500 mr-2" />
                      <span className="text-stone-600">{sampleWeatherData.current.humidity}% humidity</span>
                    </div>
                  </div>
                </div>

                {/* 5-Day Forecast */}
                <div className="bg-white rounded-xl nature-card p-6">
                  <h5 className="text-lg font-semibold text-stone-900 mb-4">5-Day Forecast</h5>
                  <div className="space-y-3">
                    {sampleWeatherData.forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-b-0">
                        <div className="flex items-center">
                          {day.condition === 'Sunny' && <Sun className="h-5 w-5 text-sunshine-500 mr-3" />}
                          {day.condition === 'Cloudy' && <Cloud className="h-5 w-5 text-stone-500 mr-3" />}
                          {day.condition === 'Rain' && <CloudRain className="h-5 w-5 text-stone-600 mr-3" />}
                          {day.condition === 'Partly Cloudy' && <Sun className="h-5 w-5 text-sunshine-400 mr-3" />}
                          <div>
                            <div className="font-medium text-stone-900">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                            <div className="text-sm text-stone-600">{day.condition}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-stone-900">{day.high}°/{day.low}°</div>
                          <div className="text-sm text-stone-600">{day.precipitation}% rain</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeService === 'planning' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Route className="h-12 w-12 text-earth-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Travel Planning</h3>
                </div>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Curated travel plans and itineraries for unforgettable experiences.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleTravelPlans.map((plan) => (
                  <div key={plan.id} className="bg-white rounded-xl nature-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-lg font-semibold text-stone-900">{plan.destination}</h5>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        plan.difficulty === 'Easy' ? 'bg-forest-100 text-forest-800' :
                        plan.difficulty === 'Moderate' ? 'bg-sunshine-100 text-sunshine-800' :
                        'bg-earth-100 text-earth-800'
                      }`}>
                        {plan.difficulty}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-stone-500 mr-2" />
                        <span className="text-stone-600">{plan.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-stone-500 mr-2" />
                        <span className="text-stone-600">Budget: ${plan.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 text-stone-500 mr-2" />
                        <span className="text-stone-600">{plan.transport}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-stone-500 mr-2" />
                        <span className="text-stone-600">{plan.bestTime}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-stone-600 mb-2">Activities:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.activities.map((activity, index) => (
                          <span
                            key={index}
                            className="bg-earth-100 text-earth-800 text-xs px-2 py-1 rounded"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-earth-600 text-white py-2 rounded-lg hover:bg-earth-700 transition-colors font-medium organic-btn">
                      View Full Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeService === 'safety' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-12 w-12 text-stone-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Safety & Security Information</h3>
                </div>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Stay informed and safe with real-time security updates and emergency information.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleSafetyInfo.map((info) => (
                  <div key={info.id} className="bg-white rounded-xl nature-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-lg font-semibold text-stone-900">{info.location}</h5>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        info.riskLevel === 'Low' ? 'bg-forest-100 text-forest-800' :
                        info.riskLevel === 'Medium' ? 'bg-sunshine-100 text-sunshine-800' :
                        'bg-earth-100 text-earth-800'
                      }`}>
                        {info.riskLevel} Risk
                      </span>
                    </div>
                    
                    {/* Emergency Contacts */}
                    <div className="mb-4">
                      <h6 className="font-medium text-stone-900 mb-2">Emergency Contacts</h6>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-600">Police:</span>
                          <span className="font-medium">{info.emergencyContacts.police}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Medical:</span>
                          <span className="font-medium">{info.emergencyContacts.medical}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-600">Tourist Help:</span>
                          <span className="font-medium">{info.emergencyContacts.tourist}</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Alerts */}
                    {info.alerts.length > 0 && (
                      <div className="mb-4">
                        <h6 className="font-medium text-stone-900 mb-2">Current Alerts</h6>
                        <div className="space-y-2">
                          {info.alerts.map((alert, index) => (
                            <div key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-sunshine-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-stone-600">{alert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    <div className="mb-4">
                      <h6 className="font-medium text-stone-900 mb-2">Safety Recommendations</h6>
                      <div className="space-y-1">
                        {info.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-forest-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-stone-600">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                      Last updated: {new Date(info.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeService === 'misc' && (
            <div>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <MoreHorizontal className="h-12 w-12 text-forest-600 mr-4" />
                  <h3 className="text-3xl font-bold text-stone-900">Miscellaneous Services</h3>
                </div>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Additional tools and services to enhance your travel experience.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Currency Exchange */}
                <div className="bg-white rounded-xl nature-card p-6 text-center">
                  <Banknote className="h-12 w-12 text-forest-600 mx-auto mb-4" />
                  <h5 className="text-lg font-semibold text-stone-900 mb-2">Currency Exchange</h5>
                  <p className="text-stone-600 text-sm mb-4">Real-time exchange rates and currency conversion</p>
                  <button className="w-full bg-forest-600 text-white py-2 rounded-lg hover:bg-forest-700 transition-colors organic-btn">
                    Check Rates
                  </button>
                </div>

                {/* Travel Insurance */}
                <div className="bg-white rounded-xl nature-card p-6 text-center">
                  <Shield className="h-12 w-12 text-earth-600 mx-auto mb-4" />
                  <h5 className="text-lg font-semibold text-stone-900 mb-2">Travel Insurance</h5>
                  <p className="text-stone-600 text-sm mb-4">Comprehensive coverage for your trips</p>
                  <button className="w-full bg-earth-600 text-white py-2 rounded-lg hover:bg-earth-700 transition-colors organic-btn">
                    Get Quote
                  </button>
                </div>

                {/* Language Translation */}
                <div className="bg-white rounded-xl nature-card p-6 text-center">
                  <Globe className="h-12 w-12 text-sunshine-600 mx-auto mb-4" />
                  <h5 className="text-lg font-semibold text-stone-900 mb-2">Translation Services</h5>
                  <p className="text-stone-600 text-sm mb-4">Real-time translation and language guides</p>
                  <button className="w-full bg-sunshine-600 text-white py-2 rounded-lg hover:bg-sunshine-700 transition-colors organic-btn">
                    Translate
                  </button>
                </div>

                {/* Emergency Assistance */}
                <div className="bg-white rounded-xl nature-card p-6 text-center">
                  <Phone className="h-12 w-12 text-stone-600 mx-auto mb-4" />
                  <h5 className="text-lg font-semibold text-stone-900 mb-2">24/7 Support</h5>
                  <p className="text-stone-600 text-sm mb-4">Round-the-clock emergency assistance</p>
                  <button className="w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors organic-btn">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Stakeholder Content - Only show when no service is selected */}
          {!activeService && activeTab === 'seeker' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">Discover Amazing Events</h3>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Find the perfect experience for your next adventure. From outdoor activities to cultural events.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl nature-card overflow-hidden group relative">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Enhanced Price Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-sunshine-400 to-sunshine-500 text-white px-3 py-1 rounded-full shadow-lg">
                        <span className="text-sm font-bold">${event.price}</span>
                      </div>

                      {/* AI-Powered Badges */}
                      {event.id === '1' && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-forest-500 to-forest-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                          <Zap className="w-3 h-3 animate-pulse" />
                          <span className="text-xs font-bold">AI RECOMMENDED</span>
                        </div>
                      )}
                      {event.id === '2' && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-sunshine-500 to-sunshine-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs font-bold">AI TRENDING</span>
                        </div>
                      )}
                      {event.id === '3' && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-earth-500 to-earth-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span className="text-xs font-bold">AI MATCH 94%</span>
                        </div>
                      )}

                      {/* Action Buttons Overlay */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => toggleFavorite(event.id, favorites, setFavorites)}
                          className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                            favorites.includes(event.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white/80 text-stone-600 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-600 hover:bg-forest-500 hover:text-white transition-all">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-600 hover:bg-earth-500 hover:text-white transition-all">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quick View Button */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-stone-600 hover:bg-forest-500 hover:text-white transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="bg-forest-100 text-forest-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {event.category}
                          </span>
                          {event.id === '2' && (
                            <span className="bg-sunshine-100 text-sunshine-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                              <Gift className="h-3 w-3" />
                              <span>Early Bird</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-sunshine-500 fill-current" />
                          <span className="text-sm font-medium text-stone-700">{event.rating}</span>
                          <span className="text-xs text-stone-500">({Math.floor(Math.random() * 50) + 10})</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-stone-900 mb-3 group-hover:text-forest-700 transition-colors">
                        {event.title}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-stone-600">
                          <MapPin className="h-4 w-4 mr-2 text-earth-500" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-stone-600">
                          <Clock className="h-4 w-4 mr-2 text-earth-500" />
                          {new Date(event.date).toLocaleDateString()} • 2:00 PM
                        </div>
                        <div className="flex items-center text-sm text-stone-600">
                          <Users className="h-4 w-4 mr-2 text-earth-500" />
                          {event.attendees} going • {Math.floor(Math.random() * 20) + 5} spots left
                        </div>
                      </div>

                      {/* Social Proof */}
                      <div className="flex items-center space-x-4 mb-4 text-xs text-stone-500">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{Math.floor(Math.random() * 100) + 50} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{Math.floor(Math.random() * 20) + 5} comments</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{Math.floor(Math.random() * 500) + 100} views</span>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowBookingModal(true);
                            setBookingStep('event');
                          }}
                          className="flex-1 bg-forest-600 text-white py-2.5 px-4 rounded-lg hover:bg-forest-700 transition-all organic-btn font-medium flex items-center justify-center space-x-2"
                        >
                          <Zap className="h-4 w-4" />
                          <span>Book Package</span>
                        </button>
                        <button className="px-4 py-2.5 border border-earth-300 text-earth-600 rounded-lg hover:bg-earth-50 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Organizer Info */}
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-earth-100 rounded-full flex items-center justify-center">
                            <span className="text-xs">🏢</span>
                          </div>
                          <span className="text-sm text-stone-600">by {event.organizer}</span>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3 text-forest-500" />
                            <span className="text-xs text-forest-600">Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!activeService && activeTab === 'organizer' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">Event Organizer Dashboard</h3>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Manage your events, venues, and bookings with our comprehensive organizer tools.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl p-1 shadow-md">
                  <button
                    onClick={() => setOrganizerView('dashboard')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      organizerView === 'dashboard'
                        ? 'bg-earth-600 text-white shadow-md'
                        : 'text-stone-600 hover:bg-earth-50'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setOrganizerView('venues')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      organizerView === 'venues'
                        ? 'bg-earth-600 text-white shadow-md'
                        : 'text-stone-600 hover:bg-earth-50'
                    }`}
                  >
                    Venues
                  </button>
                  <button
                    onClick={() => setOrganizerView('create')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      organizerView === 'create'
                        ? 'bg-earth-600 text-white shadow-md'
                        : 'text-stone-600 hover:bg-earth-50'
                    }`}
                  >
                    Create Event
                  </button>
                </div>
              </div>

              {/* Dashboard View */}
              {organizerView === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-2xl nature-card p-8">
                    <h4 className="text-xl font-semibold text-stone-900 mb-6">Event Statistics</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Total Events</span>
                        <span className="text-2xl font-bold text-stone-900">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Active Bookings</span>
                        <span className="text-2xl font-bold text-earth-600">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Revenue This Month</span>
                        <span className="text-2xl font-bold text-forest-600">$12,450</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Average Rating</span>
                        <span className="text-2xl font-bold text-sunshine-600">4.8</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl nature-card p-8">
                    <h4 className="text-xl font-semibold text-stone-900 mb-6">Venue Overview</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Total Venues</span>
                        <span className="text-2xl font-bold text-stone-900">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Available Today</span>
                        <span className="text-2xl font-bold text-forest-600">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Booked This Week</span>
                        <span className="text-2xl font-bold text-earth-600">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-600">Maintenance</span>
                        <span className="text-2xl font-bold text-sunshine-600">1</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl nature-card p-8">
                    <h4 className="text-xl font-semibold text-stone-900 mb-6">Quick Actions</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setOrganizerView('create')}
                        className="w-full bg-earth-600 text-white py-3 rounded-lg hover:bg-earth-700 transition-colors font-medium organic-btn"
                      >
                        Create New Event
                      </button>
                      <button 
                        onClick={() => setOrganizerView('venues')}
                        className="w-full bg-forest-600 text-white py-3 rounded-lg hover:bg-forest-700 transition-colors font-medium organic-btn"
                      >
                        Manage Venues
                      </button>
                      <button className="w-full bg-stone-600 text-white py-3 rounded-lg hover:bg-stone-700 transition-colors font-medium organic-btn">
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Venues View */}
              {organizerView === 'venues' && (
                <div>
                  {/* Venue Category Filter */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {['all', 'Conference Hall', 'Outdoor Venue', 'Art Gallery', 'Restaurant', 'Theater'].map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedVenueCategory(category)}
                          className={`px-4 py-2 rounded-full font-medium transition-all ${
                            selectedVenueCategory === category
                              ? 'bg-earth-600 text-white shadow-md'
                              : 'bg-white text-stone-600 hover:bg-earth-50 border border-stone-300'
                          }`}
                        >
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Venues Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sampleVenues
                      .filter(venue => selectedVenueCategory === 'all' || venue.category === selectedVenueCategory)
                      .map((venue) => (
                      <div key={venue.id} className="bg-white rounded-2xl nature-card overflow-hidden">
                        <div className="relative">
                          <img
                            src={venue.image}
                            alt={venue.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-earth-100/90 backdrop-blur-sm px-3 py-1 rounded-full border border-earth-200">
                            <span className="text-sm font-semibold text-stone-900">${venue.pricePerDay}/day</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-earth-100 text-earth-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {venue.category}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-sunshine-500 fill-current" />
                              <span className="text-sm text-stone-600 ml-1">{venue.rating}</span>
                            </div>
                          </div>
                          <h4 className="text-lg font-semibold text-stone-900 mb-2">{venue.name}</h4>
                          <div className="flex items-center text-sm text-stone-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {venue.location}
                          </div>
                          <div className="flex items-center text-sm text-stone-600 mb-4">
                            <Users className="h-4 w-4 mr-1" />
                            Capacity: {venue.capacity} people
                          </div>
                          
                          {/* Availability Calendar */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-stone-900 mb-2">Next 5 Days</h5>
                            <div className="flex gap-1">
                              {venue.availability.map((day, index) => (
                                <div
                                  key={index}
                                  className={`flex-1 h-8 rounded text-xs flex items-center justify-center font-medium ${
                                    day.status === 'available'
                                      ? 'bg-forest-100 text-forest-800'
                                      : day.status === 'booked'
                                      ? 'bg-earth-100 text-earth-800'
                                      : 'bg-stone-100 text-stone-800'
                                  }`}
                                >
                                  {new Date(day.date).getDate()}
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-4 text-xs text-stone-600 mt-2">
                              <span className="flex items-center">
                                <div className="w-3 h-3 bg-forest-100 rounded mr-1"></div>
                                Available
                              </span>
                              <span className="flex items-center">
                                <div className="w-3 h-3 bg-earth-100 rounded mr-1"></div>
                                Booked
                              </span>
                              <span className="flex items-center">
                                <div className="w-3 h-3 bg-stone-100 rounded mr-1"></div>
                                Maintenance
                              </span>
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-stone-900 mb-2">Amenities</h5>
                            <div className="flex flex-wrap gap-1">
                              {venue.amenities.slice(0, 3).map((amenity, index) => (
                                <span
                                  key={index}
                                  className="bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded"
                                >
                                  {amenity}
                                </span>
                              ))}
                              {venue.amenities.length > 3 && (
                                <span className="bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded">
                                  +{venue.amenities.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          <button className="w-full bg-earth-600 text-white py-2 rounded-lg hover:bg-earth-700 transition-colors font-medium organic-btn">
                            Manage Venue
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Create Event View */}
              {organizerView === 'create' && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl nature-card p-8">
                    <h4 className="text-2xl font-semibold text-stone-900 mb-8">Create New Event</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Event Title</label>
                          <input
                            type="text"
                            placeholder="Enter event title"
                            className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Event Description</label>
                          <textarea
                            placeholder="Describe your event"
                            rows={4}
                            className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Event Date</label>
                            <input
                              type="date"
                              className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Event Time</label>
                            <input
                              type="time"
                              className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Select Venue</label>
                          <select className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent">
                            <option value="">Choose a venue</option>
                            {sampleVenues.map((venue) => (
                              <option key={venue.id} value={venue.id}>
                                {venue.name} - ${venue.pricePerDay}/day
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Ticket Price</label>
                            <input
                              type="number"
                              placeholder="0"
                              className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Max Attendees</label>
                            <input
                              type="number"
                              placeholder="100"
                              className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Event Category</label>
                          <select className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent">
                            <option value="">Select category</option>
                            <option value="adventure">Adventure</option>
                            <option value="culinary">Culinary</option>
                            <option value="education">Education</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="sports">Sports</option>
                            <option value="culture">Culture</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Event Image</label>
                          <div className="border-2 border-dashed border-earth-300 rounded-lg p-6 text-center">
                            <Camera className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                            <p className="text-stone-600">Click to upload event image</p>
                          </div>
                        </div>
                        <button className="w-full bg-earth-600 text-white py-3 rounded-lg hover:bg-earth-700 transition-colors font-medium organic-btn">
                          Create Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!activeService && activeTab === 'transport' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">Transportation Services</h3>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Find reliable transportation options or offer your transport services to event attendees.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleTransport.map((transport) => (
                  <div key={transport.id} className="bg-white rounded-2xl nature-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-stone-900">{transport.provider}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-sunshine-500 fill-current" />
                        <span className="text-sm text-stone-600 ml-1">{transport.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-sunshine-600 mr-3" />
                        <span className="text-stone-700">{transport.type}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-sunshine-600 mr-3" />
                        <span className="text-stone-700">{transport.route}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-sunshine-600 mr-3" />
                        <span className="text-stone-700">{transport.availability}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-bold text-stone-900">${transport.price}</span>
                      <button className="bg-sunshine-600 text-white px-4 py-2 rounded-lg hover:bg-sunshine-700 transition-colors organic-btn">
                        Book Transport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!activeService && activeTab === 'equipment' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-stone-900 mb-4">Equipment Rentals</h3>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Rent high-quality equipment for your adventures or list your equipment for rental income.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleEquipment.map((equipment) => (
                  <div key={equipment.id} className="bg-white rounded-2xl nature-card overflow-hidden group">
                    <div className="relative">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-stone-100/90 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-200">
                        <span className="text-sm font-semibold text-stone-900">${equipment.price}/day</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-stone-100 text-stone-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {equipment.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-sunshine-500 fill-current" />
                          <span className="text-sm text-stone-600 ml-1">{equipment.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-stone-900 mb-2">{equipment.name}</h4>
                      <p className="text-stone-600 text-sm mb-4">Provided by {equipment.provider}</p>
                      <button className="w-full bg-stone-600 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors font-medium organic-btn">
                        Rent Equipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Integrated Booking Modal */}
      {showBookingModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-stone-900">Complete Your Booking</h3>
                <p className="text-stone-600">{selectedEvent.title}</p>
              </div>
              <button 
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedEvent(null);
                  setSelectedTransport(null);
                  setSelectedEquipment([]);
                  setBookingStep('event');
                }}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-stone-600" />
              </button>
            </div>

            {/* Booking Steps */}
            <div className="p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {['event', 'transport', 'equipment', 'summary'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        bookingStep === step 
                          ? 'bg-forest-600 text-white' 
                          : index < ['event', 'transport', 'equipment', 'summary'].indexOf(bookingStep)
                          ? 'bg-forest-100 text-forest-800'
                          : 'bg-stone-200 text-stone-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        bookingStep === step ? 'text-forest-600' : 'text-stone-600'
                      }`}>
                        {step === 'event' && 'Event'}
                        {step === 'transport' && 'Transport'}
                        {step === 'equipment' && 'Equipment'}
                        {step === 'summary' && 'Summary'}
                      </span>
                      {index < 3 && <div className="w-8 h-0.5 bg-stone-200 mx-4"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              {bookingStep === 'event' && (
                <div>
                  <h4 className="text-xl font-semibold text-stone-900 mb-6">Event Details</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedEvent.image} 
                        alt={selectedEvent.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-stone-900">{selectedEvent.title}</h5>
                        <p className="text-stone-600">{selectedEvent.category}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-earth-500" />
                          <span>{selectedEvent.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-earth-500" />
                          <span>{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-earth-500" />
                          <span>{selectedEvent.attendees} attendees</span>
                        </div>
                        {selectedEvent.difficulty && (
                          <div className="flex items-center text-sm">
                            <Mountain className="h-4 w-4 mr-2 text-earth-500" />
                            <span>Difficulty: {selectedEvent.difficulty}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-forest-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-stone-900">Event Price:</span>
                          <span className="text-2xl font-bold text-forest-600">${selectedEvent.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button 
                      onClick={() => setBookingStep('transport')}
                      className="bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors organic-btn"
                    >
                      Add Transport
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 'transport' && (
                <div>
                  <h4 className="text-xl font-semibold text-stone-900 mb-6">Choose Transportation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {sampleTransport
                      .filter(transport => selectedEvent.recommendedTransport?.includes(transport.id))
                      .map((transport) => (
                      <div 
                        key={transport.id} 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTransport?.id === transport.id 
                            ? 'border-forest-500 bg-forest-50' 
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                        onClick={() => setSelectedTransport(transport)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-stone-900">{transport.provider}</h5>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-sunshine-500 fill-current" />
                            <span className="text-sm ml-1">{transport.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm text-stone-600">
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-2" />
                            <span>{transport.type}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{transport.route}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{transport.availability}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-lg font-bold text-stone-900">${transport.price}</span>
                          {selectedTransport?.id === transport.id && (
                            <CheckCircle className="h-5 w-5 text-forest-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setBookingStep('event')}
                      className="px-6 py-3 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <div className="space-x-3">
                      <button 
                        onClick={() => setBookingStep('equipment')}
                        className="px-6 py-3 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        Skip Transport
                      </button>
                      <button 
                        onClick={() => setBookingStep('equipment')}
                        disabled={!selectedTransport}
                        className="bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors organic-btn disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Equipment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 'equipment' && (
                <div>
                  <h4 className="text-xl font-semibold text-stone-900 mb-6">Choose Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {sampleEquipment
                      .filter(equipment => selectedEvent.recommendedEquipment?.includes(equipment.id))
                      .map((equipment) => (
                      <div 
                        key={equipment.id} 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedEquipment.some(eq => eq.id === equipment.id)
                            ? 'border-forest-500 bg-forest-50' 
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                        onClick={() => {
                          if (selectedEquipment.some(eq => eq.id === equipment.id)) {
                            setSelectedEquipment(selectedEquipment.filter(eq => eq.id !== equipment.id));
                          } else {
                            setSelectedEquipment([...selectedEquipment, equipment]);
                          }
                        }}
                      >
                        <img 
                          src={equipment.image} 
                          alt={equipment.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-stone-900 text-sm">{equipment.name}</h5>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-sunshine-500 fill-current" />
                            <span className="text-xs ml-1">{equipment.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 mb-2">{equipment.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-stone-900">${equipment.price}/day</span>
                          {selectedEquipment.some(eq => eq.id === equipment.id) && (
                            <CheckCircle className="h-4 w-4 text-forest-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setBookingStep('transport')}
                      className="px-6 py-3 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <div className="space-x-3">
                      <button 
                        onClick={() => setBookingStep('summary')}
                        className="px-6 py-3 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        Skip Equipment
                      </button>
                      <button 
                        onClick={() => setBookingStep('summary')}
                        className="bg-forest-600 text-white px-6 py-3 rounded-lg hover:bg-forest-700 transition-colors organic-btn"
                      >
                        Review Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 'summary' && (
                <div>
                  <h4 className="text-xl font-semibold text-stone-900 mb-6">Booking Summary</h4>
                  <div className="space-y-6">
                    {/* Event Summary */}
                    <div className="bg-stone-50 p-4 rounded-xl">
                      <h5 className="font-semibold text-stone-900 mb-2">Event</h5>
                      <div className="flex justify-between items-center">
                        <span>{selectedEvent.title}</span>
                        <span className="font-bold">${selectedEvent.price}</span>
                      </div>
                    </div>

                    {/* Transport Summary */}
                    {selectedTransport && (
                      <div className="bg-stone-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-stone-900 mb-2">Transportation</h5>
                        <div className="flex justify-between items-center">
                          <span>{selectedTransport.provider} - {selectedTransport.type}</span>
                          <span className="font-bold">${selectedTransport.price}</span>
                        </div>
                      </div>
                    )}

                    {/* Equipment Summary */}
                    {selectedEquipment.length > 0 && (
                      <div className="bg-stone-50 p-4 rounded-xl">
                        <h5 className="font-semibold text-stone-900 mb-2">Equipment</h5>
                        {selectedEquipment.map((equipment) => (
                          <div key={equipment.id} className="flex justify-between items-center mb-1">
                            <span>{equipment.name}</span>
                            <span className="font-bold">${equipment.price}/day</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total */}
                    <div className="bg-forest-50 p-4 rounded-xl border-2 border-forest-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-stone-900">Total Package Price:</span>
                        <span className="text-2xl font-bold text-forest-600">
                          ${selectedEvent.price + 
                            (selectedTransport?.price || 0) + 
                            selectedEquipment.reduce((sum, eq) => sum + eq.price, 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button 
                      onClick={() => setBookingStep('equipment')}
                      className="px-6 py-3 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => {
                        // Handle booking confirmation
                        alert('Booking confirmed! You will receive a confirmation email shortly.');
                        setShowBookingModal(false);
                        setSelectedEvent(null);
                        setSelectedTransport(null);
                        setSelectedEquipment([]);
                        setBookingStep('event');
                      }}
                      className="bg-forest-600 text-white px-8 py-3 rounded-lg hover:bg-forest-700 transition-colors organic-btn font-semibold"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Floating Assistant */}
      {aiAssistantActive && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gradient-to-r from-forest-500 to-forest-600 rounded-2xl shadow-2xl p-4 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-forest-600" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Uganda AI Assistant</h4>
                  <p className="text-forest-100 text-xs">Powered by Smart Tourism AI</p>
                </div>
              </div>
              <button 
                onClick={() => setAiAssistantActive(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3 mb-3">
              <p className="text-white text-sm">
                🤖 I'm analyzing your preferences... Based on your interests in {aiPersonalization.interests.join(' & ')}, 
                I recommend exploring our {activeService || activeTab} section!
              </p>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm py-2 px-3 rounded-lg transition-colors flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI Anything
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm py-2 px-3 rounded-lg transition-colors flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Get Smart Recommendations
              </button>
            </div>

            {/* AI Insights */}
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center justify-between text-xs text-forest-100">
                <span>AI Confidence: 94%</span>
                <span>Learning from 15.2K+ tourists</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendations Sidebar */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 w-64">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="h-5 w-5 text-forest-600" />
            <h4 className="font-semibold text-stone-900">AI Insights</h4>
          </div>
          
          <div className="space-y-3">
            <div className="bg-forest-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-forest-600" />
                <span className="text-sm font-medium text-stone-900">Trending Now</span>
              </div>
              <p className="text-xs text-stone-600">Gorilla trekking bookings up 34% this week</p>
            </div>

            <div className="bg-sunshine-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-sunshine-600" />
                <span className="text-sm font-medium text-stone-900">Best Time</span>
              </div>
              <p className="text-xs text-stone-600">AI suggests visiting between 2-4 PM today</p>
            </div>

            <div className="bg-earth-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-earth-600" />
                <span className="text-sm font-medium text-stone-900">Crowd Level</span>
              </div>
              <p className="text-xs text-stone-600">Moderate crowds expected - perfect timing!</p>
            </div>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-forest-500 to-forest-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-forest-600 hover:to-forest-700 transition-all">
            Get Personalized Plan
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="h-8 w-8 text-forest-400" />
                <h3 className="text-2xl font-bold">TourismHub</h3>
              </div>
              <p className="text-stone-400">
                Connecting travelers, organizers, transport providers, and equipment rentals for unforgettable experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Event Seekers</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Browse Events</li>
                <li>Book Experiences</li>
                <li>Reviews & Ratings</li>
                <li>Travel Planning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-stone-400">
                <li>List Your Services</li>
                <li>Manage Bookings</li>
                <li>Analytics Dashboard</li>
                <li>Payment Processing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-stone-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2025 TourismHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;