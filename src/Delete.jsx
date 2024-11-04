import React from "react";
import ReactDOM from "react-dom/client";
import './Add.css'
function Delete()
{
    const [ques,setQues] = React.useState({
        name:"",
        genre:""
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
        fetch('http://localhost:5000/dlt',
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
            alert('Question deleted successfully')
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
                <label htmlFor="name">Question to be deleted</label>
                <input
                type="text"
                name="name"
                onChange={handle}
                value={ques.name}
                />
            </div>
            <div className="main">
				<button type="submit" className = "login-button">Delete!</button>
			</div>
        </form>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Delete/>)