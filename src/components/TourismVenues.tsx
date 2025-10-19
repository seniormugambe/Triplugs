import React, { useState } from 'react';
import { TourismMap, ugandaTourismVenues, type TourismVenue } from './TourismMap';
import { MapPin, Star, Clock, DollarSign, Users, Phone, Globe, Camera, Filter, Map, List, Navigation } from 'lucide-react';

export function TourismVenues() {
  const [selectedVenue, setSelectedVenue] = useState<TourismVenue | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'both'>('both');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const venueTypes = ['all', 'national_park', 'cultural_site', 'adventure', 'wildlife', 'waterfall', 'lake', 'mountain'];

  const filteredVenues = ugandaTourismVenues.filter(venue => 
    filterType === 'all' || venue.type === filterType
  );

  const sortedVenues = [...filteredVenues].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getTypeLabel = (type: string) => {
    const labels = {
      national_park: 'National Park',
      cultural_site: 'Cultural Site',
      adventure: 'Adventure',
      wildlife: 'Wildlife',
      waterfall: 'Waterfall',
      lake: 'Lake',
      mountain: 'Mountain'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      national_park: 'bg-forest-100 text-forest-700',
      cultural_site: 'bg-sunshine-100 text-sunshine-700',
      adventure: 'bg-red-100 text-red-700',
      wildlife: 'bg-emerald-100 text-emerald-700',
      waterfall: 'bg-blue-100 text-blue-700',
      lake: 'bg-cyan-100 text-cyan-700',
      mountain: 'bg-purple-100 text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-triplugs-900 mb-4 font-display">
          Discover Uganda's Tourism Gems
        </h2>
        <p className="text-xl text-triplugs-700 max-w-3xl mx-auto leading-relaxed font-medium">
          Explore Uganda's most spectacular destinations with interactive maps, detailed information, and real-time location services
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-triplugs-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-triplugs-700">View:</span>
            <div className="flex bg-triplugs-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-triplugs-500 text-white' 
                    : 'text-triplugs-700 hover:bg-triplugs-200'
                }`}
              >
                <Map className="h-4 w-4 inline mr-1" />
                Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-triplugs-500 text-white' 
                    : 'text-triplugs-700 hover:bg-triplugs-200'
                }`}
              >
                <List className="h-4 w-4 inline mr-1" />
                List
              </button>
              <button
                onClick={() => setViewMode('both')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'both' 
                    ? 'bg-triplugs-500 text-white' 
                    : 'text-triplugs-700 hover:bg-triplugs-200'
                }`}
              >
                <Navigation className="h-4 w-4 inline mr-1" />
                Both
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-triplugs-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-triplugs-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-triplugs-500"
              >
                <option value="all">All Types</option>
                {venueTypes.slice(1).map((type) => (
                  <option key={type} value={type}>{getTypeLabel(type)}</option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-triplugs-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-triplugs-500"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`grid gap-6 ${viewMode === 'both' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Map View */}
        {(viewMode === 'map' || viewMode === 'both') && (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-triplugs-200">
            <div className="h-[600px]">
              <TourismMap
                selectedVenue={selectedVenue?.id}
                onVenueSelect={setSelectedVenue}
              />
            </div>
          </div>
        )}

        {/* List View */}
        {(viewMode === 'list' || viewMode === 'both') && (
          <div className="space-y-4">
            {sortedVenues.map((venue) => (
              <div
                key={venue.id}
                className={`triplugs-card p-6 cursor-pointer transition-all duration-300 ${
                  selectedVenue?.id === venue.id ? 'ring-2 ring-triplugs-500 bg-triplugs-50' : ''
                }`}
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="flex gap-4">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-triplugs-900 mb-1">{venue.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(venue.type)}`}>
                          {getTypeLabel(venue.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-triplugs-900">{venue.rating}</span>
                        <span className="text-sm text-gray-500">({venue.reviews})</span>
                      </div>
                    </div>

                    <p className="text-triplugs-700 text-sm mb-3 line-clamp-2">{venue.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center gap-1 text-triplugs-600">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Best Time:</span>
                        <span>{venue.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-triplugs-600">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium">Entry:</span>
                        <span>{venue.entryFee}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {venue.activities.slice(0, 4).map((activity, index) => (
                        <span
                          key={index}
                          className="bg-triplugs-100 text-triplugs-700 px-2 py-1 rounded text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                      {venue.activities.length > 4 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{venue.activities.length - 4} more
                        </span>
                      )}
                    </div>

                    {venue.contact && (
                      <div className="flex gap-3">
                        {venue.contact.phone && (
                          <a
                            href={`tel:${venue.contact.phone}`}
                            className="flex items-center gap-1 text-xs text-triplugs-600 hover:text-triplugs-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="h-3 w-3" />
                            Call
                          </a>
                        )}
                        {venue.contact.website && (
                          <a
                            href={`https://${venue.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-triplugs-600 hover:text-triplugs-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="h-3 w-3" />
                            Website
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Venue Details */}
      {selectedVenue && (
        <div className="bg-gradient-to-br from-triplugs-50 to-nature-50 rounded-xl p-8 border-2 border-triplugs-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedVenue.image}
                alt={selectedVenue.name}
                className="w-full h-64 rounded-xl object-cover shadow-lg"
              />
            </div>
            
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-triplugs-900 mb-2">{selectedVenue.name}</h3>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(selectedVenue.type)}`}>
                    {getTypeLabel(selectedVenue.type)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-xl font-bold text-triplugs-900">{selectedVenue.rating}</span>
                  <span className="text-gray-500">({selectedVenue.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-triplugs-700 mb-6 leading-relaxed">{selectedVenue.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-triplugs-600">
                  <Clock className="h-4 w-4" />
                  <div>
                    <span className="font-medium">Best Time to Visit:</span>
                    <div className="text-sm">{selectedVenue.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-triplugs-600">
                  <DollarSign className="h-4 w-4" />
                  <div>
                    <span className="font-medium">Entry Fee:</span>
                    <div className="text-sm">{selectedVenue.entryFee}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-triplugs-900 mb-3">Activities & Experiences</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVenue.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-triplugs-100 text-triplugs-700 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-triplugs-900 mb-3">Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedVenue.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 text-triplugs-700">
                      <div className="w-2 h-2 bg-triplugs-500 rounded-full"></div>
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedVenue.contact && (
                <div className="flex gap-4">
                  {selectedVenue.contact.phone && (
                    <a
                      href={`tel:${selectedVenue.contact.phone}`}
                      className="flex items-center gap-2 bg-triplugs-500 text-white px-4 py-2 rounded-lg hover:bg-triplugs-600 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  )}
                  {selectedVenue.contact.website && (
                    <a
                      href={`https://${selectedVenue.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-nature-500 text-white px-4 py-2 rounded-lg hover:bg-nature-600 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 text-center shadow-lg border border-triplugs-200">
          <div className="text-3xl font-bold text-triplugs-600 mb-2">{ugandaTourismVenues.length}</div>
          <div className="text-sm text-triplugs-700 font-medium">Tourism Venues</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-lg border border-triplugs-200">
          <div className="text-3xl font-bold text-nature-600 mb-2">
            {ugandaTourismVenues.filter(v => v.type === 'national_park').length}
          </div>
          <div className="text-sm text-triplugs-700 font-medium">National Parks</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-lg border border-triplugs-200">
          <div className="text-3xl font-bold text-forest-600 mb-2">
            {ugandaTourismVenues.reduce((sum, v) => sum + v.reviews, 0).toLocaleString()}
          </div>
          <div className="text-sm text-triplugs-700 font-medium">Total Reviews</div>
        </div>
        <div className="bg-white rounded-lg p-6 text-center shadow-lg border border-triplugs-200">
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            {(ugandaTourismVenues.reduce((sum, v) => sum + v.rating, 0) / ugandaTourismVenues.length).toFixed(1)}
          </div>
          <div className="text-sm text-triplugs-700 font-medium">Average Rating</div>
        </div>
      </div>
    </div>
  );
}