
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Calendar, Users, MapPin, Filter } from 'lucide-react';

// Mock data for past workshop events
const pastEvents = [
  {
    id: 1,
    title: "React Fundamentals Workshop",
    date: "2024-11-15",
    location: "Tech Hub Mumbai",
    attendees: 25,
    category: "Programming",
    image: "/placeholder.svg",
    media: [
      { type: 'image', url: '/placeholder.svg', alt: 'Workshop in progress' },
      { type: 'video', url: '#', thumbnail: '/placeholder.svg' },
      { type: 'image', url: '/placeholder.svg', alt: 'Group photo' },
    ]
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    date: "2024-11-10",
    location: "Design Studio Delhi",
    attendees: 30,
    category: "Design",
    image: "/placeholder.svg",
    media: [
      { type: 'image', url: '/placeholder.svg', alt: 'Design session' },
      { type: 'image', url: '/placeholder.svg', alt: 'Participants working' },
      { type: 'video', url: '#', thumbnail: '/placeholder.svg' },
    ]
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    date: "2024-11-05",
    location: "Analytics Center Bangalore",
    attendees: 40,
    category: "Data Science",
    image: "/placeholder.svg",
    media: [
      { type: 'video', url: '#', thumbnail: '/placeholder.svg' },
      { type: 'image', url: '/placeholder.svg', alt: 'Data visualization demo' },
      { type: 'image', url: '/placeholder.svg', alt: 'Networking session' },
    ]
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    date: "2024-10-28",
    location: "Business Hub Pune",
    attendees: 35,
    category: "Marketing",
    image: "/placeholder.svg",
    media: [
      { type: 'image', url: '/placeholder.svg', alt: 'Strategy presentation' },
      { type: 'image', url: '/placeholder.svg', alt: 'Interactive session' },
      { type: 'video', url: '#', thumbnail: '/placeholder.svg' },
    ]
  }
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(pastEvents.map(event => event.category)))];

  const filteredEvents = selectedCategory === 'All' 
    ? pastEvents 
    : pastEvents.filter(event => event.category === selectedCategory);

  const totalAttendees = pastEvents.reduce((sum, event) => sum + event.attendees, 0);
  const totalEvents = pastEvents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Workshop Gallery & Past Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore moments from our successful workshops and see the amazing learning experiences we've created together.
            </p>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{totalEvents}+</div>
              <div className="text-gray-600">Workshops Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{totalAttendees}+</div>
              <div className="text-gray-600">Happy Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filter by category:</span>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary-500">
                  {event.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} participants
                  </div>
                </div>

                {/* Media Preview */}
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-2">
                    {event.media.slice(0, 3).map((media, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={media.type === 'video' ? media.thumbnail : media.url}
                          alt={media.alt || 'Event media'}
                          className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedEvent(event.id)}
                        />
                        {media.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-6 w-6 text-white bg-black bg-opacity-50 rounded-full p-1" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                >
                  {selectedEvent === event.id ? 'Hide Media' : 'View All Media'}
                </Button>

                {/* Expanded Media Gallery */}
                {selectedEvent === event.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-3">
                      {event.media.map((media, index) => (
                        <div key={index} className="relative">
                          <img
                            src={media.type === 'video' ? media.thumbnail : media.url}
                            alt={media.alt || 'Event media'}
                            className="w-full h-24 object-cover rounded"
                          />
                          {media.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-4 w-4 text-white bg-black bg-opacity-50 rounded-full p-1" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Next Workshop?
          </h2>
          <p className="text-gray-600 mb-6">
            Don't miss out on our upcoming events. Register now and be part of our learning community!
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary-500 to-accent-500">
            View Upcoming Workshops
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
