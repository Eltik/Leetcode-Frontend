"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"

export default function CodeOutput() {
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [output] = React.useState<string[]>([
    "Hello World!",
    "This is a sample output.",
    "With numbered lines.",
    "You can add more lines here.",
    "Or fetch real data to display.",
    " ",
    " ",
    " ",
    " ",
  ])

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className={`rounded-lg border bg-zinc-950 shadow-sm transition-all duration-300 ease-in-out ${isMinimized ? 'h-10' : 'h-auto'}`}>
        {isMinimized ? (
          <div className="flex items-center justify-between px-3 h-full">
            <span className="text-white text-sm font-medium">Output</span>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white p-0" onClick={toggleMinimize}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="output" className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between px-3 border-b border-zinc-800">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger 
                  value="output" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4"
                >
                  Output
                </TabsTrigger>
                <span className="text-zinc-600 px-1">|</span>
                <TabsTrigger 
                  value="hint1"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4"
                >
                  Hint 1
                </TabsTrigger>
                <span className="text-zinc-600 px-1">|</span>
                <TabsTrigger 
                  value="hint2"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4"
                >
                  Hint 2
                </TabsTrigger>
                <span className="text-zinc-600 px-1">|</span>
                <TabsTrigger 
                  value="hint3"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white px-4"
                >
                  Hint 3
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={toggleMinimize}>
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
            <TabsContent value="output" className="p-4 text-white flex-grow flex flex-col">
              <div className="bg-zinc-800 rounded-md flex-grow overflow-hidden">
                <ScrollArea className="h-[200px] w-full">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Output:</h3>
                    <pre className="font-mono text-sm">
                      {output.map((line, index) => (
                        <div key={index} className="flex">
                          <span className="w-8 text-zinc-500 select-none">{index + 1}</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </pre>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="hint1" className="p-4 text-white">
              Skibidi 💩
            </TabsContent>
            <TabsContent value="hint2" className="p-4 text-white">
              Sigma 🐺
            </TabsContent>
            <TabsContent value="hint3" className="p-4 text-white">
              Mango 💀
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

