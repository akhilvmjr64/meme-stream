import React from 'react'
import Close from './close'
import './form.css'
import Notify from './notify'

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

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state={meme:{}}
        this.submit = this.submit.bind(this);
    }
    async submit(data){
        if(data["name_temp"]){
            data.name=await data.name_temp
            await delete data["name_temp"]
        }
        if(data["name"]&&data["caption"]&&data["url"]){
            if(data["url"].match(/\.(jpeg|jpg|gif|png)$/) != null){
                await fetch(process.env.REACT_APP_BACKEND!=""&&process.env.REACT_APP_BACKEND?process.env.REACT_APP_BACKEND:"http://localhost:8081/memes/", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',                                                              
                    body: JSON.stringify(data)
                    })
                this.setState({meme: data, out: 'Your Meme is added ! '+data.name,success: true})
                document.getElementById('notify').style.display='block'
            }
            else{
                this.setState({meme: data, out: "URL must be an image ! "+data.name, success: false, display: true})
                document.getElementById('notify').style.display='block'
            }
        }
        else{
            this.setState({meme: data, out: "Input fields can't be empty", success: false, display: true})
            document.getElementById('notify').style.display='block'
        }
        await setTimeout(()=>{document.getElementById('notify').style.display="none"},5*1000)
    }

    render(){
        return (
        <div className="form">
            <Close/>
            <iframe name="output" className="output"></iframe>
            <form  id="form" onSubmit={() => {this.setState(this.submit(this.state.meme));}} target="output">
            <h1>Add Meme</h1>
            <p>Your name:</p>
            <input name="caption" autocomplete="off" type="text" onChange={(e) => this.setState(setName(e,this.state.meme))} value={this.state.meme.id?this.state.meme.name:this.state.meme.name_temp}  placeholder="Enter Author name" hint="Enter Caption for meme"/><br/>
            <p>Caption:</p>
            <input name="caption" autocomplete="off" type="text" onChange={(e) => this.setState(setCaption(e,this.state.meme))} value={this.state.meme.caption}  placeholder="Enter Caption for meme" hint="Enter Caption for meme"/><br/>
            <p>URL:</p>
            <input name="url" type="url" autocomplete="off" onChange={(e) => this.setState(setUrl(e,this.state.meme))}  value={this.state.meme.url}  placeholder="Enter the URL for meme" hint="Enter the URL for meme"/><br/>
            <input type="submit" value="Add meme"/>
            <Notify arg={this.state.out} success={this.state.success}/>
            <br/>
        </form>
        </div>)
    }
}
export default Form;