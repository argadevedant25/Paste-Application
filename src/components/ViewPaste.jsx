import React, { useEffect,useState } from 'react';
import { useParams} from 'react-router-dom';
import { useSelector} from 'react-redux';


const ViewPaste = () => {
  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id ===id)[0];
  console.log("Final Paste:", paste);

  return (
      <div>
        <div className="flex flex-row gap-7 place-content-between">
        <input
            className="p-1 rounded-2xl mt-2 w-[65%] p-4"            
            type="text"
            disabled
            placeholder="Enter the title here."
            value={paste.title}
            onChange={(e)=> setTitle(e.target.value)}
        />
        
    </div>
    <div className='mt-8'>
        <textarea 
            className="rounded 2xl mt-4, min-w-[500px] p-4"
            value={paste.content}
            placeholder="Enter the Content Here"
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
            disabled
        />
    </div>
    </div>
  )
}

export default ViewPaste
