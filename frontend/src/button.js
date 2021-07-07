import React from 'react'
import './button.css'
import {Link} from 'react-router-dom'
class Button extends React.Component{
  constructor(props){
    super(props)
    this.state={loading:true,output:(<Link to="/entry" className="add">+</Link>)}
  }
  render(){
    return (
          this.state.output
    )
  }
}

export default Button;
