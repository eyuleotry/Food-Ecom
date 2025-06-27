// import db from '@/lib/db';

// export async function DELETE(req, { params }) {
//   const { id } = params;
//   try {
//     // First delete order_items related to the order
//     await db.query(`DELETE FROM order_items WHERE order_id = ?`, [id]);

//     // Then delete the order itself
//     await db.query(`DELETE FROM orders WHERE id = ?`, [id]);

//     return Response.json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     return Response.json({ error: 'Failed to delete order' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function DELETE(req, { params }) {
  const { id } = params;
  const orderId = parseInt(id);

  try {
    // Remove all order_items linked to this order
    db.orderItems = db.orderItems.filter(oi => oi.orderId !== orderId);

    // Remove the order itself
    const initialLength = db.orders.length;
    db.orders = db.orders.filter(o => o.id !== orderId);

    if (db.orders.length === initialLength) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}