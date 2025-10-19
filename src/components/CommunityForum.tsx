import React, { useState } from 'react';
import { MessageSquare, Users, ThumbsUp, Reply, Pin, Clock, User, Search, Plus, Filter } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    badge?: string;
  };
  category: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  pinned: boolean;
  solved: boolean;
  tags: string[];
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  createdAt: string;
  likes: number;
}

const samplePosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best time to visit Murchison Falls?',
    content: 'Planning my first trip to Uganda and wondering about the best season for wildlife viewing at Murchison Falls. Any recommendations?',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      reputation: 245,
      badge: 'Explorer'
    },
    category: 'Travel Planning',
    createdAt: '2025-02-14T10:30:00Z',
    replies: 12,
    likes: 8,
    views: 156,
    pinned: false,
    solved: true,
    tags: ['Murchison Falls', 'Wildlife', 'Planning']
  },
  {
    id: '2',
    title: 'Gorilla trekking permit availability - February 2025',
    content: 'Has anyone recently booked gorilla permits for Bwindi? I\'m trying to get permits for mid-February but seeing mixed availability online.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
      reputation: 189,
      badge: 'Wildlife Expert'
    },
    category: 'Permits & Bookings',
    createdAt: '2025-02-13T15:45:00Z',
    replies: 7,
    likes: 15,
    views: 203,
    pinned: true,
    solved: false,
    tags: ['Gorilla Trekking', 'Permits', 'Bwindi']
  },
  {
    id: '3',
    title: 'Cultural etiquette when visiting local communities',
    content: 'First-time visitor to Uganda. What should I know about cultural norms and etiquette when visiting local communities? Want to be respectful.',
    author: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      reputation: 67,
      badge: 'Newcomer'
    },
    category: 'Culture & Customs',
    createdAt: '2025-02-12T09:20:00Z',
    replies: 18,
    likes: 22,
    views: 298,
    pinned: false,
    solved: true,
    tags: ['Culture', 'Etiquette', 'Community']
  }
];

const sampleReplies: Reply[] = [
  {
    id: '1',
    content: 'The dry seasons (December-February and June-September) are generally best for wildlife viewing. Roads are more accessible and animals gather around water sources.',
    author: {
      name: 'David Mukasa',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      reputation: 456
    },
    createdAt: '2025-02-14T11:15:00Z',
    likes: 5
  },
  {
    id: '2',
    content: 'I was just there in January and the wildlife viewing was excellent! The weather was perfect too. Highly recommend that time of year.',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      reputation: 234
    },
    createdAt: '2025-02-14T12:30:00Z',
    likes: 3
  }
];

export function CommunityForum() {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const categories = ['all', 'Travel Planning', 'Permits & Bookings', 'Culture & Customs', 'Wildlife', 'Adventure', 'Accommodation'];

  const filteredPosts = samplePosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-6 text-sunshine-600 hover:text-sunshine-700 font-medium"
        >
          ← Back to Forum
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Post Header */}
          <div className="flex items-start gap-4 mb-6">
            <img
              src={selectedPost.author.avatar}
              alt={selectedPost.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-stone-900">{selectedPost.author.name}</h3>
                {selectedPost.author.badge && (
                  <span className="bg-sunshine-100 text-sunshine-700 px-2 py-1 rounded-full text-xs">
                    {selectedPost.author.badge}
                  </span>
                )}
                <span className="text-xs text-stone-500">
                  {selectedPost.author.reputation} reputation
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-stone-600">
                <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                <span>{selectedPost.views} views</span>
                <span className="bg-stone-100 px-2 py-1 rounded text-xs">
                  {selectedPost.category}
                </span>
              </div>
            </div>
            {selectedPost.pinned && (
              <Pin className="h-5 w-5 text-sunshine-500" />
            )}
          </div>

          {/* Post Content */}
          <h1 className="text-2xl font-bold text-stone-900 mb-4">{selectedPost.title}</h1>
          <p className="text-stone-700 mb-6 leading-relaxed">{selectedPost.content}</p>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-4 pb-6 border-b border-stone-200">
            <button className="flex items-center gap-2 text-stone-600 hover:text-blue-500 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              {selectedPost.likes}
            </button>
            <button className="flex items-center gap-2 text-stone-600 hover:text-green-500 transition-colors">
              <Reply className="h-4 w-4" />
              Reply
            </button>
          </div>

          {/* Replies */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Replies ({selectedPost.replies})
            </h3>
            
            <div className="space-y-6">
              {sampleReplies.map((reply) => (
                <div key={reply.id} className="flex gap-4">
                  <img
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-stone-900">{reply.author.name}</h4>
                      <span className="text-xs text-stone-500">
                        {reply.author.reputation} reputation
                      </span>
                      <span className="text-xs text-stone-500">
                        {formatTimeAgo(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-stone-700 mb-3">{reply.content}</p>
                    <button className="flex items-center gap-1 text-sm text-stone-600 hover:text-blue-500 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                      {reply.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="mt-6 p-4 bg-stone-50 rounded-lg">
              <textarea
                placeholder="Write your reply..."
                className="w-full p-3 border border-stone-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sunshine-500"
                rows={4}
              />
              <div className="flex justify-end mt-3">
                <button className="bg-sunshine-500 text-white px-4 py-2 rounded-lg hover:bg-sunshine-600 transition-colors">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Community Forum</h2>
            <p className="text-stone-600">Connect with fellow travelers, share experiences, and get advice</p>
          </div>
          <button
            onClick={() => setShowNewPostForm(true)}
            className="bg-sunshine-500 text-white px-4 py-2 rounded-lg hover:bg-sunshine-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunshine-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-sunshine-600">1,234</div>
          <div className="text-sm text-stone-600">Total Posts</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">567</div>
          <div className="text-sm text-stone-600">Active Members</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">89</div>
          <div className="text-sm text-stone-600">Online Now</div>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.pinned && <Pin className="h-4 w-4 text-sunshine-500" />}
                  {post.solved && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      Solved
                    </span>
                  )}
                  <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-stone-900 mb-2 hover:text-sunshine-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-stone-600 mb-3 line-clamp-2">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTimeAgo(post.createdAt)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {post.views}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-stone-400" />
          <h3 className="text-lg font-medium text-stone-900 mb-2">No discussions found</h3>
          <p className="text-stone-600">Try adjusting your search or filters, or start a new discussion!</p>
        </div>
      )}
    </div>
  );
}