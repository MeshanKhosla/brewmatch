export async function GET(request: Request) {
  console.log('Received from', request.url)
  return new Response('Hello world', { status: 200 })
}