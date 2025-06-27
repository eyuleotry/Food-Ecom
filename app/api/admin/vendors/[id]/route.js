// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';

// export const runtime = 'nodejs';

// export async function DELETE(req, { params }) {
//   const cookieStore = await cookies();
//   if (cookieStore.get('role')?.value !== 'admin') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const vendorId = params.id;
//   if (!vendorId) {
//     return NextResponse.json({ error: 'Vendor ID required' }, { status: 400 });
//   }

//   try {
//     /* 1️⃣ Find the vendor’s user_id */
//     const [[vendor] = []] = await pool.query(
//       'SELECT user_id FROM vendors WHERE id = ? LIMIT 1',
//       [vendorId]
//     );

//     if (!vendor) {
//       return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
//     }

//     /* 2️⃣ Delete the user row.
//           ON DELETE CASCADE on vendors.user_id  → vendors row vanishes,
//           and all restaurants/menu_items/orders linked to that vendor are
//           cleaned up automatically. */
//     await pool.query('DELETE FROM users WHERE id = ?', [vendor.user_id]);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error('[DELETE_VENDOR_ADMIN]', err);
//     return NextResponse.json({ error: 'Failed to delete vendor' }, { status: 500 });
//   }
// }




import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function DELETE(_req, { params }) {
  const cookieStore = cookies();
  if (cookieStore.get('role')?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const vendorId = parseInt(params.id);
  if (!vendorId) {
    return NextResponse.json({ error: 'Vendor ID required' }, { status: 400 });
  }

  const vendor = db.vendors.find(v => v.id === vendorId);
  if (!vendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }

  // Delete all restaurants linked to this vendor
  const restaurantIds = db.restaurants
    .filter(r => r.vendorId === vendorId)
    .map(r => r.id);

  db.menuItems = db.menuItems.filter(mi => !restaurantIds.includes(mi.restaurantId));
  db.orders = db.orders.filter(o => !restaurantIds.includes(o.restaurantId));
  db.restaurants = db.restaurants.filter(r => r.vendorId !== vendorId);

  // Delete the vendor and their user
  db.vendors = db.vendors.filter(v => v.id !== vendorId);
  db.users = db.users.filter(u => u.id !== vendor.userId);

  return NextResponse.json({ success: true });
}
