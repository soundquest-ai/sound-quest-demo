import Head from "next/head";
import Header from "../components/Header/Header";
import Form from "../components/Form/FormContainer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        {/* logos */}
        <Header />

        {/* search section */}
        <Form />
      </main>
    </div>
  );
}
