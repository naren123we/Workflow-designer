import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider, addEdge,
  useNodesState, useEdgesState,Controls} from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

import '../App.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const WorkflowDesigner = () => {
  const {id}=useParams()
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
const [name,setname]=useState('')
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const name = event.dataTransfer.getData('name');
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${name}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  useEffect(()=>{
    async function Getdata(){
          
      try{
        
           const res= await fetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow/'+id)
           const data= await res.json()
           setname(data.name)
          
      
      }catch(err){
         console.log(err.message)
      }

  }

Getdata()
  },[id])

  return (
    <>
    <div className=' p-2 border-[#c8dfe7] border-2 font-mono font-semibold text-2xl'>Modules name : {name}</div>
    <div className="dndflow" style={{ height: '100vh',width:'100vw' }}>

     
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper} width='100%' height='100%'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar/>
      </ReactFlowProvider>
    </div>
    </>
  );
};

export default WorkflowDesigner;