import { Button } from "../ui/button";

export default function InputArea() {
  return (
    <div className="bg-[#2F2F2F] text-white text-sm rounded-md p-5 border-[#3C3C3C] w-[95%] mx-auto">
      <h3 className="font-semibold text-lg mb-2">Your Solution:</h3>
      <textarea 
        className="w-full h-48 bg-[#1F1F1F] text-white p-3 rounded-md font-mono"
        placeholder="Write your solution here..."
      />
      <Button 
        className="mt-4 bg-gray-600 hover:bg-gray-600"
      >
        Submit Solution
      </Button>
    </div>
  );
}