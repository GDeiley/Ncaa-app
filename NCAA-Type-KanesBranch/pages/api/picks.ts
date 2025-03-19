import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const supabaseusers = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!)
    //fetch all records of users
    const { data: { users }, error: userserror } = await supabaseusers.auth.admin.listUsers();


    //error if cant get users
    if (userserror) {
        console.error("Error fetching 'Picks' table:", userserror.message);
        return res.status(500).json({ error: userserror.message });
    }

    // Fetch all records from 'picks' table
    const { data, error } = await supabase
        .from('Picks')
        .select();

    // Handle error in fetching 'Picks'
    if (error) {
        console.error("Error fetching 'Picks' table:", error.message);
        return res.status(500).json({ error: error.message });
    }

    // Fetch all records from 'Teams' table
    const { data: teams, error: teamsError } = await supabase
        .from('Teams')
        .select();

    // Handle error in fetching 'Teams'
    if (teamsError) {
        console.error("Error fetching 'Teams' table:", teamsError.message);
        return res.status(500).json({ error: teamsError.message });
    }

    // If 'data' from 'Picks' is empty, handle it gracefully
    if (!data || data.length === 0) {
        console.log("No picks data available.");
        return res.status(200).json({ mappedPicks: [] });
    }

    // Proceed to map the picks
    const mappedPicks: {
        id: number;
        created_at: string;
        cinderella_east: any | null;
        cinderella_west: any | null;
        cinderella_midwest: any | null;
        cinderella_south: any | null;
        elite_8_east_1: any | null;
        elite_8_east_2: any | null;
        elite_8_west_1: any | null;
        elite_8_west_2: any | null;
        elite_8_midwest_1: any | null;
        elite_8_midwest_2: any | null;
        elite_8_south_1: any | null;
        elite_8_south_2: any | null;
        final_four_east: any | null;
        final_four_west: any | null;
        final_four_midwest: any | null;
        final_four_south: any | null;
        finalist_1: any | null;
        finalist_2: any | null;
        champion: number | null;
        total_score: number;
        user: string;
        Midwest: boolean;
        West: boolean;
        South: boolean;
        East: boolean;
        Finalists: boolean;
        Champion: boolean;
        email: string;
    }[] = [];


    data.map((pick) => {
        const mappedPick = {
            ...pick, // Copy existing pick data
        };

        const pickKeys = [
            'cinderella_east',
            'cinderella_west',
            'cinderella_midwest',
            'cinderella_south',
            'elite_8_east_1',
            'elite_8_east_2',
            'elite_8_west_1',
            'elite_8_west_2',
            'elite_8_midwest_1',
            'elite_8_midwest_2',
            'elite_8_south_1',
            'elite_8_south_2',
            'final_four_east',
            'final_four_west',
            'final_four_midwest',
            'final_four_south',
            'finalist_1',
            'finalist_2',
            'champion',
            'email'
        ];

        pickKeys.forEach((key) => {
            const id = pick[key];
            if (typeof id === 'number') { // Check if id is a number, assuming team IDs are numbers
                mappedPick[key] = teams?.find(team => team.id === id)?.School || null;
            }
        });

        mappedPicks.push({
            ...mappedPick, //add the modified pick to the mappedPicks array.
            id: pick.id, // Replace with the correct value if needed
            created_at: pick.created_at,
            user: pick.user,
            Midwest: true,
            West: true,
            South: true,
            East: true,
            Finalists: true,
            Champion: true,
            email: users.find((user) => user.id === pick.user)?.email
        }
        );
    });

    return res.status(200).json({ data: mappedPicks });
}