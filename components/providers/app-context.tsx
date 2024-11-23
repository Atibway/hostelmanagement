"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Hostel = {
  id: string;
  name: string;
  location: string;
  price: number;
  available: boolean;
};

type Booking = {
  id: string;
  userId: string;
  hostelId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

type Message = {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
};

type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
};

type AppContextType = {
  hostels: Hostel[];
  bookings: Booking[];
  messages: Message[];
  users: User[];
  currentUser: User | null;
  addHostel: (hostel
: Omit<Hostel, 'id'>) => void;
  updateHostel: (id: string, hostel: Partial<Hostel>) => void;
  deleteHostel: (id: string) => void;
  bookHostel: (userId: string, hostelId: string) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  sendMessage: (from: string, to: string, content: string) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  login: (userId: string) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([
    { id: 'admin1', name: 'Admin User', role: 'admin' },
    { id: 'user1', name: 'Regular User', role: 'user' },
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addHostel = (hostel: Omit<Hostel, 'id'>) => {
    const newHostel = { ...hostel, id: Date.now().toString() };
    setHostels([...hostels, newHostel]);
  };

  const updateHostel = (id: string, updatedHostel: Partial<Hostel>) => {
    setHostels(hostels.map(hostel => 
      hostel.id === id ? { ...hostel, ...updatedHostel } : hostel
    ));
  };

  const deleteHostel = (id: string) => {
    setHostels(hostels.filter(hostel => hostel.id !== id));
  };

  const bookHostel = (userId: string, hostelId: string) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      userId,
      hostelId,
      status: 'pending',
    };
    setBookings([...bookings, newBooking]);
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings(bookings => bookings.map(booking => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    ));
  };

  const sendMessage = (from: string, to: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      from,
      to,
      content,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(users => users.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };

  const login = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider value={{
      hostels,
      bookings,
      messages,
      users,
      currentUser,
      addHostel,
      updateHostel,
      deleteHostel,
      bookHostel,
      updateBooking,
      sendMessage,
      updateUser,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

