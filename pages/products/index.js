import Link from "next/link";

import Page from "../components";

export async function getStaticProps() {
  return {
    props: {
      products: [
        {
          id: 1,
          title: "t-shirt",
        },
        {
          id: 2,
          title: "trousers",
        },
      ],
    },
  };
}

export default ({ products }) => (
  <Page title="Catalogue">
    <h1>catalogue</h1>
    {Object.entries(products).map(([key, value]) => (
      <>
        <Link href={`/products/${key}`}>{value.title}</Link>
        <br />
      </>
    ))}
  </Page>
);
