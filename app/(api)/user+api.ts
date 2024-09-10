//In EXPO a blank space is covered by + sign and not any underscore _ or any symols
import { neon } from '@neondatabase/serverless';



export async function POST(params: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`)
        const { name, email, clerkId } = await params.json()

        if (!name || !email || !clerkId) {
            return Response.json({ error: "All fields are required", status: 400 })
        }

        const response = await sql`INSERT INTO users 
            (
                name,
                email,
                clerk_id
            ) VALUES (
                ${name},
                ${email},
                ${clerkId} 
            )`;
        return new Response(JSON.stringify({ data: response, status: 201 }))
    } catch (error) {
        console.log(error)
        return Response.json({ error: error, status: 500 })
    }
}
