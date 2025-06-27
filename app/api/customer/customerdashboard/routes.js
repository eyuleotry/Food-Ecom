// import { cookies } from 'next/headers';



// // GET /customerdashboard  → JSON (only if cookies are valid)
// export async function GET() {
//   const { get } = await cookies();

//   if (get('login')?.value !== 'true' || get('role')?.value !== 'customer') {
//     // 302 redirect for direct browser hit
//     return new Response(null, { status: 302, headers: { Location: '/' } });
//   }

//   return Response.json({ message: 'Customer API access granted' });
// }


import { cookies } from 'next/headers';
export const runtime = 'nodejs';

export async function GET() {
  const { get } = await cookies();
  if (get('login')?.value !== 'true' || get('role')?.value !== 'customer') {
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }

  return Response.json({ message: 'Customer API access granted' });
}
