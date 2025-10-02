import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, DollarSign, Home, Users, X } from 'lucide-react';
import { Accommodation, supabase } from '../lib/supabase';
import { AccommodationCard } from './AccommodationCard';
import { AccommodationDetail } from './AccommodationDetail';
import { BookingForm } from './BookingForm';

export const AccommodationList: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [bookingAccommodation, setBookingAccommodation] = useState<Accommodation | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minGuests: '',
    featured: false,
  });

  useEffect(() => {
    loadAccommodations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [accommodations, searchTerm, filters]);

  const loadAccommodations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('accommodations')
      .select('*')
      .eq('available', true)
      .order('featured', { ascending: false })
      .order('rating', { ascending: false });

    if (!error && data) {
      setAccommodations(data);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...accommodations];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (acc) =>
          acc.name.toLowerCase().includes(term) ||
          acc.description.toLowerCase().includes(term) ||
          acc.city.toLowerCase().includes(term) ||
          acc.location.toLowerCase().includes(term)
      );
    }

    if (filters.type) {
      filtered = filtered.filter((acc) => acc.type === filters.type);
    }

    if (filters.city) {
      filtered = filtered.filter((acc) => acc.city === filters.city);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((acc) => acc.price_per_night >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((acc) => acc.price_per_night <= parseFloat(filters.maxPrice));
    }

    if (filters.minGuests) {
      filtered = filtered.filter((acc) => acc.max_guests >= parseInt(filters.minGuests));
    }

    if (filters.featured) {
      filtered = filtered.filter((acc) => acc.featured);
    }

    setFilteredAccommodations(filtered);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minGuests: '',
      featured: false,
    });
    setSearchTerm('');
  };

  const uniqueTypes = Array.from(new Set(accommodations.map((acc) => acc.type)));
  const uniqueCities = Array.from(new Set(accommodations.map((acc) => acc.city)));

  const hasActiveFilters =
    filters.type ||
    filters.city ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minGuests ||
    filters.featured;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Your Perfect Stay</h1>
          <p className="text-slate-600 text-lg">
            Discover amazing accommodations across Rwanda
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  Active
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-slate-200">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Home className="w-4 h-4" />
                    Property Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    City
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Cities</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Users className="w-4 h-4" />
                    Min Guests
                  </label>
                  <input
                    type="number"
                    value={filters.minGuests}
                    onChange={(e) => setFilters({ ...filters, minGuests: e.target.value })}
                    placeholder="Any"
                    min="1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Min Price (per night)
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="$0"
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Max Price (per night)
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="Any"
                    min="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) => setFilters({ ...filters, featured: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">Featured only</span>
                  </label>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-slate-900 font-semibold"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading accommodations...</p>
          </div>
        ) : filteredAccommodations.length > 0 ? (
          <>
            <div className="mb-4 text-slate-600">
              Showing {filteredAccommodations.length} of {accommodations.length} properties
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                  onSelect={setSelectedAccommodation}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your filters or search criteria
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {selectedAccommodation && (
        <AccommodationDetail
          accommodation={selectedAccommodation}
          onClose={() => setSelectedAccommodation(null)}
          onBook={(acc) => {
            setBookingAccommodation(acc);
            setSelectedAccommodation(null);
          }}
        />
      )}

      {bookingAccommodation && (
        <BookingForm
          accommodation={bookingAccommodation}
          onClose={() => setBookingAccommodation(null)}
          onSuccess={() => {
            setBookingAccommodation(null);
            loadAccommodations();
          }}
        />
      )}
    </div>
  );
};
