import useSWR from "swr";

export default function Data() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/v1/docs", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data[0].title}!</div>;
}

// import React from "react";

// export default class ApiHandeling extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       loading: false,
//       character: {},
//       firstName: "",
//       lastName: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     this.setState({
//       loading: true,
//     });
//     fetch("https://swapi.dev/api/people/1")
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           character: data,
//           loading: false,
//         });
//       });
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   render() {
//     const text = this.state.loading
//       ? "Loading ...."
//       : this.state.character.name;
//     return (
//       <div>
//         <h1>{text}</h1>
//         <form>
//           <input
//             type="text"
//             placeholder="first name"
//             name="firstName"
//             onChange={this.handleChange}
//           />
//           <input
//             type="text"
//             placeholder="last name"
//             name="lastName"
//             onChange={this.handleChange}
//           />
//           <h1>
//             {this.state.firstName} {this.state.lastName}
//           </h1>
//         </form>
//       </div>
//     );
//   }
// }
