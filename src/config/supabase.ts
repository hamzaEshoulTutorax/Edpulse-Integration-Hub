import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validate URL before creating client
if (!supabaseUrl || !supabaseUrl.startsWith("https://")) {
  throw new Error(
    "Invalid SUPABASE_URL. Must be a valid URL starting with https://"
  );
}

if (!supabaseKey) {
  throw new Error("SUPABASE_SERVICE_KEY is not defined");
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
