import React from 'react';


export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h3>Welcome to bnorth</h3>
        <button onClick={()=>{this.props.container.actions.test()}}>welcome</button>
      </div>
    )
  }
}