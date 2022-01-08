export async function onRequestPost({ env }) {
  const shopQuery = `query Shopname {
    shop {
      name
    }
  }
  `;

  const name = await fetch(env.SHOPIFY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/graphql",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_API,
    },
    body: shopQuery,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((error) => {
      return new Response("Error", { status: 500 });
    });

  return new Response(JSON.stringify(name), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
