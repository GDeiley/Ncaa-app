import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (!req.body || !req.body.picks) {
    return res.status(400).json({ error: "Invalid request format. Expected { picks: {...} }" });
  }

  const { picks } = req.body;
  const { region } = picks;
  const regionKey = region.toLowerCase().trim();
  const { user } = picks;

  let insertPayload: Record<string, any> = { user };

  if (regionKey === "champion") {
    insertPayload = {
      user,
      champion: picks.champion,
      total_score: picks.score,
      [region]: true
    };
  } else if (regionKey === "finalists") {
    insertPayload = {
      user,
      finalist_1: picks.finalist_one,
      finalist_2: picks.finalist_two,
      [region]: true
    };
  } else {
    insertPayload = {
      user,
      [`cinderella_${regionKey}`]: picks.cinderella,
      [`elite_8_${regionKey}_1`]: picks.elite_one,
      [`elite_8_${regionKey}_2`]: picks.elite_two,
      [`final_four_${regionKey}`]: picks.final_four,
      [region]: true,
    };
  }

  // Ensure user column is unique and use upsert to update or insert
  const { data, error } = await supabase
    .from("Picks")
    .upsert([insertPayload], { onConflict: "user" });

  if (error) {
    console.error("Error updating/inserting pick:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "Pick updated or added successfully", data });
}
