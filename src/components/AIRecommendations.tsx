import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Heart, ShoppingBag } from 'lucide-react';
import { geminiService } from '../services/gemini';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  vendorId: string;
  seller: string;
}

interface Recommendation {
  productId: number;
  reason: string;
  score: number;
}

interface AIRecommendationsProps {
  products: Product[];
  userPreferences?: string;
}

export function AIRecommendations({ products, userPreferences = "authentic Ugandan crafts" }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState(userPreferences);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await geminiService.generateProductRecommendations(preferences, products);
      setRecommendations(result.recommendations || []);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      generateRecommendations();
    }
  }, [products]);

  const getProductById = (id: number) => products.find(p => p.id === id);

  const handlePreferenceChange = (e: React.FormEvent) => {
    e.preventDefault();
    generateRecommendations();
  };

  return (
    <div className="bg-gradient-to-br from-sunshine-50 to-orange-50 rounded-xl p-6 border border-sunshine-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-sunshine-600" />
          <h3 className="text-lg font-bold text-stone-900">AI Recommendations</h3>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1 bg-sunshine-500 text-white rounded-lg hover:bg-sunshine-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Preferences Input */}
      <form onSubmit={handlePreferenceChange} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Tell us what you're looking for..."
            className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-sunshine-500 text-white rounded-lg hover:bg-sunshine-600 transition-colors disabled:opacity-50 text-sm"
          >
            Update
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-sunshine-600">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm">AI is analyzing products for you...</span>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {!isLoading && recommendations.length > 0 && (
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const product = getProductById(rec.productId);
            if (!product) return null;

            return (
              <div
                key={rec.productId}
                className="bg-white rounded-lg p-4 border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-stone-900 text-sm">{product.name}</h4>
                        <p className="text-xs text-stone-600">{product.seller}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="bg-sunshine-100 text-sunshine-700 px-2 py-1 rounded-full text-xs font-medium">
                          #{index + 1}
                        </div>
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {rec.score}/10
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-stone-700 mb-3 bg-stone-50 p-2 rounded italic">
                      "{rec.reason}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-forest-600">${product.price}</span>
                        <div className="flex items-center gap-1 text-xs text-stone-600">
                          <span>★ {product.rating}</span>
                          <span>({product.reviews})</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-stone-100 rounded">
                          <Heart className="h-4 w-4 text-stone-600" />
                        </button>
                        <button className="flex items-center gap-1 bg-sunshine-500 text-white px-3 py-1 rounded text-xs hover:bg-sunshine-600 transition-colors">
                          <ShoppingBag className="h-3 w-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && recommendations.length === 0 && (
        <div className="text-center py-6 text-stone-600">
          <Sparkles className="h-8 w-8 mx-auto mb-2 text-stone-400" />
          <p className="text-sm">No recommendations available. Try updating your preferences!</p>
        </div>
      )}
    </div>
  );
}