import React, { useState } from 'react';
import { X, ShoppingCart, Star, Check, Package, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../lib/ecommerce';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock_quantity === 0;
  const isLowStock = product.stock_quantity <= product.low_stock_threshold;

  const discountPercentage = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
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

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <div className="relative mb-4 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-900" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-900" />
                    </button>
                  </>
                )}

                {product.featured && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Featured
                  </div>
                )}

                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Save {discountPercentage}%
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-4">
                {product.rating > 0 && (
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-bold text-slate-900">{product.rating.toFixed(1)}</span>
                    <span className="text-slate-500 text-sm ml-1">
                      ({product.total_reviews} reviews)
                    </span>
                    {product.total_sales > 0 && (
                      <span className="text-slate-500 text-sm ml-3">
                        • {product.total_sales} sold
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>

              {product.short_description && (
                <p className="text-lg text-slate-600 mb-6">{product.short_description}</p>
              )}

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-xl text-slate-500 line-through">
                      ${product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.sku && (
                  <p className="text-sm text-slate-500">SKU: {product.sku}</p>
                )}
              </div>

              <div className="mb-6">
                {isOutOfStock ? (
                  <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg font-semibold">
                    Out of Stock
                  </div>
                ) : (
                  <>
                    {isLowStock && (
                      <div className="bg-orange-100 text-orange-800 px-4 py-3 rounded-lg font-semibold mb-4">
                        Only {product.stock_quantity} left in stock
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      <label className="font-semibold text-slate-900">Quantity:</label>
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 hover:bg-slate-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-6 py-2 font-semibold">{quantity}</span>
                        <button
                          onClick={() =>
                            setQuantity(Math.min(product.stock_quantity, quantity + 1))
                          }
                          className="px-4 py-2 hover:bg-slate-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-slate-600">
                        {product.stock_quantity} available
                      </span>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {added ? (
                        <>
                          <Check className="w-6 h-6" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Delivery in 3-5 business days</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>30-day return policy</span>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Product Description</h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
