import Layout from "../../components/Layout/Layout";
import SearchResult from "../../components/Search-Results/SearchResult";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();
  const { search } = router.query;

  return (
    <Layout>
      {" "}
      <SearchResult search={search} />
    </Layout>
  );
}

//Search.getInitialProps = async (ctx) => {
//  const { query } = ctx;
//  const response = await fetch(`/api/v1/filter?filter=${query.search}`);
//  console.log(response);
//  const search = await response.json();
//  console.log(search);
//  return { search: search };
//};

export default Search;
