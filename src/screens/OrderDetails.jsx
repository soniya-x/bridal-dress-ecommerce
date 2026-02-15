import React, { useEffect, useState } from "react";
import "../Assets/CSS/OrderDetails.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { data } from "../data.js";
import { AiOutlineHeart, AiFillHeart,AiOutlineStar, AiTwotoneStar,AiFillMinusSquare,AiFillPlusSquare} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCartOrderList, setLikedData } from "../redux/actions/actions";
import { toast } from "react-toastify";
import Zoom from 'react-img-zoom'

const OrderDetails = () => {
  const [product, setProduct] = useState([]);
  const [simProduct, setSimProduct] = useState([]);
  const [oId, setOid] = useState();
  const [cat, setCat] = useState();
  const [addProd, setAddProd] = useState(0);
  const [CartDataFull, setCartDataFull] = useState([]);


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartDataNew = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList
  );
  const likedData = useSelector((state) => state.likedData.likedData);
  const mobile = useSelector((state)=>state.mobile);

  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      var newArr = [];
      for (var i = 0; i < cartDataNew.length; i++) {
        if (cartDataNew[i].quantity !== 0) {
          newArr.push(cartDataNew[i]);
        }
      }
      dispatch(setCartOrderList(newArr));
      setAddProd(0)
    };
    fetchData();
  }, [addProd]);

  useEffect(() => {
    setCartDataFull(cartDataNew);
  }, [cartDataNew, addProd]);

  const handleChangeQuantity = (orderId, sign) => {
    setAddProd(addProd + 1);
    if (orderId !== null){
     var newArr = [];
    for (let i = 0; i < CartDataFull.length; i++) {
      if (sign == "+") {
        if (CartDataFull[i].orderId == orderId) {
          const obj = {
            mobile: 7692802631,
            orderId: orderId,
            quantity: CartDataFull[i].quantity + 1,
          };
          newArr.push(obj);
        } else {
          newArr.push(CartDataFull[i]);
        }
      } else if ((sign = "-")) {
        if (CartDataFull[i].orderId == orderId) {
          const obj = {
            mobile: 7692802631,
            orderId: orderId,
            quantity: CartDataFull[i].quantity - 1,
          };
          newArr.push(obj);
        } else {
          newArr.push(CartDataFull[i]);
        }
      }
    }
    dispatch(setCartOrderList(newArr));
   }
  };

  const handleAddProd = (orderId) => {
    setAddProd(addProd+1);
    var count = 0;
    if (orderId !== null){
      for (let i = 0; i < cartDataNew.length; i++) {
        if (cartDataNew[i].orderId == orderId) {
          if (cartDataNew[i].quantity === 0) {
            cartDataNew[i].quantity = 1;
          }
          count = count + 1;
        }
      }
      if (count == 0) {
        const obj = {
          mobile: mobile,
          orderId: orderId,
          quantity: 1,
        };
        const newData = [...cartDataNew, obj];
        dispatch(setCartOrderList(newData));
      }
    }
  };


  useEffect(() => {
    const fetchData = () => {
     if(location.state && location.state.orderId !== null && location.state.category !== null){
      setOid(location.state.orderId);
      setCat(location.state.category);
     }
    };
    fetchData();
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      const simArr = [];
      const prod = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].orderId === oId) {
          prod.push(data[i]);
        } else if (data[i].category === cat) {
          simArr.push(data[i]);
        }
      }
      setProduct(prod);
      setSimProduct(simArr);
    };
    fetchData();
  }, [oId, cat]);

  const handleOrderDetails = (oid, cat) => {
    setOid(oid);
    setCat(cat);
  };
  const handleHeart = (orderId) => {
    var count = 0;
   if (orderId !== null){
    for (let i = 0; i < likedData.length; i++) {
      if (likedData[i].orderId == orderId) {
        count = count + 1;
      }
    }
    if (count == 0) {
      const obj = {
        mobile: mobile,
        orderId: orderId,
      };
      const newData = [...likedData, obj];
      dispatch(setLikedData(newData));
    } else {
      const filteredItems = likedData.filter(item => item.orderId !== orderId);
      dispatch(setLikedData(filteredItems));
    }
   }
  };

  const notify = ()=>toast.warn('please login first')

  return (
    <div>
       <div className="back">
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>
      {product.map((item) => (
        <div className="OD" key={item.orderId}>
          <div className="OD-1st">
            <img className="OD-1st-img" src={item.images} alt={item.category} />
            {/* <img className="OD-2nd-img" src={item.images} alt={item.category} /> */}
            <Zoom

                    img={item.images}
                    className="OD-2nd-img"
                    zoomScale={3}
                    width={400}
                    height={500}
                    alt="shiloh bridals"
                  />
          </div>
          <div className="OD-3rd">
            <span className="OD-category">{item.category}</span>
            <span className="OD-rating">
              <AiTwotoneStar style={{ color: "gold" }} />{" "}
              <AiTwotoneStar style={{ color: "gold" }} />{" "}
              <AiTwotoneStar style={{ color: "gold" }} />
              <AiOutlineStar /> 
              <AiOutlineStar />
            </span>
            <span className="OD-actualPrice">
              <del>Rs. 700</del> <p>70%</p>{" "}
            </span>
            <span className="OD-price">Rs. {item.actualPrice}</span>
            {(cartDataNew.length !== 0) && (localStorage.getItem('token'))  ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId)? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId).quantity
                          }
                        </span>
                        <AiFillPlusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "+")}
                        />
                      </div>
                    ) : (
                      <button className="OD-add-btn" onClick={() => handleAddProd(item.orderId)} >
                        Add
                      </button>
                    )}
                  </div>
                ) : (
                  <button className="OD-add-btn" onClick={!localStorage.getItem('token')?()=>notify():() => handleAddProd(item.orderId)}>
                    Add
                  </button>
                )}
            <span className="OD-description">Description</span>
            <span className="OD-name">{item.category}</span>
            <span className="OD-about">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem eum a ducimus dolorum sit quos dolores quibusdam
              recusandae. Harum, mollitia.
            </span>
            <span className="OD-make-desk">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              dignissimos dicta, quod aperiam doloremque eos veniam unde quas
              amet qui?
            </span>
          </div>
        </div>
      ))}
      <section className=" bg-light">
        <div>
          <h2 style={{paddingLeft:"2rem"}} className="fw-bolder">Related products</h2>
          <div className="outerCard">
            {simProduct.length != 0 ?<>
            {simProduct.slice(0, 4).map((item) => (
                <div
                  key={item.orderId}
                  className="cards"
                >
                  <img
                    onClick={() =>
                      handleOrderDetails(item.orderId, item.category)
                    }
                    className="cardImg"
                    src={item.images}
                    alt="shiloh bridals"
                  />
                 <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () => toast.warn('please login first')
                  }
                >
                  {likedData.find(
                    (newItem) => newItem.orderId === item.orderId
                  ) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </Link>
                  <p
                    className="pc-desc"
                    onClick={() =>
                      handleOrderDetails(item.orderId, item.category)
                    }
                  >
                    {item.category}
                  </p>
                  <h6 className="pc-desc">
                    Price : {item.actualPrice}
                    <del className="delete"> {item.discount}% off </del>
                  </h6>
                  {(cartDataNew.length !== 0) && (localStorage.getItem('token'))  ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId)? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId).quantity
                          }
                        </span>
                        <AiFillPlusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "+")}
                        />
                      </div>
                    ) : (
                      <button className="btn-card" onClick={() => handleAddProd(item.orderId)}>
                        Add
                      </button>
                    )}
                  </div>
                ) : (
                  <button className="btn-card" onClick={!localStorage.getItem('token')?()=>notify():() => handleAddProd(item.orderId)}>
                    Add
                  </button>
                )}
                </div>
              ))}
            </>:""
              }
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;

