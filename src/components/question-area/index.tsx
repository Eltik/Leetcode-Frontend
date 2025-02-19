import { Button } from "~/components/ui/button"

export default function QuestionArea() {
    return (
        <>
            <div className="bg-[#2F2F2F] text-white text-sm rounded-md p-5 border-[#3C3C3C] w-[80%] mx-auto">
                <h1 className="text-2xl font-bold">Two Sum</h1>
                <h2 className="text-green-500 text-lg">Easy</h2>
                
                <br></br>
                <hr></hr>
                <br></br>

                <div className=" ml-6 mr-4">
                    <p className="mb-3">Given an array of integers <code className="border-white">nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code>.</em></p>
                    <p>You may assume that each input would have <b><em>exactly</em> one solution</b>, and you may not use the same element twice.</p>  
                </div>

                <div className="mt-8 mb-8">
                    <p className="font-bold mb-3 ml-6 mr-4">Example 1:</p>
                    <div className = "ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs mb-6">
                        <p><code><b>Input:</b> nums = [2,7,11,15], target = 9</code></p>
                        <p><code><b>Output:</b> [0,1]</code></p>
                        <p><code><b>Explanation:</b> Because nums[0] + nums[1] == 9, we return [0,1].</code></p>
                    </div>
                    <p className="font-bold mb-3 ml-6 mr-4">Example 2:</p> 
                    <div className = "ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs mb-6">
                        <p><code><b>Input:</b> nums = [3, 2, 4], target = 6</code></p>
                        <p><code><b>Output:</b> [1,2]</code></p>
                    </div>
                    <p className="font-bold mb-3 ml-6 mr-4">Example 3:</p>
                    <div className = "ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs mb-6">
                        <p><code><b>Input:</b> nums = [3, 3], target = 6</code></p>
                        <p><code><b>Output:</b> [0,1]</code></p>
                    </div>
                </div>

                <p className = "font-bold ml-6 mb-3">Constraints:</p>
                <ul className = "list-disc ml-12 mb-6">
                    <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                    <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                    <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                    <li className = "font-bold">Only one valid answer exists.</li>
                </ul>

                <p className = "ml-6 mb-3"><b>Follow-up:</b> Can you come up with an algorithm that is less than <code>0(n<sup>2</sup>)</code> time complexity?</p>
            </div>
        </>
    )
}