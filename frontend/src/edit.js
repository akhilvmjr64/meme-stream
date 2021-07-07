import React,{useState,useEffect} from 'react'
import Close from './close'
import './edit.css'
import Notify from './notify'

var setId = (e,meme) => {
    meme.id_temp=e.target.value
    return meme
}
var setName = (e,meme) => {
    meme.name_temp=e.target.value
    return meme
}

var setCaption = (e,meme) => {
    meme.caption=e.target.value
    return meme
}
var setUrl = (e,meme) => {
    meme.url=e.target.value
    return meme
}





class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state={id: props.location.id,meme:{},}
        this.submit = this.submit.bind(this);
    }
    async componentDidMount(){
        await window.loading()        
        if(this.state.id){
            var meme = await fetch((process.env.REACT_APP_BACKEND!=""&&process.env.REACT_APP_BACKEND?process.env.REACT_APP_BACKEND:"http://localhost:8081/memes/")+this.state.id)
            meme = await meme.json()
            await this.setState({id: this.state.id, id_temp:meme.id,meme: meme,name_temp:meme.name})
        }
        await window.loading()
    }

    async submit(data){
        await window.loading()
        if(data["id_temp"]){
            data.id=await data.id_temp
            data.name=await data.name_temp
            await delete data["id_temp"]
            await delete data["name_temp"]
        }
        if(data["id"]&&data["name"]&&data["caption"]&&data["url"]){
            await fetch((process.env.REACT_APP_BACKEND!=""&&process.env.REACT_APP_BACKEND?process.env.REACT_APP_BACKEND:"http://localhost:8081/memes/")+data.id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',                                                              
                body: JSON.stringify(data)
                })
            this.setState({meme: data, out: 'Your changes are saved ! '+data.name,success: true})
            document.getElementById('notify').style.display='block'
        }
        else{
            this.setState({meme: data, out: "Input fields can't be empty", success: false, display: true})
            document.getElementById('notify').style.display='block'
        }
        await setTimeout(()=>{document.getElementById('notify').style.display='none'},5*1000)
        await window.loading()
    }

    render(){
        return (
        <div className="form">
            <Close/>
            <iframe name="output" className="output"></iframe>
            <form  onSubmit={() => {this.setState(this.submit(this.state.meme));}} target="output">
                <h1>Edit Meme</h1>
                <p>Your Meme id:</p>
                <input autocomplete="off" name="caption" type="text" onChange={(e) => this.setState(setId(e,this.state.meme))} disabled={this.state.meme.id} value={this.state.meme.id?this.state.meme.id:this.state.meme.id_temp}  placeholder="Enter Id for meme" hint="Enter Caption for meme"/><br/>
                <p>Meme author name:</p>
                <input autocomplete="off" name="caption" type="text" onChange={(e) => this.setState(setName(e,this.state.meme))} disabled={this.state.meme.id} value={this.state.meme.id?this.state.meme.name:this.state.meme.name_temp}  placeholder="Enter Author name" hint="Enter Caption for meme"/><br/>
                <p>Caption:</p>
                <input autocomplete="off" name="caption" type="text" onChange={(e) => this.setState(setCaption(e,this.state.meme))} value={this.state.meme.caption}  placeholder="Enter Caption for meme" hint="Enter Caption for meme"/><br/>
                <p>URL:</p>
                <input autocomplete="off" name="url" type="url" onChange={(e) => this.setState(setUrl(e,this.state.meme))}  value={this.state.meme.url}  placeholder="Enter the URL for meme" hint="Enter the URL for meme"/><br/>
                <input type="submit" value="Save Changes"/>
                <br/>
                <Notify arg={this.state.out} success={this.state.success}/>
            </form>
        </div>)
    }
}
export default Edit;