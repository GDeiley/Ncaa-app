'use server'
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!)
  
  const supabasePublic = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    if( req.method === "GET"){
        try {
          const { data: { users }, error } = await supabase.auth.admin.listUsers();
          const { data: wins, error: winsError } = await supabasePublic
            .from('Wins')
            .select()

        const { data: picks, error: picksError } = await supabasePublic
            .from('Picks')
            .select()

            const scores:any = [];
  
            // Count occurrences of each team in wins
            const winCounts:any = {};
            wins?.forEach(win => {
              winCounts[win.Team] = (winCounts[win.Team] || 0) + 1;
            });

          
            picks?.forEach(pick => {
              let score = 0;
              
              // Iterate over relevant properties in picks
              Object.keys(pick).forEach(key => {
                if (
                  key.startsWith('cinderella_') || 
                  key.startsWith('elite_8_') || 
                  key.startsWith('final_four_') || 
                  key.startsWith('finalist_') || 
                  key === 'champion'
                ) {
                  const teamId = pick[key];
                  const count = winCounts[teamId] || 0;
                  
                  // Cinderella scoring
                  if (key.startsWith('cinderella_')) {
                    if (count === 1) score += 5;
                    else if (count === 2) score += 15;
                    else if (count >= 3) score += 30;
                  }
                  // Elite 8 scoring
                  else if (key.startsWith('elite_8_')) {
                    if (count === 3) score += 10;
                  }
                  // Final Four scoring
                  else if (key.startsWith('final_four_')) {
                    if (count === 4) score += 20;
                  }
                  // Finalist scoring
                  else if (key.startsWith('finalist_')) {
                    if (count === 5) score += 30;
                  }
                  // Champion scoring
                  else if (key === 'champion') {
                    if (count === 6) score += 50;
                  }
                }
              });
              scores.push({ user: users.find((user) => user.id === pick.user)?.email, id: pick.user, score });
              scores.sort((a:any, b:any) => b.score - a.score);
            });          
          res.status(200).json(scores);
        } catch (error) {
          res.status(500).json({ error: "Error fetching users" });
        }
      }
}