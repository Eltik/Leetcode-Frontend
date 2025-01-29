import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import Editor from "@monaco-editor/react";
import { FolderTree, Code2, Settings, X, Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface FileStructure {
    name: string;
    content: string;
    language: string;
}

const defaultFile: FileStructure = {
    name: "example.js",
    content: "// Write your code here\nconsole.log('Hello World!');",
    language: "javascript"
};

const defaultFiles: FileStructure[] = [defaultFile];

const supportedLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
];

export default function CodeEditor() {
    const [files, setFiles] = useState<FileStructure[]>(defaultFiles);
    const [currentFile, setCurrentFile] = useState<FileStructure>(defaultFile);
    const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleEditorChange = (value: string | undefined) => {
        if (!value) return;
        const updatedFile = { ...currentFile, content: value };
        setCurrentFile(updatedFile);
        setFiles(files.map(f => f.name === updatedFile.name ? updatedFile : f));
    };

    const handleLanguageChange = (language: string) => {
        const updatedFile = { ...currentFile, language };
        setCurrentFile(updatedFile);
        setFiles(files.map(f => f.name === updatedFile.name ? updatedFile : f));
    };

    const handleDeleteFile = (fileToDelete: FileStructure, e: React.MouseEvent) => {
        e.stopPropagation();
        const newFiles = files.filter(f => f.name !== fileToDelete.name);
        if (newFiles.length === 0) return;
        setFiles(newFiles);
        
        // If we're deleting the current file, switch to the first remaining file
        if (currentFile.name === fileToDelete.name) {
            setCurrentFile(newFiles[0]!); // This is safe because we checked newFiles.length > 0
        }
    };

    const Sidebar = () => (
        <div className={cn(
            "absolute inset-y-0 left-0 z-20 w-64 transform border-r border-border bg-card transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isSidebarOpen 
                ? "translate-x-0 scale-x-100" 
                : "-translate-x-full scale-x-95 md:scale-x-100"
        )}>
            <ScrollArea className="h-full">
                <Accordion type="single" collapsible className="w-full">
                    {/* File Explorer */}
                    <AccordionItem value="files">
                        <AccordionTrigger className="px-4">
                            <div className="flex items-center gap-2">
                                <FolderTree className="h-4 w-4" />
                                <span>Files</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-1 p-2">
                                {files.map((file) => (
                                    <button
                                        key={file.name}
                                        onClick={() => {
                                            setCurrentFile(file);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm hover:bg-accent",
                                            currentFile.name === file.name && "bg-accent"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Code2 className="h-4 w-4" />
                                            {file.name}
                                        </div>
                                        {files.length > 1 && (
                                            <button
                                                onClick={(e) => handleDeleteFile(file, e)}
                                                className="rounded-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Settings */}
                    <AccordionItem value="settings">
                        <AccordionTrigger className="px-4">
                            <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 p-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Theme</label>
                                    <button
                                        onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                                        className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                                    >
                                        {theme === "vs-dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
                                    </button>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Current File</label>
                                    <p className="text-sm text-muted-foreground">{currentFile.name}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ScrollArea>
        </div>
    );

    return (
        <div className="flex h-screen w-full flex-col bg-background">
            {/* Top Bar */}
            <div className="flex h-14 items-center border-b px-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="mr-4 md:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium hidden md:inline">Current File:</span>
                    {/* Language Dropdown for Mobile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm md:hidden">
                            <Code2 className="h-4 w-4" />
                            {supportedLanguages.find(lang => lang.value === currentFile.language)?.label}
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {supportedLanguages.map((lang) => (
                                <DropdownMenuItem
                                    key={lang.value}
                                    onClick={() => handleLanguageChange(lang.value)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Code2 className="h-4 w-4" />
                                        <span className="text-sm">{lang.label}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Language Tabs for Desktop */}
                    <div className="hidden md:block max-w-[50vw]">
                        <Tabs value={currentFile.language} onValueChange={handleLanguageChange}>
                            <ScrollArea className="w-full">
                                <TabsList className="inline-flex min-w-full border-b-0">
                                    {supportedLanguages.map((lang) => (
                                        <TabsTrigger
                                            key={lang.value}
                                            value={lang.value}
                                            className="flex items-center gap-2 shrink-0"
                                        >
                                            <Code2 className="h-4 w-4" />
                                            <span className="text-sm">{lang.label}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </Tabs>
                    </div>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                    <button
                        onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                        className="rounded-md bg-primary p-2 text-primary-foreground"
                    >
                        {theme === "vs-dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>
            </div>

            <div className="relative flex flex-1">
                <Sidebar />
                
                {/* Overlay for mobile sidebar */}
                <div
                    className={cn(
                        "fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-transform duration-300 ease-in-out md:hidden",
                        isSidebarOpen 
                            ? "translate-x-0" 
                            : "-translate-x-full"
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Editor */}
                <div className="relative flex-1">
                    <Editor
                        height="100%"
                        theme={theme}
                        language={currentFile.language}
                        value={currentFile.content}
                        onChange={handleEditorChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            automaticLayout: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}