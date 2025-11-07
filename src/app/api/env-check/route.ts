export async function GET() {
    return Response.json({
        NODE_ENV: process.env.NODE_ENV,
        MY_SECRET: process.env.MY_SECRET,
    });
}