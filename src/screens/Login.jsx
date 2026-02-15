import React, { useState, useEffect } from "react";
import { setMobileNo } from '../redux/actions/actions';
import { OTPInput } from "chakra-otp-input";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


import "../Assets/CSS/Login.css";
import { toast } from "react-toastify";

const Login = ({ closeModel }) => {
  const [log, setLog] = useState(false);
  const [mobile, setMobile] = useState(null);
  const [otp, setOtp] = useState({});
  const [otpNew,setOTPNew]=useState(111111);

  const navigate = useNavigate('')
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "scroll");
  }, []);

  const handleContinue = () => {
    if(mobile == 1111 || mobile == 'veramasaIT@gmail.com'){
      setLog(true)
    }else{
      toast.error('Please Enter Valid Credential',{position: "top-center"});
    }
  };

  const handleLogin = () => {
    if (otp == otpNew){
      const token = "sfsdf6t+fsad6+tr8yta+sd6s+f9df6s";
      localStorage.setItem('token',token);
      navigate('/dashboard');
      toast.success('Login Success',{position: "top-center"});
      dispatch(setMobileNo(mobile))
    }
    else{
      toast.error('Please Enter Valid OTP',{position: "top-center",});
    }
  };

  const handleResend = ()=>{
    setOTPNew(222222);
    toast.success('otp resend Successfully');
  }

  return (
    <>
      <div className="model-wraper" onClick={closeModel}></div>
      <div className="lo-main">
        <div className="lo-close" onClick={closeModel}>
          <AiOutlineClose />
        </div>
        <div className="lo-item">
          <img
            className="lo-logo"
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGgfOM2i3pnzYa1AGcg0p7ZjL_RRaAmfpHsakSwC9cl2KUTlEF"
            alt="logo"
          />
          <input
            className="lg-input"
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter email or mobile number"
          />
        </div>
        {log === false ? (
          <button className="lg-btn" onClick={handleContinue}>
            Continue
          </button>
        ) : (
          ""
        )}
        {log === true ? (
          <div>
            <div className="otp-main">
              <p className="otp-p">Please enter the otp send to {mobile}</p>
              <div className="otp-div">
                <OTPInput
                  style={{ backgroundColor: "rgb(224, 211, 211)" }}
                  className="otp-input"
                  height="3rem"
                  noInputs={6}
                  onChange={(value) => setOtp(value)}
                />
              </div>
              <button className="lg-btn" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="lo-resend">
              <button
                style={{ color: "orangered", fontSize: ".85rem" }}
                className="resend-btn btn"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Login;
