import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação de Segurança
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ ERRO CRÍTICO: Faltou a chave NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);