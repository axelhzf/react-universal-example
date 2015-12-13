import React from "react";
import { Link } from 'react-router'

export default class App extends React.Component {
  render() {
    return (<div>
      <h1>React universal example</h1>
      <nav>
       <ul>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/about">About</Link></li>
       </ul>
      </nav>

      <div>{this.props.children}</div>
    </div>);
  }
}