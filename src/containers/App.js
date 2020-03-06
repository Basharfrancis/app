import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { robots } from "../robots";
import ErrorBoundry from "../components/ErrorBoundry.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robots: [],
      searchfield: ""
    };
  }
  onChangeSearch = event => {
    this.setState({
      searchfield: event.target.value
    });
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }
  render() {
    const filterRobots = this.state.robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">F.R.I.E.N.D.S</h1>
        <SearchBox searchChange={this.onChangeSearch} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}
export default App;
