'use client'

import * as React from 'react'
import { Bell, Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning' | 'error'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New deal created',
    description: 'A new deal worth €15,000 has been created',
    time: '5 min ago',
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Meeting reminder',
    description: 'Team sync in 30 minutes',
    time: '25 min ago',
    read: false,
    type: 'info',
  },
  {
    id: '3',
    title: 'Contact updated',
    description: 'John Doe contact information was updated',
    time: '1 hour ago',
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Task overdue',
    description: 'Follow-up call with Acme Corp is overdue',
    time: '2 hours ago',
    read: true,
    type: 'warning',
  },
]

export function HeaderNotifications() {
  const [notifications, setNotifications] = React.useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs font-normal"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="text-muted-foreground py-6 text-center text-sm">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer flex-col items-start gap-1 p-3"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${getTypeColor(notification.type)}`}
                    />
                    <span
                      className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : ''}`}
                    >
                      {notification.title}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="bg-primary h-2 w-2 rounded-full" />
                  )}
                </div>
                <p className="text-muted-foreground pl-4 text-xs">
                  {notification.description}
                </p>
                <div className="flex w-full items-center justify-between pl-4">
                  <span className="text-muted-foreground text-xs">
                    {notification.time}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
