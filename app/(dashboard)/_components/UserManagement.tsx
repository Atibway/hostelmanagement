"use client"

import { useAppContext } from "@/components/providers/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function UserManagement() {
  const { users, updateUser } = useAppContext()

  const toggleUserRole = (userId: string, currentRole: 'admin' | 'user') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    updateUser(userId, { role: newRole })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">ID: {user.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>{user.role}</Badge>
                    <Button onClick={() => toggleUserRole(user.id, user.role)} size="sm">
                      Toggle Role
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

