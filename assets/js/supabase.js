// Configuração do Supabase
const SUPABASE_URL = 'DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.euuytczfutrnyhxnfxin.supabase.co:5432/postgres';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dXl0Y3pmdXRybnloeG5meGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNDc5OTMsImV4cCI6MjA3NDcyMzk5M30.WzlcYYGxxpzAuHmE-vvhSTz01msRX5bTC3_5DpJK42s';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);