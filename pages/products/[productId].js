import Link from "next/link";

import Page from "../components";

export async function getStaticProps(context) {
  console.log("context: ", context);
  // const router = useRouter();
  const { productId } = context.params;

  return {
    props: {
      productId,
      content: "some content for: " + productId,
    },
  };
}

export async function getStaticPaths() {
  // can do a fetch here to get list of possible product Id's

  return {
    paths: [{ params: { productId: "0" } }, { params: { productId: "1" } }],
    fallback: true,
  };
}

export default ({ ...props }) => {
  const { productId, content } = props;

  return (
    <Page title="Product title">
      <h1>Product page: {productId}</h1>
      <p>{content}</p>
      <Link href="/products">catalogue</Link>
    </Page>
  );
};
