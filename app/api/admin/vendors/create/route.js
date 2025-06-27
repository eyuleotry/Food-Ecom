// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';
//       // ensure installed

// export const runtime = 'nodejs';

// export async function POST(req) {
//   try {
//     const c =await cookies();
//     if (c.get('role')?.value !== 'admin')
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//     const { name, email, password, business_name, description, location } = await req.json();
//     if (!name || !email || !password || !business_name)
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

//     /* 1️⃣  Insert user */
  
//     const [userResult] = await pool.query(
//       `INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, 2)`,
//       [name, email, password]
//     );

//     /* 2️⃣  Insert vendor */
//     const [vendorResult] = await pool.query(
//       `INSERT INTO vendors (user_id, business_name, description, location)
//        VALUES (?, ?, ?, ?)`,
//       [userResult.insertId, business_name, description, location]
//     );

//     return NextResponse.json({
//       vendor: {
//         id: vendorResult.insertId,
//         business_name,
//         description,
//         location,
//         name,
//         email
//       }
//     }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     if (err.code === 'ER_DUP_ENTRY')
//       return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }


import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export async function POST(req) {
  const c = cookies();
  if (c.get('role')?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, email, password, business_name, description, location } = await req.json();
  if (!name || !email || !password || !business_name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Check for duplicate email
  if (db.users.find(u => u.email === email)) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  const newUserId = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
  const newVendorId = db.vendors.length ? Math.max(...db.vendors.map(v => v.id)) + 1 : 1;

  db.users.push({
    id: newUserId,
    name,
    email,
    passwordHash: password,
    roleId: 2,
    createdAt: new Date().toISOString()
  });

  db.vendors.push({
    id: newVendorId,
    userId: newUserId,
    businessName: business_name,
    description,
    location,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({
    vendor: {
      id: newVendorId,
      business_name,
      description,
      location,
      name,
      email
    }
  }, { status: 201 });
}
