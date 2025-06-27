// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import pool from '@/lib/db';

// export const runtime = 'nodejs';

// /**
//  * GET /api/orders
//  * Returns every order that belongs to the currently-logged-in customer.
//  *
//  * Cookie requirements:
//  *   - email   : set at login
//  *   - role    : should be "customer" (optional check)
//  */
// export async function GET() {
//   try {
//     /* ── identify customer from cookie ─────────────────── */
//     const cookieStore = await cookies();                 // ✅ must await
//     const email = cookieStore.get('email')?.value;
//     const role  = cookieStore.get('role')?.value;

//     if (!email || role !== 'customer') {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     /* ── find user_id ──────────────────────────────────── */
//     const [[user] = []] = await pool.query(
//       'SELECT id FROM users WHERE email = ? LIMIT 1',
//       [email]
//     );
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     /* ── fetch customer orders with restaurant names ──── */
//     const [orders] = await pool.query(
//       `SELECT o.id,
//               o.total_price,
//               o.status,
//               o.created_at,
//               r.name AS restaurant_name
//          FROM orders o
//          JOIN restaurants r ON o.restaurant_id = r.id
//         WHERE o.user_id = ?
//         ORDER BY o.created_at DESC`,
//       [user.id]
//     );

//     return NextResponse.json({ orders });
//   } catch (err) {
//     console.error('[API /api/orders] ', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/staticData.js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    const role = cookieStore.get('role')?.value;

    if (!email || role !== 'customer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = db.users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get orders for this user
    const orders = db.orders
      .filter(o => o.userId === user.id)
      .map(order => {
        const restaurant = db.restaurants.find(r => r.id === order.restaurantId);
        return {
          id: order.id,
          total_price: order.totalPrice,
          status: order.status,
          created_at: order.createdAt ?? null, // optional if you don’t have this field
          restaurant_name: restaurant?.name ?? 'Unknown',
        };
      })
      .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error('[API /api/orders]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
