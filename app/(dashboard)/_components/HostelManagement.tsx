"use client"

import { useState } from 'react'
import { useAppContext } from '@/components/providers/app-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function HostelManagement() {
  const { hostels, addHostel, updateHostel, deleteHostel } = useAppContext()
  const [newHostel, setNewHostel] = useState({ name: '', location: '', price: 0 })

  const handleAddHostel = () => {
    addHostel({ ...newHostel, available: true })
    setNewHostel({ name: '', location: '', price: 0 })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Hostel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newHostel.name}
                onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newHostel.location}
                onChange={(e) => setNewHostel({ ...newHostel, location: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={newHostel.price}
                onChange={(e) => setNewHostel({ ...newHostel, price: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <Button onClick={handleAddHostel} className="ml-auto">Add Hostel</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6">
        {hostels.map((hostel) => (
          <Card key={hostel.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="text-lg font-semibold">{hostel.name}</h3>
                <p className="text-sm text-gray-500">{hostel.location}</p>
                <p className="text-sm">Price: ${hostel.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={hostel.available}
                  onCheckedChange={(checked) => updateHostel(hostel.id, { available: checked })}
                />
                <span>{hostel.available ? 'Available' : 'Unavailable'}</span>
                <Button onClick={() => deleteHostel(hostel.id)} variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

