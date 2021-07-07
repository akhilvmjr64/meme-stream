import ReactDOM from 'react-dom'
import './notify.css'
import React from 'react'
class Notify extends React.Component{
    constructor(props){
        super(props)
        this.state ={loading:true,output:""}
    }
    render(){
        return (
            <div id="notify" className={this.props.success?"notify success":"notify fail"}>
                {this.props.arg}<br/>
            </div>
        )
    }
}
export default Notify