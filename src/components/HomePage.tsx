import React from 'react';
import { Calendar, MapPin, Truck, Wrench, Zap, Bot, Palmtree, Wifi, Music, Camera, MessageCircle, Cloud, Shield, Award, Star, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, service?: string) => void;
}

interface AIGuide {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  personality: string;
  rating: number;
  interactions: number;
  languages: string[];
  capabilities: {
    [key: string]: boolean;
  };
}

const stakeholderTabs = [
  { id: 'seeker', label: 'Explore Uganda', icon: Calendar, color: 'emerald-bg' },
  { id: 'organizer', label: 'Plan Adventures', icon: Users, color: 'jungle-bg' },
  { id: 'transport', label: 'Transportation', icon: Truck, color: 'forest-accent' },
  { id: 'equipment', label: 'Safari Gear', icon: Wrench, color: 'bg-gradient-to-br from-forest-500 to-forest-600' },
];

const additionalServices = [
  { id: 'venues', label: 'Map & Venues', icon: MapPin, color: 'bg-gradient-to-br from-triplugs-500 to-triplugs-600', description: 'Interactive tourism map' },
  { id: 'ai-guide', label: 'AI Guides', icon: Bot, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', description: 'Smart Uganda guides' },
  { id: 'accommodation', label: 'Lodges', icon: Palmtree, color: 'bg-gradient-to-br from-forest-500 to-forest-600', description: 'Eco-lodges & camps' },
  { id: 'connectivity', label: 'Connect', icon: Wifi, color: 'bg-gradient-to-br from-jungle-500 to-jungle-600', description: 'Stay connected' },
  { id: 'entertainment', label: 'Culture', icon: Music, color: 'bg-gradient-to-br from-emerald-600 to-emerald-700', description: 'Local experiences' },
  { id: 'photography', label: 'Capture', icon: Camera, color: 'bg-gradient-to-br from-forest-600 to-forest-700', description: 'Wildlife photography' },
];

const sampleAIGuides: AIGuide[] = [
  {
    id: '1',
    name: 'Amina',
    avatar: '🦍',
    specialty: 'Wildlife & Safari Expert',
    personality: 'Enthusiastic and knowledgeable about Uganda\'s incredible wildlife',
    rating: 4.9,
    interactions: 12500,
    languages: ['English', 'Luganda', 'Swahili', 'French'],
    capabilities: {
      'Real-time Q&A': true,
      'Cultural Insights': true,
      'Route Planning': true,
      'Photo Recognition': true,
      'Emergency Help': true,
    }
  },
  {
    id: '2',
    name: 'Kato',
    avatar: '🏔️',
    specialty: 'Adventure & Hiking Guide',
    personality: 'Adventurous spirit with deep knowledge of Uganda\'s mountains and trails',
    rating: 4.8,
    interactions: 9800,
    languages: ['English', 'Luganda', 'Runyankole'],
    capabilities: {
      'Real-time Q&A': true,
      'Cultural Insights': true,
      'Route Planning': true,
      'Weather Updates': true,
      'Emergency Help': true,
    }
  },
  {
    id: '3',
    name: 'Naomi',
    avatar: '🎭',
    specialty: 'Cultural Heritage Expert',
    personality: 'Warm and insightful guide to Uganda\'s rich cultural traditions',
    rating: 5.0,
    interactions: 15200,
    languages: ['English', 'Luganda', 'Ateso', 'Lusoga'],
    capabilities: {
      'Real-time Q&A': true,
      'Cultural Insights': true,
      'Historical Context': true,
      'Language Help': true,
      'Local Etiquette': true,
    }
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      {/* Hero Section - Triplugs Green Paradise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nature-50 via-forest-50 to-emerald-50 triplugs-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-triplugs-100 to-nature-100 rounded-full mb-8 border border-triplugs-200 shadow-lg">
            <Zap className="h-5 w-5 text-triplugs-600 mr-3" />
            <span className="font-bold text-triplugs-700">Triplugs - Pearl of Africa</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-stone-900 mb-8 leading-tight font-display">
            Welcome to{' '}
            <span className="triplugs-text">
              Triplugs
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-forest-700 font-medium">
              Uganda's Green Paradise
            </span>
          </h1>
          
          <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in Uganda's emerald landscapes with Triplugs - your AI-powered gateway to pristine rainforests, 
            majestic mountain gorillas, and the legendary source of the Nile. Experience the world's greenest adventure destination.
          </p>

          {/* Triplugs Stats */}
          <div className="flex items-center justify-center space-x-8 mb-12 text-sm">
            <div className="flex items-center space-x-2 bg-triplugs-50/80 backdrop-blur-sm px-5 py-3 rounded-full border border-triplugs-200">
              <div className="w-3 h-3 bg-triplugs-500 rounded-full animate-pulse"></div>
              <span className="text-triplugs-800 font-bold">25.8K+ green adventurers</span>
            </div>
            <div className="flex items-center space-x-2 bg-nature-50/80 backdrop-blur-sm px-5 py-3 rounded-full border border-nature-200">
              <Star className="h-4 w-4 text-nature-500 fill-current" />
              <span className="text-nature-800 font-bold">4.9/5 wilderness rating</span>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => onNavigate('seeker')}
              className="triplugs-btn px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-300"
            >
              <Calendar className="h-7 w-7 inline mr-3" />
              Discover Green Uganda
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-12 py-5 bg-gradient-to-r from-nature-500 via-forest-500 to-emerald-500 text-white font-bold text-xl rounded-2xl hover:from-nature-600 hover:via-forest-600 hover:to-emerald-600 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 duration-300"
            >
              <Award className="h-7 w-7 inline mr-3" />
              Shop Eco Treasures
            </button>
          </div>
        </div>
      </section>

      {/* Main Services - Triplugs Green Paradise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-triplugs-50 to-nature-50 green-paradise">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-6 font-display">Your Triplugs Adventure Awaits</h2>
            <p className="text-xl text-forest-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Embark on extraordinary journeys through Uganda's emerald wilderness. From gorilla encounters to Nile expeditions, 
              Triplugs connects you with nature's most spectacular experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stakeholderTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className="triplugs-card group p-8 rounded-3xl transition-all duration-300"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl ${tab.color} flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-xl`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-forest-900 mb-3 font-display">{tab.label}</h3>
                  <p className="text-forest-600 font-medium">
                    {tab.id === 'seeker' && 'Explore Uganda\'s green paradise'}
                    {tab.id === 'organizer' && 'Create sustainable adventures'}
                    {tab.id === 'transport' && 'Journey through emerald landscapes'}
                    {tab.id === 'equipment' && 'Premium eco-adventure gear'}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Triplugs Services */}
          <div className="bg-gradient-to-br from-triplugs-100 via-nature-100 to-forest-100 rounded-3xl p-12 border-2 border-triplugs-200 shadow-2xl">
            <h3 className="text-3xl font-bold text-triplugs-900 text-center mb-10 font-display">Triplugs Green Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {additionalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => onNavigate(
                      service.id === 'shop' ? 'shop' : 
                      service.id === 'accommodation' ? 'accommodation' : 
                      service.id === 'venues' ? 'venues' : 
                      'seeker', 
                      service.id
                    )}
                    className="group p-6 rounded-2xl bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 text-center triplugs-card"
                  >
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h4 className="text-sm font-bold text-triplugs-900 mb-2">{service.label}</h4>
                    <p className="text-xs text-triplugs-700 font-medium">{service.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Triplugs AI Guides */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nature-50 via-triplugs-50 to-forest-50 triplugs-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-triplugs-500 via-nature-500 to-forest-500 rounded-full flex items-center justify-center mr-4 shadow-2xl">
                <Bot className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-triplugs-900 font-display">Triplugs AI Green Guides</h2>
            </div>
            <p className="text-xl text-triplugs-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Experience Uganda's wilderness with our revolutionary AI companions. Triplugs guides blend ancient wisdom 
              with modern intelligence to unlock the secrets of Africa's greenest paradise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {sampleAIGuides.map((guide, index) => (
              <div key={guide.id} className="triplugs-card p-10 text-center group">
                <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-2xl ${
                  index === 0 ? 'bg-gradient-to-br from-triplugs-400 via-nature-400 to-forest-400' :
                  index === 1 ? 'bg-gradient-to-br from-nature-400 via-emerald-400 to-triplugs-400' :
                  'bg-gradient-to-br from-forest-400 via-triplugs-400 to-emerald-400'
                } group-hover:scale-125 transition-transform duration-300`}>
                  {guide.avatar}
                </div>
                <h3 className="text-2xl font-bold text-triplugs-900 mb-3 font-display">{guide.name}</h3>
                <p className="text-triplugs-600 font-bold mb-4 text-lg">{guide.specialty}</p>
                <p className="text-triplugs-700 text-sm mb-6 leading-relaxed font-medium">{guide.personality}</p>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="flex items-center bg-triplugs-100 px-4 py-2 rounded-full border border-triplugs-200">
                    <Star className="h-4 w-4 text-triplugs-600 fill-current mr-1" />
                    <span className="font-bold text-triplugs-800">{guide.rating}</span>
                  </div>
                  <div className="bg-nature-100 px-4 py-2 rounded-full border border-nature-200">
                    <span className="text-nature-800 font-bold text-sm">{guide.languages.length} languages</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onNavigate('seeker', 'ai-guide')}
                  className="w-full triplugs-btn py-4 px-6 rounded-xl font-bold transition-all duration-300 text-lg"
                >
                  Connect with {guide.name}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('seeker', 'ai-guide')}
              className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-triplugs-500 via-nature-500 to-forest-500 text-white font-bold text-xl rounded-2xl hover:from-triplugs-600 hover:via-nature-600 hover:to-forest-600 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 duration-300"
            >
              <MessageCircle className="h-7 w-7 mr-3" />
              Start Your Triplugs Journey
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
