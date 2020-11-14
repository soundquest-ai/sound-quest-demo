// export default function Search() {
//   const fetcher = (url) => fetch(url).then((res) => res.json());
//   const { data, error } = useSWR("/api/v1/docs", fetcher);

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <div>hello {data[0].title}!</div>;
// }

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default class Search extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });

//     const { data, error } = useSWR("/api/v1/docs", fetcher);

//     if (error) return <div>failed to load</div>;
//     if (!data) return <div>loading...</div>;
//     if (data[0].title === this.state.value) {
//       return <div>hello {data[0].title}!</div>;
//     }
//   }

//   handleSubmit(event) {
//     alert("A name was submitted: " + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// export default class Search extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       search: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     this.setState({
//       loading: true,
//     });
//   }

//   handleChange(event) {
//     const { title, value } = event.target;
//     this.setState({
//       [title]: value,
//     });
//   }

//   render() {
//     const text = this.state.loading ? "Loading ...." : this.state.search;
//     return (
//       <div>
//         <form>
//           <input
//             type="text"
//             placeholder="search"
//             name="search"
//             value={this.search}
//             onChange={this.handleChange}
//           />
//         </form>
//         <h1>{text}</h1>
//       </div>
//     );
//   }
// }
