export default function QuestionArea() {
    return (
        <>
            <div className="mx-auto w-[80%] rounded-md border-[#3C3C3C] bg-[#2F2F2F] p-5 text-sm text-white">
                <h1 className="text-2xl font-bold">Two Sum</h1>
                <h2 className="text-lg text-green-500">Easy</h2>

                <br></br>
                <hr></hr>
                <br></br>

                <div className="ml-6 mr-4">
                    <p className="mb-3">
                        Given an array of integers <code className="border-white">nums</code> and an integer <code>target</code>, return{" "}
                        <em>
                            indices of the two numbers such that they add up to <code>target</code>.
                        </em>
                    </p>
                    <p>
                        You may assume that each input would have{" "}
                        <b>
                            <em>exactly</em> one solution
                        </b>
                        , and you may not use the same element twice.
                    </p>
                </div>

                <div className="mb-8 mt-8">
                    <p className="mb-3 ml-6 mr-4 font-bold">Example 1:</p>
                    <div className="mb-6 ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs">
                        <p>
                            <code>
                                <b>Input:</b> nums = [2,7,11,15], target = 9
                            </code>
                        </p>
                        <p>
                            <code>
                                <b>Output:</b> [0,1]
                            </code>
                        </p>
                        <p>
                            <code>
                                <b>Explanation:</b> Because nums[0] + nums[1] == 9, we return [0,1].
                            </code>
                        </p>
                    </div>
                    <p className="mb-3 ml-6 mr-4 font-bold">Example 2:</p>
                    <div className="mb-6 ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs">
                        <p>
                            <code>
                                <b>Input:</b> nums = [3, 2, 4], target = 6
                            </code>
                        </p>
                        <p>
                            <code>
                                <b>Output:</b> [1,2]
                            </code>
                        </p>
                    </div>
                    <p className="mb-3 ml-6 mr-4 font-bold">Example 3:</p>
                    <div className="mb-6 ml-10 mr-4 rounded-md bg-[#514F4F] p-3 text-xs">
                        <p>
                            <code>
                                <b>Input:</b> nums = [3, 3], target = 6
                            </code>
                        </p>
                        <p>
                            <code>
                                <b>Output:</b> [0,1]
                            </code>
                        </p>
                    </div>
                </div>

                <p className="mb-3 ml-6 font-bold">Constraints:</p>
                <ul className="mb-6 ml-12 list-disc">
                    <li>
                        <code>
                            2 &lt;= nums.length &lt;= 10<sup>4</sup>
                        </code>
                    </li>
                    <li>
                        <code>
                            -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
                        </code>
                    </li>
                    <li>
                        <code>
                            -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
                        </code>
                    </li>
                    <li className="font-bold">Only one valid answer exists.</li>
                </ul>

                <p className="mb-3 ml-6">
                    <b>Follow-up:</b> Can you come up with an algorithm that is less than{" "}
                    <code>
                        0(n<sup>2</sup>)
                    </code>{" "}
                    time complexity?
                </p>
            </div>
        </>
    );
}
