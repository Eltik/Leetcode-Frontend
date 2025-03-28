import InputArea from "../input-area"
import OutputArea from "../output-area"
import Leaderboard from "../leaderboard/Leaderboard"

interface QuestionAreaProps {
    problemData: {
        name: string;
        description: string;
        parameter: string;
    } | null;
}

export default function QuestionArea({ problemData }: QuestionAreaProps) {
    return (
        <>
            <div className="bg-[#2F2F2F] text-white text-sm rounded-md p-5 border-[#3C3C3C] w-[95%] mx-auto">
                <h1 className="text-2xl font-bold mt-2">{problemData?.name ?? 'Loading...'}</h1>
                
                <br></br>
                <hr></hr>
                <br></br>

                <div className="ml-6 mr-4">
                    <p className="mb-3">{problemData?.description ?? 'Loading...'}</p>
                
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg mb-2">Parameters:</h3>
                        <p>{problemData?.parameter ?? 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}