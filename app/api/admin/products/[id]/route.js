// import  db  from '@/lib/db';

// export async function DELETE(req, { params }) {
//   const { id } = params;

//   try {
//     // Optional: Check if product exists first
//     await db.query(`DELETE FROM menu_items WHERE id = ?`, [id]);
//     return Response.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     return Response.json({ error: 'Failed to delete product' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function DELETE(_req, { params }) {
  const { id } = params;
  const itemId = parseInt(id);

  const index = db.menuItems.findIndex(mi => mi.id === itemId);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  db.menuItems.splice(index, 1);

  return NextResponse.json({ message: 'Product deleted successfully' });
}
