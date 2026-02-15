import React, { useState } from "react";
import { Link } from "react-router-dom";
import {AiOutlineClose} from 'react-icons/ai'
import Search from "./Search";


const SearchHeader = () => {
const [search, setSearch]=useState();
  return (
   <div>
        <div style={{display:"flex",justifyContent:"center", textAlign:'center',alignItems:"center",padding: "1rem"}}>
          <input type="text" onChange={(e)=>setSearch(e.target.value)} id="form12" className="form-control"  style={{width:"50vw"}} placeholder="Search"/>
         <Link to="/"> <AiOutlineClose style={{fontSize:"1.85rem",color:"red"}}></AiOutlineClose></Link>
      </div>
    <Search data={search}/>
   </div>
  )

}

export default SearchHeader;

