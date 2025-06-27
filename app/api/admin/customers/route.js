// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';
// import { cookies } from 'next/headers';

// export async function GET() {
//   const c =await cookies();
//   if (c.get('role')?.value !== 'admin')
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const [rows] = await pool.query(
//     `SELECT id, name, email FROM users WHERE role_id = 3`
//   );

//   return NextResponse.json({ customers: rows });
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';
import { cookies } from 'next/headers';

export async function GET() {
  const c = cookies();
  if (c.get('role')?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const customers = db.users
      .filter(u => u.roleId === 3)
      .map(u => ({
        id: u.id,
        name: u.name,
        email: u.email
      }));

    return NextResponse.json({ customers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
