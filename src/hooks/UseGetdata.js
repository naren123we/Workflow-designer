import  { useEffect,useState } from 'react'

const UseGetdata = (url) => {
 
 const [workflow_data,setdata]=useState([])
 const [error,seterror]=useState('')
 const [loading,setloading]=useState([])

    useEffect(()=>{
        async function Getdata(url){
          
            try{
                setloading(true)
                 const res= await fetch(url)
                 const data= await res.json()
               
                 setdata(data)
               
                 setloading(false)
            
            }catch(err){
                seterror(err.message)
                setloading(false)
            }

        }
     
Getdata(url)

    },[url])





  return {workflow_data,error,loading}
}

export default UseGetdata
