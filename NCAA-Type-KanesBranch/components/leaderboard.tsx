"use client"
import ErrorScreen from './errorScreen';
import LoadingScreen from './loadingScreen';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Leaderboard({id}: {id:string}) {
    const { data: scores, error, isLoading } = useSWR("/api/users", fetcher);
    if (isLoading) return <LoadingScreen />;
    if (error) return <ErrorScreen />;
  return (
<div className='flex flex-col gap-10 p-4'>
<Table>
  <TableCaption>The Diddy Bop Leaderboard.</TableCaption>
  <TableHeader>
    <TableRow>
        <TableHead>Rank</TableHead>
      <TableHead >Username</TableHead>
      <TableHead>Score</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {scores.map((score: any, index: number) => (
  <TableRow className={score.id === id?"bg-blue-100":""} key={index}>
        <TableCell>{index+1}</TableCell>
    <TableCell>{score.user}</TableCell>
    <TableCell>{score.score}</TableCell>
  </TableRow>
))}
  </TableBody>
</Table>
<div className="w-full border-t border-gray-300 px-6"></div>
         <Table>
           <TableCaption className="text-gray-700">
             Scoring Rules for the Diddy Bop Bracket.
           </TableCaption>
           <TableHeader>
             <TableRow>
               <TableHead className="text-gray-700">Round</TableHead>
               <TableHead className="text-gray-700">Selection Type</TableHead>
               <TableHead className="text-gray-700">Points</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             <TableRow>
               <TableCell className="text-gray-700">First Round</TableCell>
               <TableCell className="text-gray-700">Cinderella wins in first round</TableCell>
               <TableCell className="text-gray-700">5 points per win</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">Round of 32</TableCell>
               <TableCell className="text-gray-700">Cinderella wins in round of 32</TableCell>
               <TableCell className="text-gray-700">10 bonus points per win</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">Sweet 16</TableCell>
               <TableCell className="text-gray-700">Cinderella wins in Sweet 16</TableCell>
               <TableCell className="text-gray-700">15 bonus points</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">Elite 8</TableCell>
               <TableCell className="text-gray-700">Correct pick</TableCell>
               <TableCell className="text-gray-700">10 points each</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">Final 4</TableCell>
               <TableCell className="text-gray-700">Correct pick</TableCell>
               <TableCell className="text-gray-700">20 points each</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">Championship Game</TableCell>
               <TableCell className="text-gray-700">Correct pick</TableCell>
               <TableCell className="text-gray-700">30 points each</TableCell>
             </TableRow>
             <TableRow>
               <TableCell className="text-gray-700">National Champion</TableCell>
               <TableCell className="text-gray-700">Correct pick</TableCell>
               <TableCell className="text-gray-700">50 points</TableCell>
             </TableRow>
           </TableBody>
         </Table>
       
</div>
  )
}