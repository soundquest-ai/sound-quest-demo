import Head from "next/head";
import Header from "../../components/Header/Header";
import FormContainer from "../../components/Search-Results/FormContainer";

function Search({ search }) {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        <Header />
        <FormContainer search={search} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { search } = context.query;
  return { props: { search } };
};

export default Search;
