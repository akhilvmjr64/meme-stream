import React from 'react'
import './memes.css';
import Button from './button'
import { Link } from 'react-router-dom';
import App from './App'
import logo from './logo.svg'
class Memes extends React.Component{
    constructor(props){
        super(props)
        this.state ={loading:true,output:"",data:""}
        this.datafetch=this.datafetch.bind(this)
    }
    async componentDidMount(){
        await window.loading()
        await this.datafetch()
        await window.loading()
    }
    async datafetch(){
        var data = await fetch(process.env.REACT_APP_BACKEND!=""&&process.env.REACT_APP_BACKEND?process.env.REACT_APP_BACKEND:"http://localhost:8081/memes/")
        data = await data.json()
        data = await data.sort((a,b)=>{return b.id-a.id})
        var output=(
        <div className="App">
            <App />
            <div className="memes">
                {data.map((i)=>{ 
                    return (<div className="meme" key={i.id} id={i.id}>
                                <h2>Author:</h2><p>{i.name}</p>
                                <img src={i.url} alt={i.caption} onError={(e) => {e.target.src=logo}}/>
                                <h3>Caption:</h3><p>{i.caption}</p>
                                <Link className='edit-button' to={{pathname:'/edit',id:i.id}} query={i.id}>edit</Link>
                            </div>) })}
            </div>
            <Button />
        </div>)
        this.setState({loading: true,output: output,data:data})
    }
    render(){
        return <div>
            {this.state.output}
        </div>
    }
}

export default Memes;
