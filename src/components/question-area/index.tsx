import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"

interface Example {
  input: string
  output: string
  explanation?: string
}

interface QuestionDetailsProps {
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  examples: Example[]
  constraints: string[]
}

export function QuestionDetails({ title, difficulty, description, examples, constraints }: QuestionDetailsProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <Badge variant={difficulty === "Easy" ? "secondary" : difficulty === "Medium" ? "default" : "destructive"}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription>Problem Description</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <p className="whitespace-pre-wrap">{description}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Examples:</h3>
          <div className="space-y-4">
            {examples.map((example, index) => (
              <div key={index} className="bg-muted p-4 rounded-md">
                <p className="font-medium">Example {index + 1}:</p>
                <p>Input: {example.input}</p>
                <p>Output: {example.output}</p>
                {example.explanation && (
                  <p className="mt-2">Explanation: {example.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
          <ul className="list-disc list-inside">
            {constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

