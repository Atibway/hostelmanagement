"use client"

import { useState } from 'react'
import { useAppContext } from '@/components/providers/app-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HostelManagement } from './HostelManagement'
import { BookingOverview } from './BookingOverview'
import { UserManagement } from './UserManagement'
import { MessageCenter } from './MessageCenter'

export default function AdminDashboard() {
  const { currentUser } = useAppContext()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="hostels">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hostels">Hostels</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="hostels">
          <HostelManagement />
        </TabsContent>
        <TabsContent value="bookings">
          <BookingOverview />
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="messages">
          <MessageCenter />
        </TabsContent>
      </Tabs>
    </div>
  )
}

