import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, Store, MapPin, Filter, Users } from 'lucide-react';
import { AIRecommendations } from './AIRecommendations';

export function Shop() {
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const vendors = [
    {
      id: 'kampala-crafts',
      name: 'Kampala Crafts Co.',
      location: 'Kampala, Uganda',
      rating: 4.8,
      totalProducts: 15,
      description: 'Traditional handwoven crafts and baskets',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      verified: true
    },
    {
      id: 'mountain-coffee',
      name: 'Mountain Coffee Farm',
      location: 'Mount Elgon, Uganda',
      rating: 5.0,
      totalProducts: 8,
      description: 'Premium organic coffee beans',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
      verified: true
    },
    {
      id: 'textile-market',
      name: 'Kampala Textile Market',
      location: 'Kampala, Uganda',
      rating: 4.9,
      totalProducts: 12,
      description: 'Authentic African fabrics and textiles',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80',
      verified: true
    },
    {
      id: 'wildlife-art',
      name: 'Wildlife Art Gallery',
      location: 'Entebbe, Uganda',
      rating: 4.7,
      totalProducts: 6,
      description: 'Hand-carved wildlife sculptures',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      verified: true
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Handwoven Basket',
      category: 'Crafts',
      price: 45,
      rating: 4.8,
      reviews: 32,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'kampala-crafts',
      seller: 'Kampala Crafts Co.'
    },
    {
      id: 2,
      name: 'Ugandan Coffee Beans',
      category: 'Food & Beverage',
      price: 25,
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      vendorId: 'mountain-coffee',
      seller: 'Mountain Coffee Farm'
    },
    {
      id: 3,
      name: 'Traditional Kitenge Fabric',
      category: 'Textiles',
      price: 35,
      rating: 4.9,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80',
      vendorId: 'textile-market',
      seller: 'Kampala Textile Market'
    },
    {
      id: 4,
      name: 'Wooden Giraffe Sculpture',
      category: 'Crafts',
      price: 65,
      rating: 4.7,
      reviews: 24,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'wildlife-art',
      seller: 'Wildlife Art Gallery'
    },
    {
      id: 5,
      name: 'Banana Leaf Art',
      category: 'Art',
      price: 55,
      rating: 4.6,
      reviews: 18,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'kampala-crafts',
      seller: 'Kampala Crafts Co.'
    },
    {
      id: 6,
      name: 'Beaded Jewelry Set',
      category: 'Jewelry',
      price: 30,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80',
      vendorId: 'textile-market',
      seller: 'Kampala Textile Market'
    },
    {
      id: 7,
      name: 'Batik Wall Hanging',
      category: 'Art',
      price: 75,
      rating: 4.9,
      reviews: 41,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=800&q=80',
      vendorId: 'wildlife-art',
      seller: 'Wildlife Art Gallery'
    },
    {
      id: 8,
      name: 'Organic Vanilla Extract',
      category: 'Food & Beverage',
      price: 20,
      rating: 5.0,
      reviews: 93,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      vendorId: 'mountain-coffee',
      seller: 'Mountain Coffee Farm'
    },
    {
      id: 9,
      name: 'Pottery Bowl Set',
      category: 'Home Decor',
      price: 40,
      rating: 4.7,
      reviews: 29,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'kampala-crafts',
      seller: 'Kampala Crafts Co.'
    },
    {
      id: 10,
      name: 'Traditional Drum',
      category: 'Music',
      price: 120,
      rating: 4.8,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'wildlife-art',
      seller: 'Wildlife Art Gallery'
    },
    {
      id: 11,
      name: 'Sisal Basket Collection',
      category: 'Crafts',
      price: 50,
      rating: 4.9,
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      vendorId: 'kampala-crafts',
      seller: 'Kampala Crafts Co.'
    },
    {
      id: 12,
      name: 'Honey from Local Bees',
      category: 'Food & Beverage',
      price: 18,
      rating: 5.0,
      reviews: 104,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      vendorId: 'mountain-coffee',
      seller: 'Mountain Coffee Farm'
    },
  ];

  const categories = ['all', 'Crafts', 'Food & Beverage', 'Textiles', 'Art', 'Jewelry', 'Home Decor', 'Music'];

  const filteredProducts = products.filter(product => {
    const vendorMatch = selectedVendor === 'all' || product.vendorId === selectedVendor;
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return vendorMatch && categoryMatch;
  });

  const getVendorById = (vendorId: string) => vendors.find(v => v.id === vendorId);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-triplugs-900 mb-4 font-display">Triplugs Green Marketplace</h2>
        <p className="text-xl text-triplugs-700 leading-relaxed font-medium">Discover eco-friendly treasures, sustainable crafts, and organic products from verified Ugandan artisans committed to preserving our green paradise</p>
      </div>

      {/* Featured Vendors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Store className="h-5 w-5" />
          Featured Vendors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className={`bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedVendor === vendor.id ? 'border-triplugs-500 bg-triplugs-50' : 'border-stone-200'
              }`}
              onClick={() => setSelectedVendor(selectedVendor === vendor.id ? 'all' : vendor.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-stone-900 text-sm">{vendor.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-stone-600">
                    <MapPin className="h-3 w-3" />
                    {vendor.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-sunshine-500 fill-current" />
                  <span className="font-medium">{vendor.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-600">
                  <Users className="h-3 w-3" />
                  {vendor.totalProducts} products
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <AIRecommendations products={products} />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-stone-600" />
          <span className="text-sm font-medium text-stone-700">Filters:</span>
        </div>
        
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-500"
        >
          <option value="all">All Vendors</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        {(selectedVendor !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSelectedVendor('all');
              setSelectedCategory('all');
            }}
            className="px-3 py-2 text-sm text-sunshine-600 hover:text-sunshine-700 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const vendor = getVendorById(product.vendorId);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-stone-200 group"
            >
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-stone-600 hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute top-3 left-3 bg-triplugs-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
                {vendor?.verified && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    ✓ Verified
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Vendor Info */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-stone-50 rounded-lg">
                  <img
                    src={vendor?.image || ''}
                    alt={vendor?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900">{product.seller}</div>
                    <div className="text-xs text-stone-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {vendor?.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-sunshine-500 fill-current" />
                    <span className="text-xs font-medium">{vendor?.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                    <span className="font-semibold text-stone-900">{product.rating}</span>
                    <span className="text-stone-500 text-sm ml-1">({product.reviews})</span>
                  </div>
                  <div className="text-2xl font-bold text-forest-600">${product.price}</div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-triplugs-500 via-nature-500 to-forest-500 text-white py-2 px-4 rounded-lg font-bold hover:from-triplugs-600 hover:via-nature-600 hover:to-forest-600 transition-all flex items-center justify-center gap-2 shadow-lg">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button 
                    className="px-3 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                    onClick={() => setSelectedVendor(product.vendorId)}
                  >
                    <Store className="h-4 w-4 text-stone-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-stone-400 mb-2">
            <Store className="h-12 w-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">No products found</h3>
          <p className="text-stone-600">Try adjusting your filters to see more products.</p>
        </div>
      )}
    </div>
  );
}
