import { useRouter } from "next/router";

import RenderData from "../../components/Individual-Data-Page/RenderData";

import Layout from "../../components/Layout/Layout";

// This gets called on every request

//function getData() {
//  console.log("hello");

//  console.log(query);

//  // Fetch data from external API
//  async function ausyncCall(query) {
//    const res = await fetch(`http://localhost:8888/api/v1/docs/${query}`);
//    const data = await res.json();

//    data.document_id = document_id;

//    return <Document data={data} />;
//  }
//}

const Document = () => {
  const Router = useRouter();
  const query = Router.query;

  return (
    <Layout>
      <RenderData query={query} />
    </Layout>
  );
};

export default Document;
