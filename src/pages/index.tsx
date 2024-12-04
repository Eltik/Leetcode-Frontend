"use client"

import * as React from "react"
import { ChevronRight, Home, Trophy, BookOpen, Settings, LogOut } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "~/components/ui/sidebar"

// Navigation items data
const navigationItems = [
  {
    title: "Question 1",
    icon: BookOpen,
    href: "/question-1",
  },
  {
    title: "Question 2",
    icon: BookOpen,
    href: "/question-2",
  },
  {
    title: "Question 3",
    icon: BookOpen,
    href: "/question-3",
  },
  {
    title: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
]

export default function SidebarDemo() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar className="hidden lg:block border-r">
          <SidebarHeader className="border-b px-2 py-4">
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              Coding Challenge
            </h2>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/logout" className="flex items-center gap-2 text-red-500">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Question Title</h1>
            </div>
            <div className="border shadow-sm rounded-lg p-2">
              {/* Your main content goes here */}
              <p>Select a question from the sidebar to begin.</p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

