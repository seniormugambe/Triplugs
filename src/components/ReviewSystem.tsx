import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Camera, MapPin, Calendar, User, Filter, Search } from 'lucide-react';

interface Review {
  id: string;
  type: 'event' | 'venue' | 'equipment' | 'experience';
  itemId: string;
  itemName: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reviewCount: number;
    verified: boolean;
  };
  date: string;
  helpful: number;
  notHelpful: number;
  images?: string[];
  verified: boolean;
  response?: {
    author: string;
    content: string;
    date: string;
  };
}

const sampleReviews: Review[] = [
  {
    id: '1',
    type: 'experience',
    itemId: 'gorilla-trek-1',
    itemName: 'Bwindi Gorilla Trekking Experience',
    rating: 5,
    title: 'Life-changing experience!',
    content: 'The gorilla trekking in Bwindi was absolutely incredible. Our guide was knowledgeable and the whole experience was well-organized. Seeing the mountain gorillas up close was emotional and unforgettable. The trek was challenging but totally worth it.',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      reviewCount: 23,
      verified: true
    },
    date: '2025-02-10',
    helpful: 45,
    notHelpful: 2,
    images: [
      'https://images.unsplash.com/photo-1631317870276-8b2d0d8e7e8e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80'
    ],
    verified: true,
    response: {
      author: 'Bwindi Eco Tours',
      content: 'Thank you Sarah for this wonderful review! We\'re thrilled you had such an amazing experience with our gorilla trekking tour.',
      date: '2025-02-11'
    }
  },
  {
    id: '2',
    type: 'venue',
    itemId: 'lodge-1',
    itemName: 'Silverback Lodge',
    rating: 4,
    title: 'Great location, good service',
    content: 'The lodge has an excellent location near Bwindi with beautiful views. Staff was friendly and helpful. Food was good but could be more varied. Rooms were clean and comfortable. Would recommend for gorilla trekking visitors.',
    author: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      reviewCount: 12,
      verified: false
    },
    date: '2025-02-08',
    helpful: 28,
    notHelpful: 5,
    verified: true
  },
  {
    id: '3',
    type: 'event',
    itemId: 'rafting-1',
    itemName: 'Nile White Water Rafting',
    rating: 5,
    title: 'Adrenaline rush guaranteed!',
    content: 'What an incredible day on the Nile! The rapids were thrilling and our guide was experienced and safety-focused. The whole team was professional and made sure everyone felt comfortable. Lunch by the river was a nice touch. Highly recommend!',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      reviewCount: 8,
      verified: true
    },
    date: '2025-02-05',
    helpful: 32,
    notHelpful: 1,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'
    ],
    verified: true
  },
  {
    id: '4',
    type: 'equipment',
    itemId: 'camera-1',
    itemName: 'Professional Camera Rental',
    rating: 3,
    title: 'Decent equipment, could be better maintained',
    content: 'The camera worked fine for my safari, but it had some wear and tear. The lens was a bit scratched which affected some shots. Staff was helpful with setup and instructions. Price was reasonable for the rental period.',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      reviewCount: 15,
      verified: false
    },
    date: '2025-02-03',
    helpful: 12,
    notHelpful: 8,
    verified: false
  }
];

export function ReviewSystem() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const types = ['all', 'experience', 'venue', 'event', 'equipment'];
  const ratings = ['all', '5', '4', '3', '2', '1'];

  const filteredReviews = sampleReviews.filter(review => {
    const typeMatch = selectedType === 'all' || review.type === selectedType;
    const ratingMatch = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const searchMatch = searchQuery === '' || 
      review.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && ratingMatch && searchMatch;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-stone-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      experience: 'Experience',
      venue: 'Accommodation',
      event: 'Event',
      equipment: 'Equipment'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      experience: 'bg-green-100 text-green-700',
      venue: 'bg-blue-100 text-blue-700',
      event: 'bg-purple-100 text-purple-700',
      equipment: 'bg-orange-100 text-orange-700'
    };
    return colors[type as keyof typeof colors] || 'bg-stone-100 text-stone-700';
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Reviews & Ratings</h2>
        <p className="text-stone-600">Read authentic reviews from fellow travelers and share your own experiences</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            <option value="all">All Types</option>
            {types.slice(1).map((type) => (
              <option key={type} value={type}>{getTypeLabel(type)}</option>
            ))}
          </select>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            <option value="all">All Ratings</option>
            {ratings.slice(1).map((rating) => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-600">
            Showing {sortedReviews.length} reviews
          </span>
          <button className="bg-sunshine-500 text-white px-4 py-2 rounded-lg hover:bg-sunshine-600 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <img
                  src={review.author.avatar}
                  alt={review.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-stone-900">{review.author.name}</h4>
                    {review.author.verified && (
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-sm text-stone-500">
                      {review.author.reviewCount} reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating, 'sm')}
                    <span className="text-sm text-stone-600">{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(review.type)}`}>
                  {getTypeLabel(review.type)}
                </span>
                {review.verified && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Item Name */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-stone-400" />
              <span className="font-medium text-stone-900">{review.itemName}</span>
            </div>

            {/* Review Content */}
            <h3 className="text-lg font-semibold text-stone-900 mb-2">{review.title}</h3>
            <p className="text-stone-700 mb-4 leading-relaxed">{review.content}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-stone-600 hover:text-green-500 transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-2 text-stone-600 hover:text-red-500 transition-colors">
                  <ThumbsDown className="h-4 w-4" />
                  <span className="text-sm">Not helpful ({review.notHelpful})</span>
                </button>
              </div>
              
              <button className="text-stone-600 hover:text-sunshine-500 transition-colors text-sm">
                Report
              </button>
            </div>

            {/* Business Response */}
            {review.response && (
              <div className="mt-4 p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-sunshine-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {review.response.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium text-stone-900">{review.response.author}</h5>
                    <span className="text-xs text-stone-500">{formatDate(review.response.date)}</span>
                  </div>
                </div>
                <p className="text-stone-700 text-sm">{review.response.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-12 w-12 mx-auto mb-4 text-stone-400" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">No reviews found</h3>
          <p className="text-stone-600">Try adjusting your filters or be the first to write a review!</p>
        </div>
      )}
    </div>
  );
}