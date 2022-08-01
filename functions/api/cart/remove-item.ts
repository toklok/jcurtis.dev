export async function onRequestPost({ request, env, query }) {
  const { cartId, lineIds } = await request.json();
  const removeItemMutation = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }`;
  const cart = await fetch(env.SHOPIFY_STORE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Shopify-Storefront-Access-Token": env.SHOPIFY_STOREFRONT_API,
    },
    body: JSON.stringify({
      query: removeItemMutation,
      variables: {
        cartId: cartId,
        lineIds: lineIds,
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
