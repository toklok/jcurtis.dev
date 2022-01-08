export async function onRequestPost({ request }) {
  return new Response(JSON.stringify(request.cf.city), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
