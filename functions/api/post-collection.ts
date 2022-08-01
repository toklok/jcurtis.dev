export async function onRequestPost({ request, env, query }) {
  const { handle } = await request.json();

  const collectionQuery = `query GetCollection($handle: String!) {
    collectionByHandle(handle: $handle) {
      description
      products(first: 5) {
        edges {
          node {
            id
            description
            images(first: 5) {
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
      variables: { handle: handle },
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
