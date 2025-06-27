// import { NextResponse } from 'next/server';
// import pool from '@/lib/db';          // MySQL connection pool

// export const runtime = 'nodejs';      // run on Node.js (not edge)

// /**
//  * GET  /api/restaurants
//  * Returns every restaurant with basic fields used on the home page.
//  * No authentication required (public).
//  */
// export async function GET() {
//   try {
//     const [rows] = await pool.query(
//       `SELECT id,
//               name,
//               location,
//               description,
//               image_url
//          FROM restaurants
//         ORDER BY created_at DESC`
//     );

//     return NextResponse.json({ restaurants: rows });
//   } catch (err) {
//     console.error('[GET_RESTAURANTS_ERROR]', err);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from 'next/server';
import { db } from '@/lib/staticData.js';

export const runtime = 'nodejs';

/**
 * GET /api/restaurants
 * Returns every restaurant with basic fields used on the home page.
 * No authentication required (public).
 */
export async function GET() {
  try {
    const rows = db.restaurants;

    // Optionally sort by newest (simulate created_at)
    const sorted = [...rows].reverse();

    return NextResponse.json({ restaurants: sorted });
  } catch (err) {
    console.error('[GET_RESTAURANTS_ERROR]', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}