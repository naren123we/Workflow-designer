import  { useEffect,useState } from 'react'

const UseGetdata = () => {
 const url='https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5';
 const [workflow_data,setdata]=useState([])
 const [error,seterror]=useState('')
 const [loading,setloading]=useState([])

    useEffect(()=>{
        async function Getdata(){
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
     
Getdata()

    },[])





  return {workflow_data,error,loading}
}

export default UseGetdata
