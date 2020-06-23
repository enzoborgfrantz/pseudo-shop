import Head from "next/head";
import Link from "next/link";

const Page = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Link href="/">Home</Link>
    <br />
    {children}
  </>
);

export default Page;
