import React from "react";
import ReactDOM from "react-dom/client";
import './Add.css'
function ChangeAns()
{
    const [ques,setQues] = React.useState({
        name:"",
        genre:"",
        answer:""
    })
    function handle(event)
    {
        setQues(prev=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }
    function sub(event)
    {
        event.preventDefault()
        fetch('http://localhost:5000/change',
        {
            method:'POST',
            headers:
            {
                "Content-type":"application/json"
            },
           
            body:JSON.stringify(ques)
        })
        .then(response=>response.json)
        .then(data=>{
            alert('Answer changed successfully')
            window.location.href="admin.html"})
        .catch(error=>{'error:',error})
    }
    return(
        <div className="container">
        <form onSubmit={sub}>
            <div className="main">
                    <label htmlFor="genre">Genre</label>
                    <input
                    type="text"
                    name="genre"
                    onChange={handle}
                    value={ques.genre}
                    />
            </div>
            <div className="main">
                <label htmlFor="name">Question</label>
                <input
                type="text"
                name="name"
                onChange={handle}
                value={ques.name}
                className="options1"
                />
            </div>
            <div className="main">
                <label htmlFor="answer">Changed Answer</label>
                <input
                type="text"
                name="answer"
                onChange={handle}
                value={ques.answer}
                />
            </div>
            <div className="main">
				<button type="submit" className = "login-button">Change!</button>
			</div>
        </form>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<ChangeAns/>)