import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulpskwbyprcgcwctfqbp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVscHNrd2J5cHJjZ2N3Y3RmcWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzM3MjMsImV4cCI6MjA4NjY0OTcyM30.H4SJlcC0VuJTcuabMMZRHy-ABQrIwh0VgMHDAVbnChg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
