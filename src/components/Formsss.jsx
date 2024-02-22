import React from 'react'
import "../App.css"
import {MdClose} from "react-icons/md"





const Formsss = ({handleSubmit,handleOnChange,handleClose,rest,cancelButton}) => {
  return (
    
    <div className="addContainer">
      <div className='form'>
        <div className="close-btn" onClick={handleClose}><MdClose/></div>
          <label>Name :</label>
          <input type="text" id="name" name="name" value={rest.name}  onChange={handleOnChange} />
          <label>Class :</label> 
          <input type="text" id="email" name="email" value={rest.email} onChange={handleOnChange} />
          <label>Mobile :</label>
          <input type="number" id="mobile" name="mobile" value={rest.mobile}  onChange={handleOnChange} />
          <button className="btn" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
          <button className="btn-cancel" onClick={cancelButton}>Cancel</button>
          </div>
      </div>
  )
}

export default Formsss