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

export default function OutputArea({ data }: { data: string }) {
  const [isMinimized, setIsMinimized] = React.useState(false)
  
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
      className={`p-4 transition-all duration-300 ease-in-out ${isMinimized ? "h-10 w-[400px]" : ""}`} 
      style={{ width: isMinimized ? "400px" : `${width}px` }}
    >
      <div 
        className={`relative rounded-lg border bg-gray-800 shadow-sm transition-all duration-300 ease-in-out ${
          isMinimized ? "h-10 flex items-center justify-between px-3" : ""
        }`} 
        style={{ height: isMinimized ? "auto" : `${height}px` }}
      >
        {isMinimized ? (
          <div className="flex items-center justify-between px-3 w-full h-full">
            <span className="text-white text-sm font-medium">Output</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white p-0" 
              onClick={toggleMinimize}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Tabs defaultValue="Output" className="w-full">
              <div className="flex items-center justify-between px-3 border-b border-gray-700">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger value="Output">Output</TabsTrigger>
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
              <TabsContent value="Output">
                <Card className="bg-gray-800 border-0">
                  <CardContent className="space-y-2 border-0">
                    <ScrollArea>
                      <div className="space-y-1 flex w-max space-x-4 p-4">
                        <h1 className="mt-2 max-w-[400px] min-h-[100px] max-h-[300px] font-mono text-sm text-white whitespace-pre-wrap">
                          {data}
                        </h1>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}  