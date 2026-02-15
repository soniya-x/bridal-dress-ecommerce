import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Menu = () => {
const [cartCount, setCartCount] = useState(0)

const navigate = useNavigate();

const handleForward = (itemCategory)=>{
navigate('/itemdetails',{state:itemCategory})

}

  return (
    <div className="menu-1st">
     <div className="menu-2nd">
        <div className="menu-pro" onClick={()=>handleForward('Formal Dress')}><Link className="Link">Formal Dress</Link></div>
        <div className="menu-sp" >|</div>
        <div className="menu-pro"  onClick={()=>handleForward('Special Event Dress')}><Link className="Link">Special Event Dress</Link></div>
        <div className="menu-sp">|</div>
        <div className="menu-pro" onClick={()=>handleForward('Evening Dress')}><Link className="Link">Evening Dress</Link></div>
        <div className="menu-sp">|</div>
        <div className="menu-pro" onClick={()=>handleForward('Cocktail Dress')}><Link className="Link">Cocktail Dress</Link></div>
        <div className="menu-sp">|</div>
        <div className="menu-pro" onClick={()=>handleForward('Weading Dress')}><Link className="Link">Weading Dress</Link></div>
     </div>
        <marquee width="100%" direction="left" height="100%">
</marquee>
    </div>
  )
}

export default Menu;

