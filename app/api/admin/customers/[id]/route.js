// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';
// import { cookies } from 'next/headers';

// export async function DELETE(req, { params }) {
//   const c =await cookies();
//   if (c.get('role')?.value !== 'admin')
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const customerId = params.id;
//   try {
//     await pool.query(`DELETE FROM users WHERE id = ? AND role_id = 3`, [customerId]);
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';
import { cookies } from 'next/headers';

export async function DELETE(req, { params }) {
  const c = cookies();
  if (c.get('role')?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const customerId = parseInt(params.id);

  try {

    const index = db.users.findIndex(
      u => u.id === customerId && u.roleId === 3
    );

    if (index === -1) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    db.users.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

