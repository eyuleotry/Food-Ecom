// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export async function GET() {
//   try {
//     const email =await cookies().get('email')?.value;
//     if (!email) return NextResponse.json({ count: 0 });

//     const [[user] = []] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
//     if (!user) return NextResponse.json({ count: 0 });

//     const [[result]] = await pool.query(
//       'SELECT COUNT(*) AS count FROM cart_items WHERE user_id = ?',
//       [user.id]
//     );

//     return NextResponse.json({ count: result.count });
//   } catch (err) {
//     console.error('Error getting cart count:', err);
//     return NextResponse.json({ count: 0 });
//   }
// }


import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function GET() {
  try {
    const email = cookies().get('email')?.value;
    if (!email) return NextResponse.json({ count: 0 });

    const user = db.users.find(u => u.email === email);
    if (!user) return NextResponse.json({ count: 0 });

    const count = db.cartItems.filter(c => c.userId === user.id).length;
    return NextResponse.json({ count });
  } catch (err) {
    console.error('Error getting cart count:', err);
    return NextResponse.json({ count: 0 });
  }
}
