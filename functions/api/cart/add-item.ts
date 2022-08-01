export async function onRequestPost({ request, env, query }) {
  const { cartId, lines } = await request.json();
  const cartAddItemMutation = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            cost {
              totalAmount {
                amount
              }
            }
            totalQuantity
            discountCodes {
              applicable
              code
            }
            lines(first: 5) {
                edges {
                    node {
                        id
                    }
                }
            }
          }
          userErrors {
            field
            message
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
      query: cartAddItemMutation,
      variables: {
        cartId: cartId,
        lines: lines,
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
