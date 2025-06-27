// // app/api/cart/route.js
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';
// import { cookies } from 'next/headers';

// export const runtime = 'nodejs';

// /* ─────────────────────────────────────────────── GET  /api/cart */
// export async function GET() {
//   try {
//     const cookieStore = await cookies();                       // ✅ await
//     const email = cookieStore.get('email')?.value;
//     if (!email) return NextResponse.json({ cart: [] });        // not logged in → empty

//     /* find user */
//     const [[user] = []] = await pool.query(
//       'SELECT id FROM users WHERE email = ? LIMIT 1',
//       [email]
//     );
//     if (!user) return NextResponse.json({ cart: [] });

//     /* grab cart items with menu details */
//     const [items] = await pool.query(
//       `SELECT ci.id,
//               ci.quantity,
//               mi.id   AS menu_item_id,
//               mi.name,
//               mi.price,
//               mi.image_url
//          FROM cart_items ci
//          JOIN menu_items mi ON ci.menu_item_id = mi.id
//         WHERE ci.user_id = ?`,
//       [user.id]
//     );

//     return NextResponse.json({ cart: items });
//   } catch (err) {
//     console.error('[CART_GET]', err);
//     return NextResponse.json({ cart: [] }, { status: 500 });
//   }
// }

// /* ─────────────────────────────────────────────── POST /api/cart
//    body: { menu_item_id, quantity }
// */
// export async function POST(req) {
//   try {
//     const { menu_item_id, quantity = 1 } = await req.json();

//     const cookieStore = await cookies();
//     const email = cookieStore.get('email')?.value;
//     if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//     const [[user] = []] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
//     if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

//     /* upsert */
//     const [[existing] = []] = await pool.query(
//       'SELECT id FROM cart_items WHERE user_id = ? AND menu_item_id = ?',
//       [user.id, menu_item_id]
//     );

//     if (existing) {
//       await pool.query(
//         'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
//         [quantity, existing.id]
//       );
//     } else {
//       await pool.query(
//         'INSERT INTO cart_items (user_id, menu_item_id, quantity) VALUES (?, ?, ?)',
//         [user.id, menu_item_id, quantity]
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error('[CART_POST]', err);
//     return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
//   }
// }


import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function GET() {
  try {
    const email = cookies().get('email')?.value;
    if (!email) return NextResponse.json({ cart: [] });

    const user = db.users.find(u => u.email === email);
    if (!user) return NextResponse.json({ cart: [] });

    const cart = db.cartItems
      .filter(ci => ci.userId === user.id)
      .map(ci => {
        const item = db.menuItems.find(mi => mi.id === ci.menuItemId);
        return {
          id: ci.id,
          quantity: ci.quantity,
          menu_item_id: item?.id,
          name: item?.name,
          price: item?.price,
          image_url: item?.imageUrl
        };
      });

    return NextResponse.json({ cart });
  } catch (err) {
    console.error('[CART_GET]', err);
    return NextResponse.json({ cart: [] }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { menu_item_id, quantity = 1 } = await req.json();
    const email = cookies().get('email')?.value;

    if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = db.users.find(u => u.email === email);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const existing = db.cartItems.find(
      ci => ci.userId === user.id && ci.menuItemId === menu_item_id
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      const newId = db.cartItems.length
        ? Math.max(...db.cartItems.map(c => c.id)) + 1
        : 1;

      db.cartItems.push({
        id: newId,
        userId: user.id,
        menuItemId: menu_item_id,
        quantity
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[CART_POST]', err);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
