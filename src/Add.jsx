import React from "react";
import ReactDOM from "react-dom/client";
import './Add.css'
function Add()
{
    const [qData,setQData]=React.useState({
        genre:"",
        name:"",
        options:"",
        answer:""
    })
    function sub(event)
    {
        setQData(prev=>{
            return{
                ...prev,
                [event.target.name]:event.target.value
            }
        })
    }
    function handle(event)
    {
        event.preventDefault()
        console.log(qData)
        fetch('http://localhost:5000/addQues',{
            method:'POST',
            headers:
            {
                "Content-type":"application/json"
            },
           
            body:JSON.stringify(qData)
            
        })
        .then(response=>response.json())
        .then(data=>{
            alert('Question added successfully')
            window.location.href="admin.html"
        })
        .catch(error => {
			console.error('Error:', error);
		});

    }
    return(
        <div className="container">
        <form onSubmit={handle}>
            <div className="main">
                    <label htmlFor="genre">Genre</label>
                    <input
                    type="text"
                    name="genre"
                    onChange={sub}
                    value={qData.genre}
                    />
            </div>
            <div className="main">
                <label htmlFor="name">Question</label>
                <input
                type="text"
                name="name"
                onChange={sub}
                value={qData.name}
                className="options1"
                />
            </div>
            <div className="main">
                <label htmlFor="options">Options seperated by comma</label>
                <input
                type="text"
                name="options"
                onChange={sub}
                value={qData.options}
                className="options"
                />
            </div>
            <div className="main">
                <label htmlFor="answer">Answer</label>
                <input
                type="text"
                name="answer"
                onChange={sub}
                value={qData.answer}
                />
            </div>
            <div className="main">
				<button type="submit" className = "login-button">Add!</button>
			</div>
        </form>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Add/>)