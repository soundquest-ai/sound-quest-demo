import Head from "next/head";
import Header from "../components/Header/Header";
import FormContainer from "../components/Search-Results/FormContainer";
import HomeSearch from "../components/Home/HomeSearch";

export default function Search() {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        {/* logos */}
        <Header />
        <FormContainer />
      </main>
    </div>
  );
}
