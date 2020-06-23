import Link from "next/link";

import Page from "./components";

export default function Home() {
  return (
    <Page title="Home">
      <main>
        <h1 className="title">
          Welcome to the shop, view <Link href="products">catalogue</Link>
        </h1>
      </main>

      <footer>link to social media</footer>
    </Page>
  );
}
