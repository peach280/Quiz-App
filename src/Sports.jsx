import React from "react"
import ReactDOM  from "react-dom/client" 
import './Sports.css'
export default function Sports()
{
    const [ques,setQues] = React.useState([])
    const [currentIndex,setCurrentIndex]= React.useState(0)
    const [ans,setAns]=React.useState("")
    const [result,setResult] = React.useState(false)
    const [message,setMessage] = React.useState("")
    const [total,setTotal] = React.useState(0)
    const [count,setCount]= React.useState(0)
    const [opArray,setOpArray] = React.useState([])
    const [final,setFinal]=React.useState(0)
    const [grandTotal,setGrandTotal] = React.useState(0)
    const convert = () => {
            if (ques[currentIndex] && ques[currentIndex].options) {
                const optionsArray = ques[currentIndex].options.split(',');
                setOpArray(optionsArray);
            }
        }
    
    
        React.useEffect(() => {
            if (final === 1 && total !== null) {
              const userr = localStorage.getItem('user')
              fetch('http://localhost:5000/getPoints',{
                method:['POST'],
                headers:
                {
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({ username: userr, total: total,genre:"Sports" })
              })
              .then(response=>response.json())
              .then(data=>{
                console.log('Success',data)
              })
              .catch(error=>{
                console.error('Error',error)
              })
            }
          }, [final]);
        
    React.useEffect(()=>{
        fetch("http://localhost:5000/Data?genre=Sports")
        .then(res=>res.json())
        .then(d=>setQues(d))

    },[])
    React.useEffect(() => {
        console.log(currentIndex)
        convert();
    }, [currentIndex, ques]);
   const handleSubmit = ()=>{
        
        const currentQues = ques[currentIndex]
        if(ans.toLowerCase()==currentQues.answer.toLowerCase())
        {
            setMessage("Kudos! Correct answer")
            setTotal(prev=>prev+10)
        }
            
        else
        {
            setMessage("Oh! Wrong answer")
           
        }
        setCount(p=>p+1)
        setResult(true)
        
    }
   const nextQues=()=>
   {
        setResult(false)
        setCurrentIndex(prev=>prev+1)
        setAns('')
        setMessage('')
        setCount(0)
        setGrandTotal(prev=>prev+10)
        if(currentIndex+1===ques.length) setFinal(1)
        
   }
    const back=()=>{
        
        window.location.href="4.html"
    }
    const again = ()=>{
        window.location.href="Sports.html"
    }
    return(
        <div>
            {ques.length>0 && currentIndex<ques.length &&(
                <div>
              
                    <h1>{ques[currentIndex].ques}</h1>
                    <div className="list">
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {opArray.map((option,index)=>(
                            <li key={index} >
                                <input type="radio"
                                name="answer"
                                value={option}
                                onChange={(e)=>setAns(e.target.value)}
                                checked = {ans===option}
                                className="custom-radio"
                                />
                                <label className="option-label">{option}</label>
                            </li>
                        ))}
                    </ul>
                    </div>

                    {count<1 && <button onClick={handleSubmit} className="btn">Submit Answer</button>}
                    
                
                <button onClick={nextQues} className="btn1">Next Question</button>
                {result&&<p className="m">{message}</p>}
                </div>
            )}
            {currentIndex===ques.length && (
            <div>    
            <h1>You scored {total} points out of {grandTotal} </h1>
            <button className="btn" onClick={back}>Main Menu</button>
            <button  className="btn1" onClick={again}>Play again</button> 
            </div>
            )}
        </div>
        
        
    )
   
}
ReactDOM.createRoot(document.getElementById("root")).render(<Sports/>)
