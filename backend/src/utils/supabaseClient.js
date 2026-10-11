// Load environment variables from .env if not already loaded
import 'dotenv/config'; // Or: require('dotenv').config();

import { createClient } from '@supabase/supabase-js';

// Use backend-appropriate variable names
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY; // or SUPABASE_SERVICE_ROLE_KEY for admin

// Throw clear errors if variables are missing
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is required.');
}
if (!supabaseKey) {
  throw new Error('SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) environment variable is required.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
