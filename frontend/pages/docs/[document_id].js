import { useRouter } from 'next/router'

// This gets called on every request
export async function getServerSideProps(context) {

    const { document_id } = context.params

    // Fetch data from external API
    const res = await fetch(`http://localhost:8888/api/v1/docs/${document_id}`)
    const data = await res.json()

    data.document_id = document_id

    // Pass data to the page via props
    return { props: { data } }
}

const Document = ({data}) => {

    return <div>
        <h1> {data.title} </h1>
        <p>You are seeing document {data.document_id}</p>
        </div>
}

export default Document
