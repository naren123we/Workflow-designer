import {useState,useEffect} from 'react';
import UseGetdata from '../hooks/UseGetdata';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr"

export default () => {

  const [pageno,setpage]=useState(1)
  const [totalpage,settotalpage]=useState(20)

  const onDragStart = (event, nodeType,name) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('name', name) 
    event.dataTransfer.effectAllowed = 'move';
  };

  function next(){
    totalpage>pageno && setpage(pageno+1)
   }
function previous() {
    pageno>1&&setpage(pageno-1)

  }
  

    const {workflow_data,error,loading} =UseGetdata('https://64307b10d4518cfb0e50e555.mockapi.io/modules?page='+pageno+'&limit=5')


  
   

 

  return (
    <aside className='bg-[#fcfcfc]  flex flex-col items-center justify-between md:w-[30%] border-[#eee] border-2'>
    
     <div className='w-[100%] flex flex-col items-center'>
      <h2 className='p-2 border-2 w-[100%] border-[#c8dfe7]'>Modules</h2>
    

      <div className='flex flex-col md:space-y-3 space-y-1 md:mt-10 mt-5'>
 {workflow_data.map((data,index)=>{

    return(<div className="px-1 border-2 lg:w-[324px]  rounded-md border-[#c8dfe7] flex flex-row justify-between items-center cursor-grab" key={index} onDragStart={(event) => onDragStart(event, 'default',`${data.input_type.toUpperCase()}    |    `+`${data.name}`+`   |    ${data.output_type.toUpperCase()}`)} draggable>
        <p className='border-r-2 p-1 border-[#c8dfe7]'>{data.input_type.toUpperCase()}</p>  <p className='p-1'>{data.name}</p>    <p className='border-l-2 p-1 border-[#c8dfe7]'>{data.output_type.toUpperCase()}</p>
        </div>
    )
   })  
}

</div>
</div>
      <div className='flex justify-center space-x-10 md:mb-10 mt-2 '>
        < GrFormPrevious className='scale-150 active:scale-125 cursor-pointer' onClick={previous}  />
   <p>{pageno} out of {totalpage===0?1:totalpage}</p>
         <GrFormNext  className='scale-150 active:scale-125 cursor-pointer' onClick={next}/>
         </div>
    </aside>
  );
};