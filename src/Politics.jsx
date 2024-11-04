import React from "react"
import ReactDOM  from "react-dom/client" 
import './Sports.css'
function Politics()
{
    const [ques,setQues]=React.useState([])
    const [index,setIndex] = React.useState(0)
    const [shown,setShown] = React.useState(false)
    const [ans,setAns] = React.useState("")
    const [message,setMessage] = React.useState("")
    const [total,setTotal] = React.useState(0)
    const [count,setCount] = React.useState(0)
    const[opArray,setOpArray]=React.useState([])
    const[grandTotal,setGrandTotal] = React.useState(0)
    const[final,setFinal]=React.useState(0)
    const convert=()=>
    {
        if(ques[index] && ques[index].options){
            setOpArray(ques[index].options.split(','));
            
        }
    }
    React.useEffect(()=>{
        if(final===1 && total!==null)
        {
            const userr = localStorage.getItem('user')
            console.log(userr)
            if(userr)
            {
                fetch('http://localhost:5000/getPoints',{
                method:['POST'],
                headers:
                {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ username: userr, total: total,genre:"Politics" })
            })
            .then(response=>response.json())
            .then(data=>{
                console.log('Success',data)
            })
            .catch(error=>{
                console.error('Error',error)
            })
            }
    }
    },[final])
    React.useEffect(()=>{
        fetch('http://localhost:5000/Data?genre=Politics')
        .then(res=>res.json())
        .then(d=>setQues(d))
    },[])
    React.useEffect(()=>{
        convert()
    },[index,ques])
    const handleSub=(event)=>{
        event.preventDefault()
        const current = ques[index]
        if(ans.toLowerCase()===current.answer.toLowerCase())
        {
            setMessage("Kudos! right answer")
            setTotal(prev=>prev+10)
        }
        else
        {
            setMessage("Oh! Wrong answer")
        }
        setCount(p=>p+1)
        setShown(true)
    }
    const next = ()=>{
        setIndex(prev=>prev+1)
        setShown(false)
        setAns('')
        setMessage('')
        setCount(0)
        setGrandTotal(prev=>prev+10)
        if(index+1 === ques.length) setFinal(1)
    }
    const back=()=>{
        window.location.href="4.html"
    }
    const again = ()=>{
        window.location.href="Politics.html"
    }
    return(
        <div>
            {ques.length>0 && index<ques.length&&(
                <div>
                    <h1>{ques[index].ques}</h1>
                    <div className="list">
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {opArray.map((option,id)=>(
                            <li key={id}>
                                <input
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={(e)=>setAns(e.target.value)}
                                checked={ans==option}
                                className="custom-radio"
                                />
                                <label className="option-label">{option}</label>
                            </li>
                        ))}
                        </ul>
                    </div>
                    {count<1 && <button className="btn" onClick={handleSub}>Submit answer</button>}
                    <button className="btn1" onClick={next}>Next Question</button>
                    {shown && <p className="m">{message}</p>}
                    </div>
                    )}
                    
                    {index==ques.length && (
                    <div>
                    <h1>You have scored {total} points out of {grandTotal}!</h1>
                    <button className="btn" onClick={back}>Main Menu</button>
                    <button  className="btn1" onClick={again}>Play again</button> 
                    </div>)
                    }
                    
                
            
        </div>
    )
}
ReactDOM.createRoot(document.getElementById("root")).render(<Politics/>)