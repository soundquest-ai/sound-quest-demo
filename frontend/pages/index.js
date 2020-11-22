import Head from "next/head";
import Header from "../components/Header/Header";
import HomeSearch from "../components/Home/HomeSearch";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        {/* logos */}
        <Header />
        <HomeSearch />
      </main>
    </div>
  );
}
