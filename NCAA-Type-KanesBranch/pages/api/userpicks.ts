import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const {id } = req.query
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    
    // Fetch all records from 'picks' table
    const { data, error } = await supabase
        .from('Picks')
        .select()
        .eq('user', id)   
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
}
