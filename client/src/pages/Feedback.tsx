
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Star, Send, MessageSquare, ThumbsUp, Heart, Award, Quote } from 'lucide-react';

const Feedback = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    contactBack: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating Required",
        description: "Please provide a rating before submitting your feedback.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Feedback Submitted! 🎉",
        description: "Thank you for your valuable feedback. We'll review it shortly.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', category: '', subject: '', message: '', contactBack: false });
      setRating(0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "WorkshopWise has transformed my learning journey. The quality of workshops and instructors is exceptional!",
      rating: 5,
      workshop: "Advanced React Development"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      content: "The platform is incredibly user-friendly and the workshops are highly practical. Highly recommend!",
      rating: 5,
      workshop: "Product Strategy Masterclass"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      content: "Amazing community and fantastic learning experience. The networking opportunities are invaluable.",
      rating: 5,
      workshop: "Design Thinking Workshop"
    }
  ];

  const feedbackCategories = [
    { value: "bug-report", label: "🐛 Bug Report" },
    { value: "feature-request", label: "💡 Feature Request" },
    { value: "general-feedback", label: "💬 General Feedback" },
    { value: "workshop-quality", label: "📚 Workshop Quality" },
    { value: "platform-usability", label: "🎯 Platform Usability" },
    { value: "technical-issue", label: "⚙️ Technical Issue" },
    { value: "suggestion", label: "🌟 Suggestion" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center space-x-2 mb-4">
              <MessageSquare className="h-12 w-12 text-primary-600" />
              <Heart className="h-12 w-12 text-accent-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
              Your Voice Matters
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us improve WorkshopWise! Share your experiences, report issues, 
              or suggest new features. Every piece of feedback helps us create a better learning platform.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-bold text-gray-900 flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary-600" />
                  <span>Share Your Feedback</span>
                </CardTitle>
                <p className="text-gray-600">
                  Your feedback helps us improve and grow. Please be as detailed as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating Section */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Overall Rating *</Label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="p-1 transition-transform hover:scale-110"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= (hoveredRating || rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm text-gray-600">
                        {rating > 0 && (
                          <>
                            {rating} star{rating !== 1 ? 's' : ''} - 
                            {rating === 5 && ' Excellent!'}
                            {rating === 4 && ' Very Good!'}
                            {rating === 3 && ' Good'}
                            {rating === 2 && ' Fair'}
                            {rating === 1 && ' Poor'}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com (optional)"
                      />
                    </div>
                  </div>

                  {/* Feedback Category */}
                  <div className="space-y-2">
                    <Label>Feedback Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of feedback" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief summary of your feedback"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Feedback *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please share your detailed feedback, suggestions, or report any issues you've encountered..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Contact Permission */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="contactBack"
                      checked={formData.contactBack}
                      onChange={(e) => setFormData({...formData, contactBack: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="contactBack" className="text-sm">
                      I'm open to being contacted for follow-up questions about this feedback
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.category || !formData.subject || !formData.message}
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Report a Bug
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Suggest a Feature
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Rate a Workshop
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@workshopwise.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Feature Requests</p>
                  <p className="text-gray-600">features@workshopwise.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Response Time</p>
                  <p className="text-gray-600">Within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">2,847</div>
                  <div className="text-sm text-gray-600">Feedback Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Features Implemented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">98%</div>
                  <div className="text-sm text-gray-600">User Satisfaction</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-20">
          <div className="text-center space-y-4 mb-12">
            <div className="flex justify-center">
              <Award className="h-12 w-12 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from real users who've experienced the value of WorkshopWise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <Quote className="h-6 w-6 text-gray-300" />
                    </div>
                    
                    <p className="text-gray-700 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.workshop}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Thank You Section */}
        <section className="mt-20 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-primary-50 to-accent-50">
            <CardContent className="p-12">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Heart className="h-16 w-16 text-accent-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900">
                  Thank You for Helping Us Improve!
                </h3>
                <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Every piece of feedback, whether it's a suggestion, bug report, or general comment, 
                  helps us create a better learning experience for everyone. Your voice shapes the future of WorkshopWise.
                </p>
                <div className="flex justify-center space-x-4 pt-4">
                  <Badge variant="outline" className="px-4 py-2">
                    Community Driven
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    Continuously Improving
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    User Focused
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;
