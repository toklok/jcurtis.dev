export async function onRequestPost({ env, query }) {
  const collectionQuery = `query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      description
      products(first: 30) {
        edges {
          node {
            description
            images(first: 30) {
              edges {
                node {
                  ... on Image {
                    original: url
                    thumbnail: url(transform: {maxWidth: 400, maxHeight: 400})
                    retina: url(transform: {scale: 2})
                    altText
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }  
  `;

  const collectionByHandle = await fetch(env.SHOPIFY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_API,
    },
    body: JSON.stringify({
      query: collectionQuery,
      variables: { handle: "best-sellers" },
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error("Response isn't OK");
      }
    })
    .catch(() => {
      return new Response("Error", { status: 500 });
    });

  return new Response(JSON.stringify(collectionByHandle), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
