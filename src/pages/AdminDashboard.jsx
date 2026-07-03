import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Search, MapPin, Trash2, CheckCircle, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.js';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      const records = await pb.collection('bookings').getFullList({
        sort: '-created',
        $autoCancel: false
      });
      setBookings(records);
    } catch (err) {
      console.error(err);
      toast({ title: 'Error', description: 'Could not load bookings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await pb.collection('bookings').update(id, { bookingStatus: newStatus }, { $autoCancel: false });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, bookingStatus: newStatus } : b));
      toast({ title: 'Status updated' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    try {
      await pb.collection('bookings').delete(selectedBooking.id, { $autoCancel: false });
      setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
      setIsDeleteModalOpen(false);
      toast({ title: 'Booking cancelled' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to cancel booking', variant: 'destructive' });
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || b.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Bumper Buddies</title>
      </Helmet>
      
      <div className="min-h-screen bg-muted/30 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
              <p className="text-muted-foreground mt-1">View and manage customer service appointments</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-background text-foreground">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Loading bookings...</TableCell>
                  </TableRow>
                ) : filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">No bookings found</TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="font-medium text-foreground">{booking.customerName}</div>
                        <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                      </TableCell>
                      <TableCell className="font-medium">{booking.serviceType}</TableCell>
                      <TableCell>
                        <div>{format(new Date(booking.bookingDate), 'MMM dd, yyyy')}</div>
                        <div className="text-xs text-muted-foreground">{booking.bookingTime}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="capitalize">{booking.serviceLocation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => { setSelectedBooking(booking); setIsViewModalOpen(true); }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.bookingStatus !== 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Mark Completed"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                              onClick={() => handleStatusUpdate(booking.id, 'completed')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Cancel Booking"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => { setSelectedBooking(booking); setIsDeleteModalOpen(true); }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Customer Name</div>
                  <div className="text-foreground">{selectedBooking.customerName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Phone Number</div>
                  <div className="text-foreground">{selectedBooking.customerPhone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Service Type</div>
                  <div className="text-foreground">{selectedBooking.serviceType}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Date & Time</div>
                  <div className="text-foreground">{format(new Date(selectedBooking.bookingDate), 'MMM dd, yyyy')} at {selectedBooking.bookingTime}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="text-foreground capitalize">{selectedBooking.serviceLocation}</div>
                  {selectedBooking.serviceLocation === 'home' && (
                    <div className="text-sm text-muted-foreground mt-1 bg-muted p-2 rounded">{selectedBooking.customerAddress}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">Status</div>
                  <div className="mt-1">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.bookingStatus)}`}>
                      {selectedBooking.bookingStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Cancel Booking?</DialogTitle>
            <DialogDescription>
              Are you sure you want to completely remove this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Keep Booking</Button>
            <Button variant="destructive" onClick={handleDelete}>Yes, Cancel it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminDashboard;