// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export const runtime = 'nodejs';

// /* ── GET: fetch admin info ───────────────────────────── */
// export async function GET() {
//   const c = await cookies();                                // await!
//   const email = c.get('email')?.value;
//   const role  = c.get('role')?.value;

//   if (!email || role !== 'admin')
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const [[admin] = []] = await pool.query(
//     `SELECT u.id, u.name, u.email, r.role_name AS role, u.created_at
//        FROM users u
//        JOIN roles r ON u.role_id = r.id
//       WHERE u.email = ?
//       LIMIT 1`,
//     [email]
//   );

//   if (!admin) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//   return NextResponse.json({ admin });
// }

// /* ── PUT: update name / password ─────────────────────── */
// export async function PUT(req) {
//   const c = await cookies();
//   const email = c.get('email')?.value;
//   const role  = c.get('role')?.value;

//   if (!email || role !== 'admin')
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const { name, password } = await req.json();
//   if (!name && !password)
//     return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

//   /* build dynamic SQL */
//   const fields = [];
//   const vals   = [];
//   if (name)      { fields.push('name = ?');          vals.push(name); }
//   if (password)  { fields.push('password_hash = ?'); vals.push(password); }
//   vals.push(email);

//   await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE email = ?`, vals);
//   return NextResponse.json({ message: 'Profile updated' });
// }




import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export const runtime = 'nodejs';

export async function GET() {
  const c = cookies();
  const email = c.get('email')?.value;
  const role = c.get('role')?.value;

  if (!email || role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = db.users
    .filter(u => u.email === email)
    .map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: 'admin',
      created_at: u.createdAt
    }))[0];

  if (!admin) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ admin });
}

export async function PUT(req) {
  const c = cookies();
  const email = c.get('email')?.value;
  const role = c.get('role')?.value;

  if (!email || role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, password } = await req.json();
  if (!name && !password) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const user = db.users.find(u => u.email === email);
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (name) user.name = name;
  if (password) user.passwordHash = password;

  return NextResponse.json({ message: 'Profile updated' });
}
