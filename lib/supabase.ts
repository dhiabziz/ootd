import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getSupabaseUrl(): string {
  const value = process.env.SUPABASE_URL;
  if (!value) {
    throw new Error('Missing SUPABASE_URL environment variable');
  }
  return value;
}

function getSupabaseServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }
  return value;
}

export function getSupabaseAdmin(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
