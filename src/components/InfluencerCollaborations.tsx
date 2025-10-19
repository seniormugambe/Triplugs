import React, { useState } from 'react';
import { Users, Instagram, Youtube, Camera, MapPin, Calendar, Star, Play, Heart, MessageCircle, Share2, ExternalLink, Verified } from 'lucide-react';

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  followers: number;
  engagement: number;
  specialty: string[];
  platforms: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
  verified: boolean;
  collaborations: number;
  rating: number;
  recentContent: ContentItem[];
}

interface ContentItem {
  id: string;
  type: 'photo' | 'video' | 'story' | 'reel';
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  date: string;
  location: string;
  description: string;
}

const sampleInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Nakato Sarah',
    username: '@sarahexploresuganda',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
    bio: 'Wildlife photographer & conservation advocate. Showcasing Uganda\'s natural beauty 🇺🇬',
    location: 'Kampala, Uganda',
    followers: 125000,
    engagement: 8.5,
    specialty: ['Wildlife Photography', 'Conservation', 'Safari Tours', 'Nature'],
    platforms: {
      instagram: '@sarahexploresuganda',
      youtube: 'Sarah Explores Uganda',
      tiktok: '@sarahuganda'
    },
    verified: true,
    collaborations: 45,
    rating: 4.9,
    recentContent: [
      {
        id: '1',
        type: 'video',
        title: 'Gorilla Trekking in Bwindi - Full Experience',
        thumbnail: 'https://images.unsplash.com/photo-1631317870276-8b2d0d8e7e8e?auto=format&fit=crop&w=400&q=80',
        views: 89000,
        likes: 12500,
        comments: 890,
        date: '2025-02-12',
        location: 'Bwindi Impenetrable Forest',
        description: 'Join me on an incredible gorilla trekking adventure!'
      },
      {
        id: '2',
        type: 'photo',
        title: 'Sunrise at Queen Elizabeth National Park',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        views: 45000,
        likes: 8900,
        comments: 234,
        date: '2025-02-10',
        location: 'Queen Elizabeth National Park',
        description: 'The most beautiful sunrise over the savanna'
      }
    ]
  },
  {
    id: '2',
    name: 'David Mukasa',
    username: '@culturaluganda',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bio: 'Cultural storyteller sharing Uganda\'s rich traditions and heritage 🏛️',
    location: 'Entebbe, Uganda',
    followers: 78000,
    engagement: 9.2,
    specialty: ['Cultural Heritage', 'Traditional Arts', 'Local Communities', 'History'],
    platforms: {
      instagram: '@culturaluganda',
      youtube: 'Cultural Uganda Stories',
      twitter: '@culturaluganda'
    },
    verified: true,
    collaborations: 32,
    rating: 4.8,
    recentContent: [
      {
        id: '3',
        type: 'video',
        title: 'Buganda Kingdom Royal Ceremonies',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
        views: 56000,
        likes: 7800,
        comments: 456,
        date: '2025-02-11',
        location: 'Mengo Palace',
        description: 'Exploring the rich traditions of the Buganda Kingdom'
      }
    ]
  },
  {
    id: '3',
    name: 'Emma Adventures',
    username: '@emmaadventures',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    bio: 'Adventure seeker & travel blogger. Extreme sports in East Africa 🏔️',
    location: 'Jinja, Uganda',
    followers: 95000,
    engagement: 7.8,
    specialty: ['Adventure Sports', 'White Water Rafting', 'Mountain Climbing', 'Extreme Tourism'],
    platforms: {
      instagram: '@emmaadventures',
      youtube: 'Emma Adventures',
      tiktok: '@emmaadventures'
    },
    verified: false,
    collaborations: 28,
    rating: 4.7,
    recentContent: [
      {
        id: '4',
        type: 'reel',
        title: 'Grade 5 Rapids on the Nile',
        thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
        views: 120000,
        likes: 15600,
        comments: 1200,
        date: '2025-02-09',
        location: 'Jinja, Nile River',
        description: 'Conquering the most challenging rapids!'
      }
    ]
  }
];

