import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useDraggable } from "~/hooks/use-draggable";
import { Maximize2, Minimize2 } from "lucide-react";

export default function OutputArea({ data }: { data: string }) {
    const [isMinimized, setIsMinimized] = React.useState(false);

    const { size: height } = useDraggable({
        direction: "vertical",
        initialSize: 300,
        minSize: 200,
        maxSize: 600,
    });

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };
    return (
        <div className="p-4 transition-all duration-1000 ease-in-out" style={{ width: "500px" }}>
            <div className={`relative rounded-lg border bg-gray-800 shadow-sm transition-all duration-300 ease-in-out ${isMinimized ? "flex h-10 items-center justify-between px-3" : ""}`} style={{ height: isMinimized ? "auto" : `${height}px`, width: "100%" }}>
                {isMinimized ? (
                    <div className="flex h-full w-full items-center justify-between px-3">
                        <span className="text-sm font-medium text-white">Output</span>
                        <Button variant="ghost" size="sm" className="ml-auto p-0 text-gray-400 hover:text-white" onClick={toggleMinimize}>
                            <Maximize2 className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Tabs defaultValue="Output" className="w-full">
                        <div className="flex items-center justify-between border-b border-gray-700 px-3">
                            <TabsList className="h-12 bg-transparent">
                                <TabsTrigger value="Output">Output</TabsTrigger>
                                <TabsTrigger value="Hint 1">Hint 1</TabsTrigger>
                                <TabsTrigger value="Hint 2">Hint 2</TabsTrigger>
                                <TabsTrigger value="Hint 3">Hint 3</TabsTrigger>
                            </TabsList>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={toggleMinimize}>
                                <Minimize2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <TabsContent value="Output">
                            <Card className="border-0 bg-gray-800">
                                <CardContent className="space-y-2 border-0">
                                    <ScrollArea>
                                        <div className="flex w-max space-x-4 space-y-1 p-4">
                                            <h1 className="mt-2 max-h-[300px] min-h-[100px] max-w-[400px] whitespace-pre-wrap font-mono text-sm text-white">{data}</h1>
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
    );
}
