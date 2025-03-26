"use client"

import React from "react"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import { useDraggable } from "~/hooks/use-draggable"
import { Maximize2, Minimize2 } from 'lucide-react'

export default function OutputArea({ hints }: { hints: string[] }) {
  const [isMinimized, setIsMinimized] = React.useState(true)
  
  const { size: width, startDragging: startDraggingHorizontal } = useDraggable({
    direction: 'horizontal',
    initialSize: 800,
    minSize: 400,
    maxSize: 1200
  })

  const { size: height, startDragging: startDraggingVertical } = useDraggable({
    direction: 'vertical',
    initialSize: 300,
    minSize: 200,
    maxSize: 600
  })

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }
  return (
    <div 
      className="fixed bottom-4 right-4 transition-all duration-300 ease-in-out"
      style={{ 
        width: isMinimized ? "40px" : "500px",
      }}
    >
      <div 
        className={`relative rounded-md bg-[#2F2F2F] shadow-sm transition-all duration-300 ease-in-out ${
          isMinimized ? "h-10 w-10 flex items-center justify-center" : ""
        }`} 
        style={{ height: isMinimized ? "40px" : `${height}px` }} 
      >
        {isMinimized ? (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white p-0" 
            onClick={toggleMinimize}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        ) : (
          <Tabs defaultValue="Hint 1" className="w-full">
            <div className="flex items-center justify-between px-3 border-b border-gray-700">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger value="Hint 1">Hint 1</TabsTrigger>
                <TabsTrigger value="Hint 2">Hint 2</TabsTrigger>
                <TabsTrigger value="Hint 3">Hint 3</TabsTrigger>
              </TabsList>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-white" 
                onClick={toggleMinimize}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
            <TabsContent value="Hint 1">
              <Card className="bg-[#2F2F2F] border-0">
                <CardContent className="space-y-2 border-0">
                  <ScrollArea>
                    <div className="space-y-1 flex w-max space-x-4 p-4">
                      <h1 className="mt-2 max-w-[400px] min-h-[100px] max-h-[300px] font-mono text-sm text-white whitespace-pre-wrap">
                        {hints[0]}
                      </h1>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Hint 2">
              <Card className="bg-[#2F2F2F] border-0">
                <CardContent className="space-y-2 border-0">
                  <ScrollArea>
                    <div className="space-y-1 flex w-max space-x-4 p-4">
                      <h1 className="mt-2 max-w-[400px] min-h-[100px] max-h-[300px] font-mono text-sm text-white whitespace-pre-wrap">
                        {hints[1]}
                      </h1>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Hint 3">
              <Card className="bg-[#2F2F2F] border-0">
                <CardContent className="space-y-2 border-0">
                  <ScrollArea>
                    <div className="space-y-1 flex w-max space-x-4 p-4">
                      <h1 className="mt-2 max-w-[400px] min-h-[100px] max-h-[300px] font-mono text-sm text-white whitespace-pre-wrap">
                        {hints[2]}
                      </h1>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
