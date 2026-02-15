import React from "react";
import { Link } from "react-router-dom";
import '../Assets/CSS/Footer.css'
import {FaApple} from 'react-icons/fa'
import {BiLogoPlayStore} from 'react-icons/bi'
import {BiCopyright} from 'react-icons/bi'
import QRImage from '../Assets/Images/qr1.png'


const Footer = () => {


    return (
        <>
        <div className="ft-main">
        <div className="ft-left">
         <div className="ft-qr-1">
            <img src={QRImage} alt="QR Code" className="QR"/>
            <button className="ft-btn"><FaApple style={{fontSize:"1.5rem"}}/> Get it on App Store </button>
         </div>
         <div className="ft-qr-1">
            <img src={QRImage} alt="QR Code" className="QR"/>
            <button className="ft-btn"><BiLogoPlayStore style={{fontSize:"1.5rem"}} /> Get it on App Store </button>
         </div>
       
        </div>
        <div className="ft-right">
         <div className="ft-top">
            <p className="ft-p">Contact us </p>
            <p className="ft-p">Term of Service </p>
            <p className="ft-p">Privacy Policy</p>
         </div>
         <div className="ft-bot">
            <p className="ft-p"> <BiCopyright/> 2023 shilohbridals.com </p>
         </div>
        </div>
        </div>

        </>
    )
}

export default Footer;