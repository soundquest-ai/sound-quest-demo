import Head from "next/head";
import Header from "../../components/Header/Header";
import SearchResult from "../../components/Search-Results/SearchResult";

function Search({ search }) {
  return (
    <div>
      <Head>
        <title>SoundQuest</title>
      </Head>
      <main>
        <Header />
        <SearchResult search={search} />
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { search } = context.query;
  return { props: { search } };
};

export default Search;
