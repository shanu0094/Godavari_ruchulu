import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ikmgfehsmwsfixishfqt.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrbWdmZWhzbXdzZml4aXNoZnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDE1MTMsImV4cCI6MjA4OTQ3NzUxM30.3k4UoUqk-Q9GJKD8mvAeKUu3p_xY6fiLhclI839BCmU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
