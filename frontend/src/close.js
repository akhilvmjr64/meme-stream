import React from 'react'
import './close.css'
import {Link} from 'react-router-dom'
class Close extends React.Component{
  constructor(props){
    super(props)
    this.state={loading:true,output:(<Link to="/" className="close">X</Link>)}
  }
  render(){
    return (
          this.state.output
    )
  }
}

export default Close;
