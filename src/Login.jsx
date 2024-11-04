import React from "react";
import ReactDOM from "react-dom/client"
import './index.css'
function Login()
{
	const[logData,setLogData]=React.useState({
		username:"",
		password:""
	})
	const[user,setUser] = React.useState("")
    function sub(event)
    {
		
       	setLogData(prev=>{
		return{
			...prev,
			[event.target.name]:event.target.value
			
		}
		
	   })
	  
    }
	function sub1(event) {
		event.preventDefault();
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: 
			{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(logData)
		})
		.then(response => response.json())
		.then(data => {console.log(data)
			setUser(data.id)
			localStorage.setItem('user',data.id)
			if(data.number) {
				const userId = data.number;
				fetch('http://localhost:5000/admin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ id: userId })
				})
				.then(response => response.json())
				.then(adminData => {
					if(adminData.message==="You are admin")
					{
						alert("You are being redirected to the admin page!")
						window.location.href="admin.html"
						
					}
					
					else
					{
						alert('Successfully logged in');
						window.location.href = "4.html";
					}
				})
	
				
			} else {
				alert('Invalid username or password');
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});
	}
	
	
    return(
        <div className="container">
		<h2 className="form-group">Login</h2>
		<form onSubmit={sub1}>
			<div className="form-group">
				<label htmlFor="username">Username:</label>
				<input 
				type="text" 
				name="username" 
				onChange={sub}
				value={logData.username}
				required/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password:</label>
				<input 
				type="password" 
				name="password" 
				onChange={sub}
				value={logData.password}
				required/>
			</div>

			<div className="form-group">
				<button type="submit" className = "login-button">Login</button>
			</div>
           
		</form>
	    </div>
    )
    
}
ReactDOM.createRoot(document.getElementById("root")).render(<Login/>)