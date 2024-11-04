import React from "react";
import ReactDOM from "react-dom/client";
import './Reg.css'
function Register()
{
    const [formData,setFormData] = React.useState({
        username:"",
        email:"",
        password:""
    })
    const[user,setUser] = React.useState("")
    function handleChange(event)
    {
        const {name,value} = event.target
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [name] : value
            }
            
        })
    }
    function handleSubmit(event)
    {
        event.preventDefault()
        fetch('http://localhost:5000/register',
        {
            method:'POST',
            headers:
            {
                'Content-Type' : "application/json", 
            },
            body:JSON.stringify(formData),
            
        })
        
        .then(response=>response.json())
        .then(data=>{
            console.log('Success',data)
            setUser(data.id)
            if(data.message == 'This username is not available')
            {
                alert('This username is already in use')
                window.location.href="3.html"
            }
            else
            {
                localStorage.setItem('user',data.id)
                window.location.href="4.html"
            }
        })
        .catch(error=>{
            console.error('Error',error)
        })
    }
    return(
        <div className="container">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                name="username" 
                onChange={handleChange}
                value={formData.username}
                required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                onChange={handleChange}
                value={formData.email}
                required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                onChange={handleChange}
                value={formData.password}
                required/>
            </div>
            <div className="form-group">
                <button type="submit">Register</button>
            </div>
            <p className="reg"><a href = "2.html">Already have an account?</a></p>
        </form>
    </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Register/>)