import React from "react";
import ReactDOM from "react-dom/client"
import './pp.css'
function Pp()
{
    const[pp,setPp] = React.useState([])
    React.useEffect(()=>{
        const userr = localStorage.getItem('user')
        console.log(userr)
        fetch("http://localhost:5000/lb?genre=Literature")
        .then(res=>res.json())
        .then(data=>setPp(data))
    },[])
    return(
        <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {pp.map((entry, index) => (
            <tr key={entry.username}>
              <td>{index + 1}</td>
              <td>{entry.username}</td>
              <td>{entry.points}</td>
              <td>{entry.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Pp/>)