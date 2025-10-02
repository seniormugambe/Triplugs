import React from 'react';
import { MapPin, Users, Star, Bed, Bath, Heart } from 'lucide-react';
import { Accommodation } from '../lib/supabase';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onSelect: (accommodation: Accommodation) => void;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(accommodation)}
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={accommodation.images[0]}
          alt={accommodation.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {accommodation.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{accommodation.name}</h3>
            <div className="flex items-center text-slate-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {accommodation.city}, {accommodation.country}
            </div>
          </div>
        </div>

        <div className="flex items-center mb-3">
          {accommodation.rating > 0 && (
            <>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
              <span className="font-semibold text-slate-900">{accommodation.rating.toFixed(1)}</span>
              <span className="text-slate-500 text-sm ml-1">({accommodation.total_reviews} reviews)</span>
            </>
          )}
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {accommodation.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {accommodation.max_guests} guests
          </div>
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {accommodation.bedrooms} beds
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {accommodation.bathrooms} baths
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {accommodation.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {accommodation.amenities.length > 3 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
              +{accommodation.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            <span className="text-2xl font-bold text-slate-900">${accommodation.price_per_night}</span>
            <span className="text-slate-600 text-sm"> / night</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(accommodation);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
