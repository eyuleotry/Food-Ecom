// // /app/api/profile/route.js
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export async function GET(req) {
//   try {
//     // Simulated logged-in user ID; replace with session-based logic
//     const userId = 3;

//     const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
//     const user = userRows[0];

//     return NextResponse.json({ user });
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return NextResponse.json({ user: null }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function GET() {
  try {
    // Simulated logged-in user ID
    const userId = 3;

    const user = db.users.find(u => u.id === userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
