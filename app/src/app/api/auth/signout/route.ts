import { signOut } from '@/lib/auth/auth';

export async function POST() {
  await signOut({ redirectTo: '/' });
}
