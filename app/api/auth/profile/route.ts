import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUsers, updateUser } from '@/lib/users';
import { profileSchema } from '@/lib/validations';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const user = getUsers().find((u) => u.id === session.userId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { passwordHash, ...profile } = user;
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const validation = profileSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
  }

  const user = getUsers().find((u) => u.id === session.userId);
  
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser = {
    ...user,
    ...validation.data,
  };

  updateUser(updatedUser);

  const { passwordHash, ...profile } = updatedUser;
  return NextResponse.json(profile);
}
