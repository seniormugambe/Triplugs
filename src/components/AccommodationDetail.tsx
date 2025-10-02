import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Users,
  Star,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { Accommodation, Review, supabase } from '../lib/supabase';

interface AccommodationDetailProps {
  accommodation: Accommodation;
  onClose: () => void;
  onBook: (accommodation: Accommodation) => void;
}

export const AccommodationDetail: React.FC<AccommodationDetailProps> = ({
  accommodation,
  onClose,
  onBook,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [accommodation.id]);

  const loadReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('accommodation_id', accommodation.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % accommodation.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? accommodation.images.length - 1 : prev - 1
    );
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-5 h-5" />;
    if (lower.includes('parking') || lower.includes('car')) return <Car className="w-5 h-5" />;
    if (lower.includes('kitchen') || lower.includes('coffee')) return <Coffee className="w-5 h-5" />;
    return <Star className="w-5 h-5" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-10 shadow-lg"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          <div className="relative h-[500px] bg-slate-900">
            <img
              src={accommodation.images[currentImageIndex]}
              alt={accommodation.name}
              className="w-full h-full object-cover"
            />

            {accommodation.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {accommodation.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {accommodation.featured && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Featured Property
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {accommodation.type}
                  </span>
                  {accommodation.rating > 0 && (
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-bold text-slate-900">{accommodation.rating.toFixed(1)}</span>
                      <span className="text-slate-500 text-sm ml-1">
                        ({accommodation.total_reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-3">{accommodation.name}</h1>
                <div className="flex items-center text-slate-600 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  {accommodation.location}, {accommodation.city}, {accommodation.country}
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold text-slate-900">
                  ${accommodation.price_per_night}
                </div>
                <div className="text-slate-600">per night</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8 p-6 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">{accommodation.max_guests}</div>
                  <div className="text-sm text-slate-600">Guests</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">{accommodation.bedrooms}</div>
                  <div className="text-sm text-slate-600">Bedrooms</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">{accommodation.bathrooms}</div>
                  <div className="text-sm text-slate-600">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-slate-900">Available</div>
                  <div className="text-sm text-slate-600">Book Now</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About this place</h2>
              <p className="text-slate-700 leading-relaxed text-lg">{accommodation.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {accommodation.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="text-slate-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Reviews ({reviews.length})
              </h2>
              {loading ? (
                <div className="text-center py-8 text-slate-600">Loading reviews...</div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-bold text-slate-900">{review.guest_name}</div>
                          <div className="text-sm text-slate-600">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                          <span className="font-bold text-slate-900">{review.rating}</span>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                      )}
                      {review.cleanliness_rating && (
                        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-200">
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Cleanliness</div>
                            <div className="font-semibold text-slate-900">{review.cleanliness_rating}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Location</div>
                            <div className="font-semibold text-slate-900">{review.location_rating}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Value</div>
                            <div className="font-semibold text-slate-900">{review.value_rating}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-600 mb-1">Communication</div>
                            <div className="font-semibold text-slate-900">{review.communication_rating}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-600">No reviews yet</div>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={() => onBook(accommodation)}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors"
              >
                <CreditCard className="w-6 h-6" />
                Book Now
              </button>
              <button
                onClick={onClose}
                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
