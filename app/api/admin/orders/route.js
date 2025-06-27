// import db from '@/lib/db';

// export async function GET() {
//   try {
//     const [rows] = await db.query(`
//       SELECT o.id, o.status, o.total_price, o.created_at,
//              u.name AS customer_name, u.email AS customer_email,
//              r.name AS restaurant_name
//       FROM orders o
//       JOIN users u ON o.user_id = u.id
//       JOIN restaurants r ON o.restaurant_id = r.id
//       ORDER BY o.created_at DESC
//     `);
//     return Response.json({ orders: rows });
//   } catch (err) {
//     return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function GET() {
  try {
    const orders = db.orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(o => {
        const user = db.users.find(u => u.id === o.userId);
        const restaurant = db.restaurants.find(r => r.id === o.restaurantId);
        return {
          id: o.id,
          status: o.status,
          total_price: o.totalPrice,
          created_at: o.createdAt,
          customer_name: user?.name,
          customer_email: user?.email,
          restaurant_name: restaurant?.name
        };
      });

    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
