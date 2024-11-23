"use client"

import { useState } from 'react'
import { useAppContext } from '@/components/providers/app-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function MessageCenter() {
  const { messages, users, sendMessage, currentUser } = useAppContext()
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState('')

  const handleSendReply = () => {
    if (currentUser && selectedUser && replyMessage) {
      sendMessage(currentUser.id, selectedUser, replyMessage)
      setReplyMessage('')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 border-r pr-4">
              <h3 className="font-semibold mb-2">Users</h3>
              {users.filter(user => user.role === 'user').map((user) => (
                <Button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  variant={selectedUser === user.id ? "default" : "ghost"}
                  className="w-full justify-start mb-2"
                >
                  {user.name}
                </Button>
              ))}
            </div>
            <div className="col-span-2">
              {selectedUser ? (
                <>
                  <div className="space-y-4 mb-4 h-64 overflow-y-auto">
                    {messages
                      .filter(m => (m.from === selectedUser && m.to === currentUser?.id) || (m.from === currentUser?.id && m.to === selectedUser))
                      .map((message) => (
                        <Card key={message.id}>
                          <CardContent className="p-2">
                            <p className="text-sm font-semibold">{message.from === currentUser?.id ? 'You' : users.find(u => u.id === message.from)?.name}</p>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-gray-500">{message.timestamp.toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-grow"
                    />
                    <Button onClick={handleSendReply}>Send</Button>
                  </div>
                </>
              ) : (
                <p>Select a user to view messages</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

