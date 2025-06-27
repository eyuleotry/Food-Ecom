// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export const runtime = 'nodejs';

// export async function GET() {
//   try {
//     const c =await cookies();
//     if (c.get('role')?.value !== 'admin')
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//     const [rows] = await pool.query(`
//       SELECT v.id, v.business_name, v.description, v.location,
//              u.name, u.email
//         FROM vendors v
//         JOIN users u ON v.user_id = u.id
//       ORDER BY v.created_at DESC
//     `);

//     return NextResponse.json({ vendors: rows });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }


import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function GET() {
  const c = cookies();
  if (c.get('role')?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vendors = db.vendors
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(v => {
      const user = db.users.find(u => u.id === v.userId);
      return {
        id: v.id,
        business_name: v.businessName,
        description: v.description,
        location: v.location,
        name: user?.name,
        email: user?.email
      };
    });

  return NextResponse.json({ vendors });
}
