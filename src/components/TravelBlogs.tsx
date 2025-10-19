import React, { useState } from 'react';
import { BookOpen, Calendar, User, Heart, MessageCircle, Share2, Eye, Clock, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    verified: boolean;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
}

const sampleBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Gorilla Trekking in Bwindi: A Life-Changing Experience',
    excerpt: 'My incredible journey through the impenetrable forest to meet Uganda\'s mountain gorillas face-to-face.',
    content: 'The mist hung heavy in the ancient forest as we began our trek at dawn...',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      bio: 'Wildlife photographer and conservation advocate',
      verified: true
    },
    publishDate: '2025-02-10',
    readTime: '8 min read',
    category: 'Wildlife',
    tags: ['Gorillas', 'Bwindi', 'Conservation', 'Photography'],
    image: 'https://images.unsplash.com/photo-1631317870276-8b2d0d8e7e8e?auto=format&fit=crop&w=800&q=80',
    likes: 234,
    comments: 45,
    views: 1250,
    featured: true
  },
  {
    id: '2',
    title: 'Cultural Immersion with the Batwa People',
    excerpt: 'Learning ancient forest survival skills from Uganda\'s indigenous Batwa community.',
    content: 'The Batwa elder smiled as he demonstrated how to make fire using traditional methods...',
    author: {
      name: 'David Mukasa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Cultural anthropologist and local guide',
      verified: true
    },
    publishDate: '2025-02-08',
    readTime: '6 min read',
    category: 'Culture',
    tags: ['Batwa', 'Indigenous', 'Culture', 'Forest'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    likes: 189,
    comments: 32,
    views: 890,
    featured: false
  },
  {
    id: '3',
    title: 'White Water Rafting on the Nile: An Adrenaline Rush',
    excerpt: 'Conquering Grade 5 rapids on the source of the world\'s longest river in Jinja.',
    content: 'The roar of the rapids grew louder as we approached the infamous "Big Brother" rapid...',
    author: {
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      bio: 'Adventure travel blogger and thrill seeker',
      verified: false
    },
    publishDate: '2025-02-05',
    readTime: '5 min read',
    category: 'Adventure',
    tags: ['Rafting', 'Nile', 'Jinja', 'Adventure'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    likes: 156,
    comments: 28,
    views: 720,
    featured: false
  }
];

export function TravelBlogs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['all', 'Wildlife', 'Culture', 'Adventure', 'Food', 'Photography'];

  const filteredBlogs = selectedCategory === 'all' 
    ? sampleBlogs 
    : sampleBlogs.filter(blog => blog.category === selectedCategory);

  const featuredBlogs = sampleBlogs.filter(blog => blog.featured);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-6 text-sunshine-600 hover:text-sunshine-700 font-medium"
        >
          ← Back to Blogs
        </button>
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-stone-900">{selectedPost.author.name}</h4>
                  {selectedPost.author.verified && (
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-stone-600">{selectedPost.author.bio}</p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-stone-900 mb-4">{selectedPost.title}</h1>
            
            <div className="flex items-center gap-6 text-sm text-stone-600 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(selectedPost.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {selectedPost.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {selectedPost.views} views
              </div>
            </div>
            
            <div className="prose max-w-none mb-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                {selectedPost.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-stone-600 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                  {selectedPost.likes}
                </button>
                <button className="flex items-center gap-2 text-stone-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  {selectedPost.comments}
                </button>
                <button className="flex items-center gap-2 text-stone-600 hover:text-green-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
              
              <div className="flex gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Travel Blogs & Stories</h2>
        <p className="text-stone-600">Discover authentic travel experiences and insider tips from fellow adventurers</p>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-stone-900 mb-4">Featured Stories</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedPost(blog)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-sunshine-100 text-sunshine-700 px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                    <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{blog.title}</h3>
                  <p className="text-stone-600 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-stone-700">{blog.author.name}</span>
                    </div>
                    <span className="text-sm text-stone-500">{blog.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-sunshine-500 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {category === 'all' ? 'All Stories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => setSelectedPost(blog)}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs">
                  {blog.category}
                </span>
                <span className="text-xs text-stone-500">{blog.readTime}</span>
              </div>
              
              <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>
              
              <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-stone-700">{blog.author.name}</span>
                  {blog.author.verified && (
                    <div className="bg-blue-500 text-white rounded-full p-0.5">
                      <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {blog.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {blog.comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}