-- Adiciona colunas de streak na tabela profiles (streak de dias seguidos)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_streak integer DEFAULT 0;
