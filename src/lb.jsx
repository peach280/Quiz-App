import React from "react";
import ReactDOM from "react-dom/client";
import './lb.css'
const Leaderboard = () => {
 

  function handle(cat) {
    window.location.href=`${cat}.html`
  }

  return (
    <div>
      <div className="gen">
        <h1>Select Category</h1>
        <div className="button-container">
          <button className="btn" onClick={() => handle('Sportslb')}>Sports</button>
          <button className="btn" onClick={() => handle('Literaturelb')}>Literature</button>
          <button className="btn" onClick={() => handle('Politicslb')}>Politics</button>
        </div>
      </div>
    </div>
  )
}



ReactDOM.createRoot(document.getElementById("root")).render(<Leaderboard/>)
