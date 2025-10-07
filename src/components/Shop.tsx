import React from 'react';
import { ShoppingBag, Star, Heart } from 'lucide-react';

export function Shop() {
  const products = [
    {
      id: 1,
      name: 'Handwoven Basket',
      category: 'Crafts',
      price: 45,
      rating: 4.8,
      reviews: 32,
      image: 'https://images.pexels.com/photos/6069002/pexels-photo-6069002.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Kampala Crafts Co.'
    },
    {
      id: 2,
      name: 'Ugandan Coffee Beans',
      category: 'Food & Beverage',
      price: 25,
      rating: 5.0,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Mountain Coffee Farm'
    },
    {
      id: 3,
      name: 'Traditional Kitenge Fabric',
      category: 'Textiles',
      price: 35,
      rating: 4.9,
      reviews: 56,
      image: 'https://images.pexels.com/photos/5710082/pexels-photo-5710082.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Kampala Textile Market'
    },
    {
      id: 4,
      name: 'Wooden Giraffe Sculpture',
      category: 'Crafts',
      price: 65,
      rating: 4.7,
      reviews: 24,
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Wildlife Art Gallery'
    },
    {
      id: 5,
      name: 'Banana Leaf Art',
      category: 'Art',
      price: 55,
      rating: 4.6,
      reviews: 18,
      image: 'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Local Artists Collective'
    },
    {
      id: 6,
      name: 'Beaded Jewelry Set',
      category: 'Jewelry',
      price: 30,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Kampala Beadworks'
    },
    {
      id: 7,
      name: 'Batik Wall Hanging',
      category: 'Art',
      price: 75,
      rating: 4.9,
      reviews: 41,
      image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Ugandan Art Studio'
    },
    {
      id: 8,
      name: 'Organic Vanilla Extract',
      category: 'Food & Beverage',
      price: 20,
      rating: 5.0,
      reviews: 93,
      image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Organic Farms Uganda'
    },
    {
      id: 9,
      name: 'Pottery Bowl Set',
      category: 'Home Decor',
      price: 40,
      rating: 4.7,
      reviews: 29,
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Clay Artisans Cooperative'
    },
    {
      id: 10,
      name: 'Traditional Drum',
      category: 'Music',
      price: 120,
      rating: 4.8,
      reviews: 15,
      image: 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Cultural Music Center'
    },
    {
      id: 11,
      name: 'Sisal Basket Collection',
      category: 'Crafts',
      price: 50,
      rating: 4.9,
      reviews: 38,
      image: 'https://images.pexels.com/photos/6069002/pexels-photo-6069002.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Rural Weavers Group'
    },
    {
      id: 12,
      name: 'Honey from Local Bees',
      category: 'Food & Beverage',
      price: 18,
      rating: 5.0,
      reviews: 104,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
      seller: 'Beekeepers Association'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Shop Ugandan Crafts & Products</h2>
        <p className="text-stone-600">Discover authentic handmade crafts, local foods, and unique souvenirs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
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
              <div className="absolute top-3 left-3 bg-sunshine-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {product.category}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <div className="text-sm text-stone-600 mb-3">
                by {product.seller}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-sunshine-500 fill-current mr-1" />
                  <span className="font-semibold text-stone-900">{product.rating}</span>
                  <span className="text-stone-500 text-sm ml-1">({product.reviews})</span>
                </div>
                <div className="text-2xl font-bold text-forest-600">${product.price}</div>
              </div>

              <button className="w-full bg-gradient-to-r from-sunshine-500 to-sunshine-600 text-white py-2 px-4 rounded-lg font-medium hover:from-sunshine-600 hover:to-sunshine-700 transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
