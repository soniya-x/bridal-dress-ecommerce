import React, { useEffect, useState } from "react";
import "../Assets/CSS/Cart.css";
import { AddressData } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setAdd } from "../redux/actions/actions";

const AddMoreandEdit = ({ editId, model }) => {
  const [addData, setAddData] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [stateRajya, setStateRajya] = useState("");
  const [fNameValid, setFNameValid] = useState(true);
  const [lNameValid, setLNameValid] = useState(true);
  const [mobileValid, setMobileValid] = useState(true);
  const [ addressValid,setAddressValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [stateRajyaValid, setStateRajyaValid] = useState(true)
  const [zipCodeValid, setZipCodeValid] = useState(true)

  const dispatch = useDispatch();
  const addressData = useSelector((state) => state.address.address);

  useEffect(() => {
    const fetchData = () => {
      setAddData(addressData);
    };
    fetchData();
  }, [addressData]);

  useEffect(() => {
    const fetchData = () => {
      if (editId !== null) {
        for (var i = 0; i < addData.length; i++) {
          if (addData[i].addId === editId) {
            setFName(addData[i].fName);
            setLName(addData[i].lName);
            setMobile(addData[i].mobile);
            setAddress(addData[i].address);
            setCity(addData[i].city);
            setStateRajya(addData[i].stateRajya);
            setZipCode(addData[i].zipCode);
          }
        }
      } else {
        setFName("");
        setLName("");
        setMobile("");
        setAddress("");
        setCity("");
        setStateRajya("");
        setZipCode("");
      }
    };
    fetchData();
  }, [editId, addData]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const isFNameValid = ((fName.trim() !== "" )&& (fName.length > 3));
    const isLNameValid = ((lName.trim() !== "" )&& (lName.length > 3));
    const isMobileValid = /^\d{10}$/.test(mobile);
    const isAddressValid = address.length > 10;
    const isCityValid = city.length > 3;
    const isStateRajyaValid = stateRajya.length > 3;
    const isZipCodeValid = zipCode.length >= 6; 

    if (isFNameValid && isLNameValid && isMobileValid && isAddressValid && isCityValid && isStateRajyaValid && isZipCodeValid) {
     if(editId === null){
        const obj = {
            addId: Date.now(),
            fName: fName,
            lName: lName,
            mobile: mobile,
            address: address,
            city: city,
            zipCode: zipCode,
            stateRajya: stateRajya,
          };
          const newAdd = [...addressData, obj];
          dispatch(setAdd(newAdd));
          model();
     } else if (editId !== null) {
        var newArr = [];
        for (let i = 0; i < addressData.length; i++) {
            if (addressData[i].addId === editId) {
                const obj = {
                    addId: editId,
                    fName: fName,
                    lName: lName,
                    mobile: mobile,
                    address: address,
                    city: city,
                    zipCode: zipCode,
                    stateRajya: stateRajya,
                };
                newArr.push(obj);
            } else {
                newArr.push(addressData[i]); // Push unchanged elements
            }
        }
        dispatch(setAdd(newArr));
        model();
    }
    } else {
      setFNameValid(isFNameValid);
      setLNameValid(isLNameValid);
      setMobileValid(isMobileValid);
      setAddressValid(isAddressValid)
      setCityValid(isCityValid)
      setStateRajyaValid(isStateRajyaValid);
      setZipCodeValid(isZipCodeValid)
    }
  };
  return (
    <div className="add">
      <div className="add-1st">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setFName(e.target.value)}
            type="text"
            name="fName"
            value={fName}
            className={`add-input ${fNameValid ? "" : "invalid"}`}
            placeholder="Enter First name"
          />
          {!fNameValid && (
            <p className="error-text">Please enter a valid first name.</p>
          )}
          <input
            onChange={(e) => setLName(e.target.value)}
            type="text"
            name="lName"
            value={lName}
            className={`add-input ${lNameValid ? "" : "invalid"}`}
            placeholder="Enter Last name"
          />
          {!lNameValid && (
            <p className="error-text">Please enter a valid last name.</p>
          )}
          <input
            onChange={(e) => setMobile(e.target.value)}
            type="number"
            name="mobile"
            value={mobile}
            className={`add-input ${lNameValid ? "" : "invalid"}`}
            placeholder="Enter Mobile"
          />
          {!mobileValid && (
            <p className="error-text">Please enter a valid Mobile Number.</p>
          )}
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className={`add-input ${addressValid ? "" : "invalid"} add-inputarea`}
            name="TextArea"
            placeholder="Enter Address"
          ></textarea>
           {!addressValid && (
            <p className="error-text">Please enter a valid address.</p>
          )}
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name="city"
            value={city}
            className={`add-input ${cityValid ? "" : "invalid"}`}
            placeholder="Enter City"
          />
           {!cityValid && (
            <p className="error-text">Please enter a valid city.</p>
          )}
          <input
            onChange={(e) => setStateRajya(e.target.value)}
            type="text"
            name="state"
            value={stateRajya}
            className={`add-input ${stateRajyaValid ? "" : "invalid"}`}
            placeholder="Enter State"
          />
           {!stateRajyaValid && (
            <p className="error-text">Please enter a valid State</p>
          )}
          <input
            onChange={(e) => setZipCode(e.target.value)}
            type="number"
            name="pincode"
            value={zipCode}
            className={`add-input ${zipCodeValid ? "" : "invalid"}`}
            placeholder="Enter Pincode"
          />
           {!zipCodeValid && (
            <p className="error-text">Please enter a valid Zip Code.</p>
          )}
          <div className="add-btn">
            <button className="add-button add-btn-1st">Add Address</button>
            <button className="add-button add-btn-2nd" onClick={model}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoreandEdit;