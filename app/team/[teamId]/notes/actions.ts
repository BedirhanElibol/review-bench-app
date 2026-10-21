'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function listNotes(teamId: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('team_notes').select('id, body, created_at').eq('team_id', teamId).order('created_at', { ascending: false });
  return data ?? [];
}

export async function addNote(teamId: string, body: string) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error('Not signed in');
  await supabase.from('team_notes').insert({ team_id: teamId, author_id: auth.user.id, body });
  revalidatePath(`/team/${teamId}/notes`);
}
