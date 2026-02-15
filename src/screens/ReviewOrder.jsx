import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { data } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setCartOrderList, setPlacedOrderData } from "../redux/actions/actions";
import { toast } from "react-toastify";

const ReviewOrder = () => {
  const [ordData, setOrdData] = useState([]);
  const [price, setPrice] = useState("");
  const [shipCharge, setShipCharge] = useState("");
  const [CartDataFull, setCartDataFull] = useState([]);
  const [newCart, setNewCart] = useState([]);
  const [totalprice, setTotalPrice] = useState(0);
  const [addressNewData,setAddressNewData] = useState([]);

  const dispatch = useDispatch();

  const location = useLocation();
  const addressId = location.state;
  const cartDataNew = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList
  );
  const addressData = useSelector((state)=>state.address.address);
  const placedOrderNew = useSelector((state) => state.placedOrder.placedOrder)

  const navigate = useNavigate();


  useEffect(()=>{
    const fetchData = ()=>{
     const array =  addressData.find(user => user.addId === addressId);
     setAddressNewData([array])
    }
    fetchData()
  },[addressId])

  useEffect(() => {
    setCartDataFull(cartDataNew);
  }, [cartDataNew]);

  useEffect(() => {
    const fetchData = () => {
      var newArr = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < CartDataFull.length; j++) {
          if (data[i].orderId == CartDataFull[j].orderId) {
            newArr.push(data[i]);
          }
        }
      }
      setNewCart(newArr);
    };
    fetchData();
  }, [CartDataFull]);

  useEffect(() => {
    const fetchData = () => {
      var price = 0;
      var priceOne = 1;
      for (var i = 0; i < newCart.length; i++) {
        for (var j = 0; j < CartDataFull.length; j++) {
          if (newCart[i].orderId === CartDataFull[j].orderId) {
            priceOne = newCart[i].actualPrice * CartDataFull[j].quantity;
            price = price + priceOne;
            priceOne = 1;
          }
        }
      }
      setTotalPrice(price);
      const ship = newCart.length * 500;
           setShipCharge(ship);
    };
    fetchData();
  }, [newCart]);

  const handleOrderPlaced = ()=>{
    toast.success('order placed',{position:'top-right'})
    navigate('/myorder',{state:addressNewData})
    dispatch(setPlacedOrderData(CartDataFull));
    dispatch(setCartOrderList([]));
  }

  return (
    <div className="RO">
      <div className="back"><button onClick={()=>navigate('/cart')} >Back</button></div>
      <div className="RO-01st">Review Order</div>
      <div className="RO-02nd">
        <div className="RO-item-cart">
          {newCart.length > 0 &&
            newCart.map((item) => (
              <div className="RO-item-cart-main" key={item.orderId}>
                <div className="RO-cart-img">
                  <img
                    src={item.images}
                    alt={item.category}
                    className="RO-cart-image"
                  />
                </div>
                <div className="RO-cart-content">
                  <p>{item.category}</p>
                  <p>Price : Rs.{item.actualPrice}</p>
                  {
                    cartDataNew.find(
                      (newItem) => newItem.orderId === item.orderId
                    ).quantity
                  }
                </div>
              </div>
            ))}
        </div>
        <div className="RO-item-pay">
          {
            addressNewData.length > 0 ? <>
            {addressNewData.map((item)=>(
              <div className="RO-item-pay-01st" key={item.addId}>
              <p>Shipping Address</p>
              <span>{item.fName} {item.lName}</span>
              <span>Bholaram indore</span>
              <span> indore</span>
              <span>Madhya Pradesh</span>
              <span>452004</span>
            </div>
            ))}</>:<p>Please go back and Select the adress first</p>
          }

          {/* */}
          <div className="RO-item-pay-01st">
            <div className="RO-pay-01st RO-pay">
              <div style={{ width: "50%" }}>Subtotal ( items)</div>
              <div>:</div>
              <div>Rs. {totalprice}</div>
            </div>
            <div className="RO-pay-2nd RO-pay">
              <div style={{ width: "50%" }}>Total Amount</div>
              <div>:</div>
              <div>Rs. {shipCharge}</div>
            </div>
            <div className="RO-pay-3rd RO-pay">
              <div style={{ width: "50%" }}>Total Amount</div>
              <div>:</div>
              <div>Rs. {totalprice + shipCharge}</div>
            </div>
            <div className="RO-pay">
              <button
                className=" RO-pay-btn"
                onClick={handleOrderPlaced}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;





// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { data } from "../data";
// import { useDispatch, useSelector } from "react-redux";
// import { setCartOrderList, setPlacedOrderData } from "../redux/actions/actions";
// import { toast } from "react-toastify";

// const ReviewOrder = () => {
//   const [ordData, setOrdData] = useState([]);
//   const [price, setPrice] = useState("");
//   const [shipCharge, setShipCharge] = useState("");
//   const [CartDataFull, setCartDataFull] = useState([]);
//   const [newCart, setNewCart] = useState([]);
//   const [totalprice, setTotalPrice] = useState(0);
//   const [addressNewData,setAddressNewData] = useState([]);

//   const dispatch = useDispatch();

//   const location = useLocation();
//   const addressId = location.state;
//   const cartDataNew = useSelector(
//     (state) => state.cartOrderDataList.cartOrderDataList
//   );
//   const addressData = useSelector((state)=>state.address.address);
//   const placedOrderNew = useSelector((state) => state.placedOrder.placedOrder)

//   const navigate = useNavigate();


//   useEffect(()=>{
//     const fetchData = ()=>{
//      const array =  addressData.find(user => user.addId === addressId);
//      setAddressNewData([array])
//     }
//     fetchData()
//   },[addressId])

//   useEffect(() => {
//     setCartDataFull(cartDataNew);
//   }, [cartDataNew]);

//   useEffect(() => {
//     const fetchData = () => {
//       var newArr = [];
//       for (let i = 0; i < data.length; i++) {
//         for (let j = 0; j < CartDataFull.length; j++) {
//           if (data[i].orderId == CartDataFull[j].orderId) {
//             newArr.push(data[i]);
//           }
//         }
//       }
//       setNewCart(newArr);
//     };
//     fetchData();
//   }, [CartDataFull]);

//   useEffect(() => {
//     const fetchData = () => {
//       var price = 0;
//       var priceOne = 1;
//       for (var i = 0; i < newCart.length; i++) {
//         for (var j = 0; j < CartDataFull.length; j++) {
//           if (newCart[i].orderId === CartDataFull[j].orderId) {
//             priceOne = newCart[i].actualPrice * CartDataFull[j].quantity;
//             price = price + priceOne;
//             priceOne = 1;
//           }
//         }
//       }
//       setTotalPrice(price);
//       const ship = newCart.length * 500;
//            setShipCharge(ship);
//     };
//     fetchData();
//   }, [newCart]);

//   const handleOrderPlaced = ()=>{
//     toast.success('order placed',{position:'top-right'})
//     navigate('/myorder')
//     if (placedOrderNew !== undefined) {
//       dispatch(setPlacedOrderData([...placedOrderNew, [CartDataFull, addressNewData]]));
//     } else {
//       dispatch(setPlacedOrderData([[CartDataFull, addressNewData]]));
//       console.log([[CartDataFull, addressNewData]]);
//     }
//     dispatch(setCartOrderList([]));
//   }

//   return (
//     <div className="RO">
//       <div className="RO-01st">Review Order</div>
//       <div className="RO-02nd">
//         <div className="RO-item-cart">
//           {newCart.length > 0 &&
//             newCart.map((item) => (
//               <div className="RO-item-cart-main" key={item.orderId}>
//                 <div className="RO-cart-img">
//                   <img
//                     src={item.images}
//                     alt={item.category}
//                     className="RO-cart-image"
//                   />
//                 </div>
//                 <div className="RO-cart-content">
//                   <p>{item.category}</p>
//                   <p>Price : Rs.{item.actualPrice}</p>
//                   {
//                     cartDataNew.find(
//                       (newItem) => newItem.orderId === item.orderId
//                     ).quantity
//                   }
//                 </div>
//               </div>
//             ))}
//         </div>
//         <div className="RO-item-pay">
//           {
//             addressNewData.length > 0 ? <>
//             {addressNewData.map((item)=>(
//               <div key={item.addId} className="RO-item-pay-01st">
//               <p>Shipping Address</p>
//               <span>{item.fName} {item.lName}</span>
//               <span>Bholaram indore</span>
//               <span> indore</span>
//               <span>Madhya Pradesh</span>
//               <span>452004</span>
//             </div>
//             ))}</>:<p>Please go back and Select the adress first</p>
//           }

//           {/* */}
//           <div className="RO-item-pay-01st">
//             <div className="RO-pay-01st RO-pay">
//               <div style={{ width: "50%" }}>Subtotal ( items)</div>
//               <div>:</div>
//               <div>Rs. {totalprice}</div>
//             </div>
//             <div className="RO-pay-2nd RO-pay">
//               <div style={{ width: "50%" }}>Total Amount</div>
//               <div>:</div>
//               <div>Rs. {shipCharge}</div>
//             </div>
//             <div className="RO-pay-3rd RO-pay">
//               <div style={{ width: "50%" }}>Total Amount</div>
//               <div>:</div>
//               <div>Rs. {totalprice + shipCharge}</div>
//             </div>
//             <div className="RO-pay">
//               <button
//                 className=" RO-pay-btn"
//                 onClick={handleOrderPlaced}
//               >
//                 Pay
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewOrder;

