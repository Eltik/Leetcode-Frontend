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
    language: "javascript",
};

const defaultFiles: FileStructure[] = [defaultFile];

const supportedLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
];

interface CodeEditorProps {
    onRun: (output: string) => void;
}

export default function CodeEditor({ onRun }: CodeEditorProps) {
    const [files, setFiles] = useState<FileStructure[]>(defaultFiles);
    const [currentFile, setCurrentFile] = useState<FileStructure>(defaultFile);
    const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);

    const handleEditorChange = (value: string | undefined) => {
        if (!value) return;
        const updatedFile = { ...currentFile, content: value };
        setCurrentFile(updatedFile);
        setFiles(files.map((f) => (f.name === updatedFile.name ? updatedFile : f)));
    };

    const handleLanguageChange = (language: string) => {
        const updatedFile = { ...currentFile, language };
        setCurrentFile(updatedFile);
        setFiles(files.map((f) => (f.name === updatedFile.name ? updatedFile : f)));
    };

    const handleRun = () => {
        // This is a mock implementation - in a real app, you'd send the code to a backend
        const output = `Running ${currentFile.language} code...\n${currentFile.content}\n\nOutput:\nHello World!`;
        onRun(output);
    };

    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-700 bg-[#1E1E1E]">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
                <div className="flex items-center gap-2 text-white">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 rounded px-2 py-1 hover:bg-gray-700">
                            <Code2 className="h-4 w-4" />
                            <span>{currentFile.language}</span>
                            <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {supportedLanguages.map((lang) => (
                                <DropdownMenuItem key={lang.value} onClick={() => handleLanguageChange(lang.value)}>
                                    {lang.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")} className="rounded p-1 hover:bg-gray-700">
                        {theme === "vs-dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>

                    <button onClick={handleRun} className="flex items-center gap-1 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                        Run
                    </button>
                </div>

                <button onClick={() => setIsToolbarOpen(!isToolbarOpen)} className="rounded p-1 hover:bg-gray-700">
                    <Menu className="h-4 w-4" />
                </button>
            </div>

            {/* Collapsible Settings */}
            {isToolbarOpen && (
                <div className="border-b border-gray-700 bg-[#252525] p-2">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Font Size: 14px</span>
                        <span className="text-sm text-gray-400">Tab Size: 4</span>
                        <span className="text-sm text-gray-400">Wrap: Off</span>
                    </div>
                </div>
            )}

            {/* Editor */}
            <div className="flex-1">
                <Editor
                    height="100%"
                    theme={theme}
                    language={currentFile.language}
                    value={currentFile.content}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        tabSize: 4,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>
    );
}
