export async function onRequestPost({ request, env, query }) {
  const { quantity, merchandiseId } = await request.json();

  const cartCreateMutation = `mutation createCart($quantity: Int!, $merchandiseId: ID!) {
        cartCreate(input: {lines: [{quantity: $quantity, merchandiseId: $merchandiseId}], attributes: {key: "cart_attribute", value: "This is a cart attribute"}}) {
          cart {
            id
            createdAt
            updatedAt
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
            attributes {
              key
              value
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
      `;

  const cart = await fetch(env.SHOPIFY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_API,
    },
    body: JSON.stringify({
      query: cartCreateMutation,
      variables: {
        quantity: quantity,
        merchandiseId: merchandiseId,
      },
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

  return new Response(JSON.stringify(cart), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
