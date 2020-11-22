import Head from "next/head";
import Data from "../components/Individual-Data-Page/RenderData";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        <Data />
      </main>
    </div>
  );
}
