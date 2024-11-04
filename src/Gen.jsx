import React from "react";
import ReactDOM from "react-dom/client";
import './Gen.css'
function Gen()
{
    function handle(cat)
    {
        window.location.href=`${cat}.html`
    }
        
    
    return(
        <div className="gen">
            <h1>Select Category</h1>
            <div className="button-container">
                <button className="btn" onClick={()=>handle('Sports')}>Sports</button>
                <button className="btn" onClick={()=>handle('Literature')}>Literature</button>
                <button className="btn" onClick={()=>handle('Politics')}>Politics</button>
                <button className="btn" onClick={()=>handle('Leaderboard')}>Leaderboard</button>
                <button className="btn" onClick={()=>handle('pp')}>Past Performance</button>
            </div>
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Gen/>)