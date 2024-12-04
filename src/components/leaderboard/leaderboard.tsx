import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface LeaderboardEntry {
  rank: number
  name: string
  currentPoints: number
  totalPoints: number
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Thien",
    currentPoints: 2500,
    totalPoints: 10000,
  },
  {
    rank: 2,
    name: "Lobsang",
    currentPoints: 2200,
    totalPoints: 9500,
  },
  {
    rank: 3,
    name: "Ian",
    currentPoints: 2000,
    totalPoints: 9000,
  },
  {
    rank: 4,
    name: "Caden",
    currentPoints: 1800,
    totalPoints: 8500,
  },
  {
    rank: 5,
    name: "Derek",
    currentPoints: 1600,
    totalPoints: 8000,
  },
]

export default function Leaderboard() {
  // Test
  return (
    <div className="w-full p-6">
      {/* hi im a comment */}
      <Table className="border border-border rounded-lg overflow-hidden">
        <TableHeader className="bg-gray-900">
          <TableRow className="hover:bg-gray-900">
            <TableHead className="text-lg font-bold text-white w-24">Rank</TableHead> 
            <TableHead className="text-lg font-bold text-white">Name</TableHead>
            <TableHead className="text-lg font-bold text-white text-right">Current Points</TableHead>
            <TableHead className="text-lg font-bold text-white text-right">Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.rank} className="bg-gray-800 hover:bg-gray-700">
              <TableCell className="text-white font-medium">{entry.rank}</TableCell>
              <TableCell className="text-white">{entry.name}</TableCell>
              <TableCell className="text-white text-right">{entry.currentPoints.toLocaleString()}</TableCell>
              <TableCell className="text-white text-right">{entry.totalPoints.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

