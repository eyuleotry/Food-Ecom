// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export async function DELETE(req, { params }) {
//   const itemId = params.id;

//   try {
//     await pool.query('DELETE FROM cart_items WHERE id = ?', [itemId]);
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error('Cart DELETE Error:', err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function DELETE(_req, { params }) {
  const itemId = parseInt(params.id);

  const initialLength = db.cartItems.length;
  db.cartItems = db.cartItems.filter(c => c.id !== itemId);

  if (db.cartItems.length === initialLength) {
    return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
