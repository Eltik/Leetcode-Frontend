import { Button } from "../ui/button";
import { useState } from "react";

interface QuestionAreaProps {
  problemData: {
    name: string;
    description: string;
    parameter: string;
    testcase: string;
    solution: string;
  } | null;
  name: string;
  onSolutionSuccess: () => void;
  onSubmitCode: (code: string) => Promise<string>;
}

export default function InputArea({ problemData, name, onSolutionSuccess, onSubmitCode }: QuestionAreaProps) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  console.log('InputArea problemData:', problemData);

  const handleSubmit = async () => {
    console.log('Submit clicked, problemData:', problemData);
    if (!problemData) {
      setOutput("Data not found");
      return;
    }

    try {
      const result = await onSubmitCode(code);
      if (result === problemData.solution) {
        setOutput(`Congratulations! Your solution is correct!`);
        onSolutionSuccess();
      } else {
        setOutput("Incorrect solution, try again!");
      }
    } catch (error) {
      setOutput(`${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="bg-[#2F2F2F] text-white text-sm rounded-md p-5 border-[#3C3C3C] w-[95%] mx-auto">
      <h3 className="font-semibold text-lg mb-2">Your Solution:</h3>
      <textarea 
        className="w-full h-96 bg-[#1F1F1F] text-white p-3 rounded-md font-mono"
        placeholder="Write your solution here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="mt-4 flex items-start justify-between">
        <Button 
          className="bg-gray-600 hover:bg-gray-700 transition-colors"
          onClick={handleSubmit}
        >
          Submit Solution
        </Button>
        <div className="flex-1 ml-4">
          <div className={`p-4 rounded-md ${
            output.includes('Congratulations') 
              ? 'bg-green-900/30 border border-green-700' 
              : output 
                ? 'bg-red-900/30 border border-red-700'
                : 'hidden'
          }`}>
            <p className="font-mono">{output}</p>
          </div>
        </div>
      </div>
    </div>
  );
}