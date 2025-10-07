import React from 'react';
import { MapPin, Star, Wifi, Coffee, Car } from 'lucide-react';

export function AccommodationList() {
  const accommodations = [
    {
      id: 1,
      name: 'Mountain View Lodge',
      location: 'Bwindi Impenetrable Forest',
      price: 250,
      rating: 5.0,
      reviews: 128,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Breakfast', 'Parking', 'Restaurant'],
      type: 'Lodge'
    },
    {
      id: 2,
      name: 'Safari Camp Deluxe',
      location: 'Queen Elizabeth National Park',
      price: 180,
      rating: 4.8,
      reviews: 95,
      image: 'https://images.pexels.com/photos/2291636/pexels-photo-2291636.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Pool', 'Game Drives', 'Bar'],
      type: 'Camp'
    },
    {
      id: 3,
      name: 'Lake Victoria Resort',
      location: 'Entebbe',
      price: 150,
      rating: 4.7,
      reviews: 203,
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Beach Access', 'Restaurant', 'Spa'],
      type: 'Resort'
    },
    {
      id: 4,
      name: 'Kampala City Hotel',
      location: 'Kampala',
      price: 120,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Gym', 'Business Center', 'Parking'],
      type: 'Hotel'
    },
    {
      id: 5,
      name: 'Murchison River Lodge',
      location: 'Murchison Falls National Park',
      price: 200,
      rating: 4.9,
      reviews: 87,
      image: 'https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'River View', 'Safari Tours', 'Restaurant'],
      type: 'Lodge'
    },
    {
      id: 6,
      name: 'Gorilla Highlands Eco-Lodge',
      location: 'Kisoro',
      price: 220,
      rating: 4.8,
      reviews: 74,
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Eco-Friendly', 'Hiking', 'Local Cuisine'],
      type: 'Eco-Lodge'
    },
    {
      id: 7,
      name: 'Jinja Adventure Camp',
      location: 'Jinja',
      price: 95,
      rating: 4.6,
      reviews: 142,
      image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Activities', 'Camping', 'Bar'],
      type: 'Camp'
    },
    {
      id: 8,
      name: 'Kibale Forest Lodge',
      location: 'Kibale National Park',
      price: 190,
      rating: 4.7,
      reviews: 68,
      image: 'https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['WiFi', 'Nature Walks', 'Restaurant', 'Chimp Tracking'],
      type: 'Lodge'
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'breakfast':
      case 'restaurant':
      case 'bar':
      case 'local cuisine':
        return <Coffee className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Accommodations in Uganda</h2>
        <p className="text-stone-600">Find the perfect place to stay for your Uganda adventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-stone-200"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={accommodation.image}
                alt={accommodation.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-forest-600">
                {accommodation.type}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-1">
                {accommodation.name}
              </h3>

              <div className="flex items-center text-stone-600 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{accommodation.location}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                  <span className="font-semibold text-stone-900">{accommodation.rating}</span>
                  <span className="text-stone-500 text-sm ml-1">({accommodation.reviews})</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-forest-600">${accommodation.price}</div>
                  <div className="text-xs text-stone-500">per night</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-stone-100 text-stone-700 text-xs px-2 py-1 rounded"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {accommodation.amenities.length > 3 && (
                  <div className="text-xs text-stone-500 px-2 py-1">
                    +{accommodation.amenities.length - 3} more
                  </div>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-forest-500 to-forest-600 text-white py-2 px-4 rounded-lg font-medium hover:from-forest-600 hover:to-forest-700 transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
