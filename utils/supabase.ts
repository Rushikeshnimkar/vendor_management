import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

// Create clients with proper error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (server-side only)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Helper function to get the appropriate client
export function getSupabase() {
  if (!supabaseUrl) {
    throw new Error("Supabase URL is not defined");
  }
  if (typeof window !== "undefined") {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL or anon key is not defined");
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  } else {
    if (!supabaseServiceKey) {
      throw new Error("Supabase service key is not defined");
    }
    return createClient(supabaseUrl, supabaseServiceKey);
  }
}
