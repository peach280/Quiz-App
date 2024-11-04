import React from "react"
import ReactDOM from "react-dom/client"
import './Admin.css'
function Admin()
{
    const cret=()=>{
        window.location.href="AddQues.html"
    }
    const dret=()=>{
        window.location.href="Delete.html"
    }
    const c = ()=>{
        window.location.href="ac.html"
    }
    const menu = ()=>{
        window.location.href="4.html"
    }
    return(
        <div className="gen">
            <h1>Admin Privileges</h1>
            <div className="button-container">
                <button className="btn" onClick={cret}>Create Questions</button>
                <button className="btn" onClick={dret}>Delete Questions</button>
                <button className="btn" onClick={c}>Change Answers</button>
                <button className="btn1" onClick={menu}>Back to Main Menu</button>
            </div>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Admin/>)