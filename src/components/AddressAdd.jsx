import React, { useState, useEffect } from "react";
import '../Assets/CSS/Cart.css'
import { AiOutlineClose } from 'react-icons/ai'
import { BsTelephone } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
// import { AddressData } from "../data";
import { FaPlus } from 'react-icons/fa';
import AddMoreandEdit from './AddMoreandEdit'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdd } from "../redux/actions/actions";
import { toast } from "react-toastify";

const AddressAdd = ({ model }) => {
    const [addressArr, setAddressArr] = useState([])
    const [addMore, setAddMore] = useState(false);
    const [editId, setEditId] = useState(null)
    const [selectedItemId, setSelectedItemId] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const addressData = useSelector((state)=>state.address.address)

    const closeMore = () => { setAddMore(false) };

    useEffect(() => {
        const fetchData = () => {
            setAddressArr(addressData);
        }
        fetchData()
    }, [addressData])

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => (document.body.style.overflowY = "scroll");
    }, []);

    const handleEditorMore = (addressId) => {
        setAddMore(true)
        setEditId(addressId)
    }
    const handleRemoveAdd = (addressId) => {
        let valueToRemove = addressId;
        const array = addressArr.filter(item => !(item.addId === valueToRemove));
        dispatch(setAdd(array))
        
    }
    const handleContinue = ()=>{
        if(selectedItemId !== null ){
            navigate('/revieworder', {state:selectedItemId})
        }
        else{
            toast.warn('please select address first',{position:'top-center'})
        }
    }

    return (
        <>
            <div className="AA-model-wraper" onClick={model}></div>
            <div className="AA-main">
                <div className="AA-1st">
                    <div className="AA-1st-01">
                        <div style={{ width: "20%" }} className="AA-1st-close" > <AiOutlineClose  onClick={model} /></div>
                        <p className="AA-1st-cont" style={{ textAlign: "center", width: "80%" }}>Choose Delevery Address</p>
                    </div>
                    <div className="AA-1st-02">
                        <button className="AA-1st-02-continue" onClick={handleContinue}>Continue</button>
                    </div>
                </div>
                {
                    !addMore ? <div className="AA-2nd">
                        {addressArr.length > 0 && addressArr.map((item) => (
                            <div className="AA-2nd-cart" key={item.addId}>
                                <div className="AA-2nd-cart-radio">
                                    <input
                                        type="checkbox"
                                        className="AA-2nd-cart-input-checkbox"
                                        checked={item.addId === selectedItemId}
                                        onChange={() => setSelectedItemId(item.addId)}
                                    />
                                </div>
                                <div className="AA-2nd-cart-address">
                                    <p>{item.fName} {item.lName}</p>
                                    <p>{item.address}</p>
                                    <p>{item.block}</p>
                                    <p>{item.city}</p>
                                    <p>{item.stateRajya}</p>
                                    <p>{item.zipCode}</p>
                                    <div className="AA-2nd-cart-address-icons">
                                        <div className="AA-2nd-cart-address-mobile"> <BsTelephone style={{ fontSize: '23px', color: 'gray' }} />{item.mobile}</div>
                                        <div className="AA-2nd-cart-icon">
                                            <FiEdit style={{ color: "rgb(13, 180, 180)" }} onClick={() => handleEditorMore(item.addId)} />
                                            <RiDeleteBinLine style={{ color: "red" }} onClick={() => handleRemoveAdd(item.addId)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="AA-2nd-cart">
                            <div className="add-more" onClick={() => handleEditorMore(null)}>
                                <FaPlus style={{ fontSize: "45px", color: "gray" }} />
                                <div>
                                    Add Address
                                </div>
                            </div>
                        </div>
                    </div> : <AddMoreandEdit editId={editId} model={closeMore} />
                }
            </div>
        </>
    );
}

export default AddressAdd;