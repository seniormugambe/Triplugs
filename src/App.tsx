import React, { useState } from 'react';
import { Calendar, MapPin, Truck, Wrench, Search, User, Menu, X, Star, Clock, Users, Camera, Compass, Mountain } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  category: string;
  rating: number;
  attendees: number;
  organizer: string;
  image: string;
}

interface Transport {
  id: string;
  provider: string;
  type: string;
  route: string;
  price: number;
  rating: number;
  availability: string;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  provider: string;
  image: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Mountain Hiking Adventure',
    date: '2025-02-15',
    location: 'Rocky Mountains, CO',
    price: 89,
    category: 'Adventure',
    rating: 4.8,
    attendees: 24,
    organizer: 'Mountain Guides Co.',
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Wine Tasting Experience',
    date: '2025-02-20',
    location: 'Napa Valley, CA',
    price: 125,
    category: 'Culinary',
    rating: 4.9,
    attendees: 16,
    organizer: 'Valley Wines LLC',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Photography Workshop',
    date: '2025-02-25',
    location: 'Central Park, NY',
    price: 75,
    category: 'Education',
    rating: 4.7,
    attendees: 12,
    organizer: 'Photo Pro Academy',
    image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const sampleTransport: Transport[] = [
  {
    id: '1',
    provider: 'Mountain Shuttle Service',
    type: 'Bus',
    route: 'Denver → Rocky Mountains',
    price: 35,
    rating: 4.6,
    availability: 'Daily 8:00 AM - 6:00 PM'
  },
  {
    id: '2',
    provider: 'Valley Express',
    type: 'Van',
    route: 'San Francisco → Napa Valley',
    price: 45,
    rating: 4.8,
    availability: 'Weekends Only'
  },
  {
    id: '3',
    provider: 'City Tours Inc.',
    type: 'Bike',
    route: 'Manhattan Tour',
    price: 25,
    rating: 4.5,
    availability: '24/7'
  }
];

const sampleEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Professional Hiking Backpack',
    category: 'Outdoor Gear',
    price: 25,
    rating: 4.7,
    provider: 'Gear Rental Co.',
    image: 'https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'DSLR Camera Kit',
    category: 'Photography',
    price: 45,
    rating: 4.9,
    provider: 'Camera Rentals Plus',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Camping Tent (4-person)',
    category: 'Camping',
    price: 35,
    rating: 4.6,
    provider: 'Outdoor Adventures',
    image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=400'
  }
];

type StakeholderType = 'seeker' | 'organizer' | 'transport' | 'equipment';

function App() {
  const [activeTab, setActiveTab] = useState<StakeholderType>('seeker');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stakeholderTabs = [
    { id: 'seeker' as StakeholderType, label: 'Event Seekers', icon: Calendar, color: 'bg-blue-600' },
    { id: 'organizer' as StakeholderType, label: 'Event Organizers', icon: Users, color: 'bg-orange-600' },
    { id: 'transport' as StakeholderType, label: 'Transport Providers', icon: Truck, color: 'bg-green-600' },
    { id: 'equipment' as StakeholderType, label: 'Equipment Rentals', icon: Wrench, color: 'bg-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                TourismHub
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {stakeholderTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${tab.color} text-white shadow-lg`
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {stakeholderTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? `${tab.color} text-white`
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Your Gateway to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Amazing Experiences
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with event organizers, find transportation, rent equipment, and discover unforgettable experiences all in one place.
          </p>
          
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stakeholderTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 rounded-2xl border-2 border-gray-200 bg-white/60 backdrop-blur-sm hover:bg-white transition-all duration-300 group ${
                    activeTab === tab.id ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-300' : 'hover:border-gray-300'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${tab.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tab.label}</h3>
                  <p className="text-gray-600 text-sm">
                    {tab.id === 'seeker' && 'Discover amazing events and experiences'}
                    {tab.id === 'organizer' && 'Create and manage your events'}
                    {tab.id === 'transport' && 'Provide transportation services'}
                    {tab.id === 'equipment' && 'Rent out your equipment'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Event Seekers Content */}
          {activeTab === 'seeker' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Discover Amazing Events</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Find the perfect experience for your next adventure. From outdoor activities to cultural events.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-gray-900">${event.price}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {event.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {event.attendees} attendees
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Organizers Content */}
          {activeTab === 'organizer' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Manage Your Events</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Create, promote, and manage your events with our comprehensive organizer dashboard.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Create New Event</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Event Title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Event Description"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    ></textarea>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                      Create Event
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">Event Statistics</h4>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Events</span>
                      <span className="text-2xl font-bold text-gray-900">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Bookings</span>
                      <span className="text-2xl font-bold text-orange-600">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Revenue This Month</span>
                      <span className="text-2xl font-bold text-green-600">$12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Rating</span>
                      <span className="text-2xl font-bold text-yellow-500">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transport Providers Content */}
          {activeTab === 'transport' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Transportation Services</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Find reliable transportation options or offer your transport services to event attendees.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleTransport.map((transport) => (
                  <div key={transport.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{transport.provider}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{transport.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{transport.type}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{transport.route}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{transport.availability}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-bold text-gray-900">${transport.price}</span>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Book Transport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Rentals Content */}
          {activeTab === 'equipment' && (
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Equipment Rentals</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Rent high-quality equipment for your adventures or list your equipment for rental income.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleEquipment.map((equipment) => (
                  <div key={equipment.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                    <div className="relative">
                      <img
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-gray-900">${equipment.price}/day</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {equipment.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{equipment.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{equipment.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">Provided by {equipment.provider}</p>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                        Rent Equipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold">TourismHub</h3>
              </div>
              <p className="text-gray-400">
                Connecting travelers, organizers, transport providers, and equipment rentals for unforgettable experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Event Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Browse Events</li>
                <li>Book Experiences</li>
                <li>Reviews & Ratings</li>
                <li>Travel Planning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>List Your Services</li>
                <li>Manage Bookings</li>
                <li>Analytics Dashboard</li>
                <li>Payment Processing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TourismHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;