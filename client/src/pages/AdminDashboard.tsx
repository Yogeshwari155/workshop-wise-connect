import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, 
  Calendar, 
  Building, 
  TrendingUp, 
  Search, 
  Edit, 
  Trash2,
  Plus,
  Eye
} from 'lucide-react';

interface Workshop {
  id: number;
  title: string;
  description: string;
  company: string;
  date: string;
  time: string;
  mode: string;
  location?: string;
  price: string;
  seats: number;
  registeredSeats: number;
  registrationMode: string;
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    date: '',
    time: '',
    mode: 'online',
    location: '',
    price: '',
    seats: '',
    image: '',
    status: 'active'
  });

  // Fetch workshops from database
  const { data: workshops = [], isLoading } = useQuery({
    queryKey: ['/api/workshops'],
    queryFn: async () => {
      const response = await fetch('/api/workshops');
      if (!response.ok) throw new Error('Failed to fetch workshops');
      return response.json();
    }
  });

  // Create workshop mutation
  const createWorkshopMutation = useMutation({
    mutationFn: async (workshopData: any) => {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workshopData)
      });
      if (!response.ok) throw new Error('Failed to create workshop');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/workshops'] });
      setIsAddModalOpen(false);
      resetForm();
      toast({
        title: "Success!",
        description: "Workshop created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create workshop. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Update workshop mutation
  const updateWorkshopMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await fetch(`/api/workshops/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update workshop');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/workshops'] });
      setIsEditModalOpen(false);
      resetForm();
      toast({
        title: "Success!",
        description: "Workshop updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update workshop. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete workshop mutation
  const deleteWorkshopMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/workshops/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete workshop');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/workshops'] });
      toast({
        title: "Success!",
        description: "Workshop deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete workshop. Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      company: '',
      date: '',
      time: '',
      mode: 'online',
      location: '',
      price: '',
      seats: '',
      image: '',
      status: 'active'
    });
    setSelectedWorkshop(null);
  };

  const handleAddWorkshop = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setFormData({
      title: workshop.title,
      description: workshop.description,
      company: workshop.company,
      date: workshop.date,
      time: workshop.time,
      mode: workshop.mode,
      location: workshop.location || '',
      price: workshop.price,
      seats: workshop.seats.toString(),
      image: workshop.image,
      status: workshop.status
    });
    setIsEditModalOpen(true);
  };

  const handleViewWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsViewModalOpen(true);
  };

  const handleDeleteWorkshop = (id: number) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      deleteWorkshopMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workshopData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      seats: parseInt(formData.seats) || 0
    };

    if (selectedWorkshop) {
      updateWorkshopMutation.mutate({ id: selectedWorkshop.id, data: workshopData });
    } else {
      createWorkshopMutation.mutate(workshopData);
    }
  };

  const stats = [
    { label: "Total Workshops", value: workshops.length.toString(), icon: Calendar, color: "text-blue-600" },
    { label: "Active Workshops", value: workshops.filter((w: Workshop) => w.status === 'active').length.toString(), icon: TrendingUp, color: "text-green-600" },
    { label: "Total Registrations", value: workshops.reduce((sum: number, w: Workshop) => sum + w.registeredSeats, 0).toString(), icon: Users, color: "text-purple-600" },
    { label: "Available Seats", value: workshops.reduce((sum: number, w: Workshop) => sum + (w.seats - w.registeredSeats), 0).toString(), icon: Building, color: "text-orange-600" }
  ];

  const filteredWorkshops = workshops.filter((workshop: Workshop) =>
    workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const WorkshopForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Workshop Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 10:00 AM"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mode">Mode</Label>
          <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location (if offline/hybrid)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="seats">Total Seats</Label>
          <Input
            id="seats"
            type="number"
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createWorkshopMutation.isPending || updateWorkshopMutation.isPending}
        >
          {selectedWorkshop ? 'Update Workshop' : 'Create Workshop'}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage workshops, users, and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="workshops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workshops">Workshop Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="workshops">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Workshop Management</CardTitle>
                  <Button onClick={handleAddWorkshop} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workshop
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search workshops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">Loading workshops...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Workshop</th>
                          <th className="text-left p-4">Company</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Seats</th>
                          <th className="text-left p-4">Price</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredWorkshops.map((workshop: Workshop) => (
                          <tr key={workshop.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="font-medium text-gray-900">{workshop.title}</div>
                            </td>
                            <td className="p-4 text-gray-600">{workshop.company}</td>
                            <td className="p-4 text-gray-600">{workshop.date}</td>
                            <td className="p-4">
                              <span className="text-gray-900">
                                {workshop.registeredSeats}/{workshop.seats}
                              </span>
                            </td>
                            <td className="p-4 text-gray-600">
                              ${parseFloat(workshop.price).toFixed(2)}
                            </td>
                            <td className="p-4">
                              <Badge 
                                variant={workshop.status === 'active' ? 'default' : 'secondary'}
                                className={
                                  workshop.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }
                              >
                                {workshop.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewWorkshop(workshop)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditWorkshop(workshop)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteWorkshop(workshop.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Workshop Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Workshop</DialogTitle>
          </DialogHeader>
          <WorkshopForm />
        </DialogContent>
      </Dialog>

      {/* Edit Workshop Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Workshop</DialogTitle>
          </DialogHeader>
          <WorkshopForm />
        </DialogContent>
      </Dialog>

      {/* View Workshop Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Workshop Details</DialogTitle>
          </DialogHeader>
          {selectedWorkshop && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedWorkshop.title}</h3>
                <p className="text-gray-600">{selectedWorkshop.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p>{selectedWorkshop.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p>{selectedWorkshop.date} at {selectedWorkshop.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mode</p>
                  <p className="capitalize">{selectedWorkshop.mode}</p>
                </div>
              </div>
              {selectedWorkshop.location && (
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p>{selectedWorkshop.location}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p>${parseFloat(selectedWorkshop.price).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seats</p>
                  <p>{selectedWorkshop.registeredSeats}/{selectedWorkshop.seats}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;