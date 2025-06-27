// import pool from '@/lib/db';

// export const runtime = 'nodejs';

// export async function POST(request) {
//   try {
//     const { name, email, password, role } = await request.json();

//     if (!name || !email || !password || !role) {
//       return new Response(
//         JSON.stringify({ error: 'Name, email, password and role are required' }),
//         { status: 400 }
//       );
//     }

//     const [roleRows] = await pool.query(
//       'SELECT id FROM roles WHERE role_name = ? LIMIT 1',
//       [role]
//     );

//     if (roleRows.length === 0) {
//       return new Response(
//         JSON.stringify({ error: 'Invalid role selected' }),
//         { status: 400 }
//       );
//     }

//     const roleId = roleRows[0].id;

//     const [dupRows] = await pool.query(
//       'SELECT id FROM users WHERE email = ? LIMIT 1',
//       [email]
//     );
//     if (dupRows.length > 0) {
//       return new Response(
//         JSON.stringify({ error: 'Email already in use' }),
//         { status: 409 }
//       );
//     }

//     await pool.query(
//       `INSERT INTO users (name, email, password_hash, role_id)
//        VALUES (?, ?, ?, ?)`,
//       [name, email, password, roleId]
//     );

//     return new Response(
//       JSON.stringify({ message: 'Registration successful!' }),
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error(err);
//     return new Response(
//       JSON.stringify({ error: 'Internal server error' }),
//       { status: 500 }
//     );
//   }
// }




import { db } from '@/lib/staticData.js';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: 'Name, email, password and role are required' }),
        { status: 400 }
      );
    }

    const roleEntry = db.roles.find(r => r.roleName === role);
    if (!roleEntry) {
      return new Response(
        JSON.stringify({ error: 'Invalid role selected' }),
        { status: 400 }
      );
    }

    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email already in use' }),
        { status: 409 }
      );
    }

    // Create new user (simple auto-increment)
    const newId = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1;

    db.users.push({
      id: newId,
      name,
      email,
      passwordHash: password, // note: in real app, hash this
      roleId: roleEntry.id,
    });

    return new Response(
      JSON.stringify({ message: 'Registration successful!' }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
