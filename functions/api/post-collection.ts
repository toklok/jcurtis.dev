export async function onRequestPost({ env, query }) {
  const collectionQuery = `query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      description
      products(first: 5) {
        edges {
          node {
            description
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const collectionByHandle = await fetch(env.SHOPIFY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_API,
    },
    body: JSON.stringify({
      query: collectionQuery,
      variables: { "handle": "best-sellers" },
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error("Response isn't OK");
      }
    })
    .catch((error) => {
      return new Response("Error", { status: 500 });
    });

  return new Response(JSON.stringify(collectionByHandle), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
