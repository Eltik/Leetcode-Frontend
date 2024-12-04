import { QuestionDetails } from "~/components/question-area";

export default function Home() {
    return (
        <>
            <QuestionDetails constraints={["Constraint 1", "Constraint 2"]} description="This is a description" difficulty="Easy" examples={[]} title="Goon Sum" />
        </>
    )
}