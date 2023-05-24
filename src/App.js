import React from 'react';
// import Child from './Child';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      name: 'Stepan',
      age: 25,
      isShow: false,
      buttonText: 'show'
    }
  }

// при нажатии 'Stepan' поменяется на 'Mykola', а 25 поменяется на 30.
  setAge=()=>{
    this.setState({name: 'Mykola', age:30})
  }

  changeState=()=>{
    this.setAge()
    this.setState({isShow: !this.state.isShow})
    this.state.buttonText==='show'?this.setState({buttonText: 'hide'}):
    this.setState({buttonText: 'show'})
  }

  render(){
  return (
    <>
    <div className="App">
      <h1>HW1 JSX, Props, State</h1>
        {this.state.isShow && <p>Name: {this.state.name}, age: {this.state.age}</p>}
        <button onClick={this.changeState}>{this.state.buttonText}</button>
    </div>

    </>
  );
  }
}

export default App;