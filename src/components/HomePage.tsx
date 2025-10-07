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
  { id: 'seeker', label: 'Explore Events', icon: Calendar, color: 'bg-gradient-to-br from-forest-500 to-forest-600' },
  { id: 'organizer', label: 'Plan Events', icon: Users, color: 'bg-gradient-to-br from-sunshine-500 to-sunshine-600' },
  { id: 'transport', label: 'Transportation', icon: Truck, color: 'bg-gradient-to-br from-earth-500 to-earth-600' },
  { id: 'equipment', label: 'Equipment Rental', icon: Wrench, color: 'bg-gradient-to-br from-sky-500 to-sky-600' },
];

const additionalServices = [
  { id: 'ai-guide', label: 'AI Guides', icon: Bot, color: 'bg-gradient-to-br from-purple-500 to-purple-600', description: 'Personal AI travel assistant' },
  { id: 'accommodation', label: 'Stay', icon: Palmtree, color: 'bg-gradient-to-br from-teal-500 to-teal-600', description: 'Hotels, lodges & campsites' },
  { id: 'connectivity', label: 'Connectivity', icon: Wifi, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Data plans & SIM cards' },
  { id: 'entertainment', label: 'Entertainment', icon: Music, color: 'bg-gradient-to-br from-pink-500 to-pink-600', description: 'Nightlife & events' },
  { id: 'photography', label: 'Photography', icon: Camera, color: 'bg-gradient-to-br from-amber-500 to-amber-600', description: 'Pro photographers' },
  { id: 'translation', label: 'Translation', icon: MessageCircle, color: 'bg-gradient-to-br from-green-500 to-green-600', description: 'Real-time translation' },
  { id: 'weather', label: 'Weather AI', icon: Cloud, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600', description: 'Smart weather forecasts' },
  { id: 'safety', label: 'Safety', icon: Shield, color: 'bg-gradient-to-br from-red-500 to-red-600', description: 'Emergency assistance' },
  { id: 'shop', label: 'Shop', icon: Award, color: 'bg-gradient-to-br from-orange-500 to-orange-600', description: 'Souvenirs & local crafts' },
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-forest-50 via-white to-sunshine-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-forest-100 rounded-full mb-6">
            <Zap className="h-4 w-4 text-forest-600 mr-2" />
            <span className="font-medium">AI-Powered Tourism Platform</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stakeholderTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className="p-6 rounded-2xl border-2 border-stone-300 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-md hover:border-stone-400 hover:shadow-lg"
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

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-stone-900 text-center mb-8">Additional Tourism Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {additionalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => onNavigate('seeker', service.id)}
                    className="p-4 rounded-xl border-2 border-stone-300 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 group shadow-md hover:border-stone-400 hover:shadow-lg"
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

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-12 w-12 text-forest-600 mr-4" />
              <h3 className="text-3xl font-bold text-stone-900">AI-Powered Uganda Guides</h3>
            </div>
            <p className="text-stone-600 max-w-3xl mx-auto">
              Meet your intelligent travel companions! Our AI guides provide real-time assistance, cultural insights, and personalized recommendations throughout your Uganda adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {sampleAIGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-forest-400 to-forest-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {guide.avatar}
                </div>

                <h4 className="text-xl font-bold text-stone-900 mb-2">{guide.name}</h4>
                <p className="text-forest-600 font-medium mb-3">{guide.specialty}</p>
                <p className="text-stone-600 text-sm mb-4">{guide.personality}</p>

                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                    <span className="font-semibold">{guide.rating}</span>
                  </div>
                  <div className="text-sm text-stone-600">
                    {guide.interactions.toLocaleString()} interactions
                  </div>
                </div>

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

                <div className="mb-6">
                  <h5 className="font-semibold text-stone-900 mb-2">AI Capabilities</h5>
                  <div className="space-y-2">
                    {Object.entries(guide.capabilities).map(([capability, enabled]) => (
                      <div key={capability} className="flex items-center justify-between text-sm">
                        <span className="text-stone-600">{capability}</span>
                        {enabled ? (
                          <span className="text-green-600 font-medium">✓</span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('seeker', 'ai-guide')}
                  className="w-full bg-gradient-to-r from-forest-500 to-forest-600 text-white py-2 px-4 rounded-lg font-medium hover:from-forest-600 hover:to-forest-700 transition-all"
                >
                  Chat with {guide.name}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('seeker', 'ai-guide')}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-forest-500 to-forest-600 text-white font-semibold rounded-lg hover:from-forest-600 hover:to-forest-700 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Chatting with AI Guides
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
