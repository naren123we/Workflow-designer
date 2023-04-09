import React from 'react'
import UseGetdata from '../hooks/UseGetdata'
import { NavLink } from 'react-router-dom'
import spinner from '../images/Fading line.gif'

const Listpage = () => {
    const {workflow_data,error,loading} =UseGetdata()


    if(loading){
        return( <div className='flex flex-row justify-center items-center h-[100vh]'>
            <img src={spinner} className='scale-110' alt='spinner'></img>
        </div>
        )
    }
    if(error){
        return( <h1 className='text-center sm:text-3xl text-xl font-mono font-semibold text-indigo-700 py-14'>
          {error}
        </h1>
        )
    }
  
  return (
    <div className='p-6'>
        <header className='pb-3 shadow-sm px-2'>
       <h1 className='sm:text-3xl text-2xl font-mono font-semibold'>Workflow</h1>
       </header>
   
       <table className='m-auto my-5'>
        <tbody>
                    <tr className='bg-blue-700 text-white'>
                        <th className='pr-6 pl-2 text-left py-4 border-r-2 border-white'>Name</th>
                        <th className='pr-6 pl-2 text-left border-r-2 border-white'>Input Type</th>
                        <th className='pr-12 pl-2 text-left'>Created at</th>
                    </tr>
   
    
                    {workflow_data.map((data,i)=>(<tr key={i} className={(i%2===0)?'bg-blue-100': 'bg-slate-100'}>
                    
                         <td className='p-2 border-r-2 border-white pr-6'><NavLink to={`/${data.id}`}>{data.name}</NavLink></td>
                            <td className=' p-2 border-r border-white'><NavLink to={`/${data.id}`}>{data.input_type.toUpperCase()}</NavLink></td>
                            <td className='p-2'><NavLink to={`/${data.id}`}>{data.createdAt.slice(0,10)}</NavLink></td>
                           
                        </tr>)
                      
                    )}
 </tbody>
                </table>

    </div>
  )
}

export default Listpage
