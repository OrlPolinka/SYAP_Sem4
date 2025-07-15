import { useState } from 'react'
import React from "react";
import './App.css'

class Button extends React.Component{
  render(){
    return (
      <button onClick = {this.props.onClick} disabled = {this.props.disabled}>
        {this.props.title}
      </button>
    )
  }
}

class Counter extends React.Component{
constructor(props){
  super(props);
  this.state = {
    count: 0
  };
}

increase = () => {
  if(this.state.count < 5){
    this.setState((prevState) => ({count: prevState.count + 1}));
  }
};

reset = () => {
  this.setState({count: 0});
};

render(){
  return(
    <div className='d1'>
      <h3 className={this.state.count === 5 ? "red-text" : "default-text"}>
        {this.state.count}
      </h3>
      <div>
        <Button
          title = "inc"
          onClick = {this.increase}
          disabled = {this.state.count >= 5}
        />
        <Button
          title = "reset"
          onClick = {this.reset}
          disabled = {this.state.count === 0}
        />
      </div>
    </div>
  )
}
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Counter/>
    </div>
  )
}

export default App
