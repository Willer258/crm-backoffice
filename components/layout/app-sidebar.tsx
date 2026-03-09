'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Kanban,
  UserCog,
  CreditCard,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { WorkspaceSwitcher } from '@/components/workspace/workspace-switcher'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const t = useTranslations('sidebar')

  const menuGroups = [
    {
      title: t('principal'),
      items: [
        {
          title: t('dashboard'),
          href: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: t('calendar'),
          href: '/dashboard/calendar',
          icon: Calendar,
        },
      ],
    },
    {
      title: 'CRM',
      items: [
        {
          title: t('contacts'),
          href: '/dashboard/contacts',
          icon: Users,
        },
        {
          title: t('companies'),
          href: '/dashboard/companies',
          icon: Building2,
        },
        {
          title: t('pipeline'),
          href: '/dashboard/pipeline',
          icon: Kanban,
        },
      ],
    },
    {
      title: t('settings'),
      items: [
        {
          title: t('usersAndWorkspace'),
          href: '/dashboard/settings/users',
          icon: UserCog,
        },
        {
          title: t('billing'),
          href: '/dashboard/settings/billing',
          icon: CreditCard,
        },
      ],
    },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, index) => (
          <React.Fragment key={group.title}>
            {index > 0 && <SidebarSeparator className="mx-0" />}
            <SidebarGroup>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = Boolean(
                      item.href && (pathname === item.href || pathname?.startsWith(item.href + '/'))
                    )

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                          <Link href={item.href}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