export function InfluencerCollaborations() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('followers');

  const specialties = ['all', 'Wildlife Photography', 'Cultural Heritage', 'Adventure Sports', 'Conservation', 'Traditional Arts'];

  const filteredInfluencers = selectedSpecialty === 'all' 
    ? sampleInfluencers 
    : sampleInfluencers.filter(influencer => 
        influencer.specialty.some(spec => spec === selectedSpecialty)
      );

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return b.followers - a.followers;
      case 'engagement':
        return b.engagement - a.engagement;
      case 'rating':
        return b.rating - a.rating;
      case 'collaborations':
        return b.collaborations - a.collaborations;
      default:
        return 0;
    }
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'photo': return <Camera className="h-4 w-4" />;
      case 'reel': return <Play className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  if (selectedInfluencer) {
    return (
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setSelectedInfluencer(null)}
          className="mb-6 text-sunshine-600 hover:text-sunshine-700 font-medium"
        >
          ← Back to Influencers
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Influencer Header */}
          <div className="bg-gradient-to-r from-sunshine-500 to-orange-500 p-8 text-white">
            <div className="flex items-start gap-6">
              <img
                src={selectedInfluencer.avatar}
                alt={selectedInfluencer.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{selectedInfluencer.name}</h1>
                  {selectedInfluencer.verified && (
                    <Verified className="h-6 w-6 text-blue-300" />
                  )}
                </div>
                <p className="text-xl opacity-90 mb-2">{selectedInfluencer.username}</p>
                <p className="opacity-80 mb-4">{selectedInfluencer.bio}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedInfluencer.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {formatNumber(selectedInfluencer.followers)} followers
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {selectedInfluencer.rating} rating
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <button className="bg-white text-sunshine-600 px-6 py-2 rounded-lg font-medium hover:bg-stone-50 transition-colors mb-3">
                  Collaborate
                </button>
                <div className="text-sm opacity-80">
                  {selectedInfluencer.collaborations} collaborations
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 p-6 border-b border-stone-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{formatNumber(selectedInfluencer.followers)}</div>
              <div className="text-sm text-stone-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{selectedInfluencer.engagement}%</div>
              <div className="text-sm text-stone-600">Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{selectedInfluencer.collaborations}</div>
              <div className="text-sm text-stone-600">Collaborations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900">{selectedInfluencer.rating}</div>
              <div className="text-sm text-stone-600">Rating</div>
            </div>
          </div>

          {/* Specialties */}
          <div className="p-6 border-b border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {selectedInfluencer.specialty.map((spec) => (
                <span
                  key={spec}
                  className="bg-sunshine-100 text-sunshine-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Social Platforms */}
          <div className="p-6 border-b border-stone-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">Social Platforms</h3>
            <div className="flex gap-4">
              {selectedInfluencer.platforms.instagram && (
                <a
                  href="#"
                  className="flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  {selectedInfluencer.platforms.instagram}
                </a>
              )}
              {selectedInfluencer.platforms.youtube && (
                <a
                  href="#"
                  className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  {selectedInfluencer.platforms.youtube}
                </a>
              )}
            </div>
          </div>

          {/* Recent Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Recent Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedInfluencer.recentContent.map((content) => (
                <div key={content.id} className="border border-stone-200 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      {getContentIcon(content.type)}
                      {content.type}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">{content.title}</h4>
                    <p className="text-sm text-stone-600 mb-3">{content.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {content.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(content.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {formatNumber(content.likes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {formatNumber(content.comments)}
                        </div>
                      </div>
                      <button className="text-sunshine-600 hover:text-sunshine-700 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Local Influencer Collaborations</h2>
        <p className="text-stone-600">Partner with authentic Ugandan content creators to showcase your experiences</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            <option value="all">All Specialties</option>
            {specialties.slice(1).map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            <option value="followers">Most Followers</option>
            <option value="engagement">Highest Engagement</option>
            <option value="rating">Highest Rated</option>
            <option value="collaborations">Most Collaborations</option>
          </select>
        </div>
      </div>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedInfluencers.map((influencer) => (
          <div
            key={influencer.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => setSelectedInfluencer(influencer)}
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900">{influencer.name}</h3>
                    {influencer.verified && (
                      <Verified className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sunshine-600 text-sm mb-1">{influencer.username}</p>
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <MapPin className="h-3 w-3" />
                    {influencer.location}
                  </div>
                </div>
              </div>

              <p className="text-stone-600 text-sm mb-4 line-clamp-2">{influencer.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="font-bold text-stone-900">{formatNumber(influencer.followers)}</div>
                  <div className="text-xs text-stone-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-stone-900">{influencer.engagement}%</div>
                  <div className="text-xs text-stone-500">Engagement</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {influencer.specialty.slice(0, 2).map((spec) => (
                  <span
                    key={spec}
                    className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs"
                  >
                    {spec}
                  </span>
                ))}
                {influencer.specialty.length > 2 && (
                  <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs">
                    +{influencer.specialty.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{influencer.rating}</span>
                  <span className="text-xs text-stone-500">({influencer.collaborations})</span>
                </div>
                
                <button className="bg-sunshine-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sunshine-600 transition-colors group-hover:bg-sunshine-600">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto mb-4 text-stone-400" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">No influencers found</h3>
          <p className="text-stone-600">Try adjusting your filters to see more creators.</p>
        </div>
      )}
    </div>
  );
}