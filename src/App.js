import "./App.css";
import AddContest from "./components/contest/AddContest";
import Home from "./components/Home/Home";
import { Routes, Route, Link } from "react-router-dom";
import { Component } from "react";
import ListContest from "./components/contest/ListContest";
import Thankyou from "./components/ThankYou/ThankYou";
import ListAllContest from "./components/contest/ListAllContest";
import RegisterUser from "./components/contest/RegisterUser";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <><RegisterUser /><div>
        
        
      </div></>
    );
  }
}

export default App;
