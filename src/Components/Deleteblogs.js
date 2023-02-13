import React from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../Firebase/firebaseConfig";
import {RxCross2} from 'react-icons/rx'


const Deleteblogs = ({imageUrl,id}) => {
  const handleDelete =()=>{

    if(window.confirm("Are you sure you want to delete this article?")){
      try{
         const storageRef = ref(storage, imageUrl);
         deleteDoc(doc(db,'Articles',id)).then(()=>{
          deleteObject(storageRef);          
        })

      }catch(err){
        console.log(err)
        alert('Something went wrong')
      }
    }
    
  }
  return (
    <div>
      <div>
      <RxCross2
        className="text-4xl text-[#6EEB83]"
        onClick={handleDelete}
      />
    </div>
    </div>
  )
}

export default Deleteblogs