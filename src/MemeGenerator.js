import React from "react"

class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            topText: "",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleGenClick = this.handleGenClick.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => this.setState({allMemeImgs: response.data.memes}))
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleGenClick(e){
        // choose random image from this.state.allMemeImgs []
        // setState randomImg: .url
        e.preventDefault()
        const randoNumber = Math.floor(Math.random() * 100) + 1
        const randoImg = this.state.allMemeImgs[randoNumber]
        this.setState({
            randomImg: randoImg.url
        })
    }

    render(){
        return (
            <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText" 
                        placeholder="Top Text"
                        value={this.state.topText} 
                        onChange={this.handleChange} 
                    />

                    <input 
                        type="text"
                        name="bottomText" 
                        placeholder="Bottom Text"
                        value={this.state.bottomText} 
                        onChange={this.handleChange} 
                    />

                    <button onClick={this.handleGenClick}>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>

            </div>
        )
    }
}

export default MemeGenerator