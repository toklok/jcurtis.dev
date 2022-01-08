import type { FunctionalComponent } from "preact";
import { h } from "preact";

const data = fetch("https://jcurtis.dev/api/get-location").then((response) =>
  response.json()
);

console.log(data);

export default Location;
