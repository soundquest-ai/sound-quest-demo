import { Component } from "react";
import FormComponent from "./FormComponent";

export default class searchResultMain extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  // componentDidMount() {
  //   fetch();
  // }

  render() {
    return <FormComponent data={this.state} />;
  }
}
