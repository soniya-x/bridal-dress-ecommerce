import React, { useEffect, useState } from "react";
import "../Assets/CSS/wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import { data, likedData } from "../data";
import {
  AiFillHeart,
  AiFillMinusSquare,
  AiFillPlusSquare,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCartOrderList, setLikedData } from "../redux/actions/actions";

const WishList = () => {
  const [likedOrder, setLikedOrder] = useState([]);
  const [likeData, setLikeData] = useState([]);

  const dispatch = useDispatch();
  const likedDataAll = useSelector((state) => state.likedData.likedData);
  const mobile = useSelector((state) => state.mobileNo);
  const [CartDataFull, setCartDataFull] = useState([]);
  const [addProd, setAddProd] = useState(0);
  const cartDataNew = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      var newArr = [];
      for (var i = 0; i < cartDataNew.length; i++) {
        if (cartDataNew[i].quantity !== 0) {
          newArr.push(cartDataNew[i]);
        }
      }
      dispatch(setCartOrderList(newArr));
      setAddProd(0);
    };
    fetchData();
  }, [addProd]);

  useEffect(() => {
    setCartDataFull(cartDataNew);
  }, [cartDataNew]);

  useEffect(() => {
    const fetchData = () => {
      setLikeData(likedDataAll);
    };
    fetchData();
  }, [likedDataAll]);

  useEffect(() => {
    const fetchData = () => {
      var newArr = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < likeData.length; j++) {
          if (data[i].orderId === likeData[j].orderId) {
            newArr.push(data[i]);
          }
        }
      }
      setLikedOrder(newArr);
    };
    fetchData();
  }, [likeData]);

  const handleRemoveLike = (orderId) => {
    const updatedLikedData = likeData.filter(
      (item) => item.orderId !== orderId
    );

    dispatch(setLikedData(updatedLikedData));
  };

  const handleChangeQuantity = (orderId, sign) => {
    setAddProd(addProd + 1);
    var newArr = [];
    for (let i = 0; i < CartDataFull.length; i++) {
      if (sign === "+") {
        if (CartDataFull[i].orderId === orderId) {
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
        if (CartDataFull[i].orderId === orderId) {
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
  };

  const handleAddProd = (orderId) => {
    setAddProd(addProd + 1);
    var count = 0;
    for (let i = 0; i < cartDataNew.length; i++) {
      if (cartDataNew[i].orderId === orderId) {
        if (cartDataNew[i].quantity === 0) {
          cartDataNew[i].quantity = 1;
        }
        count = count + 1;
      }
    }
    if (count === 0) {
      const obj = {
        mobile: mobile,
        orderId: orderId,
        quantity: 1,
      };
      const newData = [...cartDataNew, obj];
      dispatch(setCartOrderList(newData));
    }
  };
  const handleOrderDetails = (orderId, category) => {
    navigate("/orderdetails", { state: { orderId, category } });
  };

  return (
    <div className="WL-main">
      <div className="back">
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>
      <div className="ID-link">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Home {">"} <span style={{ color: "red" }}>WishList</span>
        </Link>
      </div>

      <div className="ID-main">
        {likedData.length > 0 ? (
          <div className="outerCard ID-cards">
            {likedOrder.map((item) => (
              <div key={item.orderId} className="cards ">
                <img
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                  className="cardImg"
                  src={item.images}
                  alt="Denim Jeans"
                />
                <Link className="pc-Heart">
                  <AiFillHeart onClick={() => handleRemoveLike(item.orderId)} />
                </Link>
                <p className="pc-desc">{item.category}</p>
                <h6 className="pc-desc">
                  Price : {item.actualPrice}
                  <del className="delete"> {item.discount}% off </del>
                </h6>
                {/* <button className="btn-card">Add</button> */}
                {cartDataNew.length !== 0 && localStorage.getItem("token") ? (
                  <div>
                    {cartDataNew.find(
                      (newItem) => newItem.orderId === item.orderId
                    ) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() =>
                            handleChangeQuantity(item.orderId, "-")
                          }
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find(
                              (newItem) => newItem.orderId === item.orderId
                            ).quantity
                          }
                        </span>
                        <AiFillPlusSquare
                          className="cart-items-inc"
                          onClick={() =>
                            handleChangeQuantity(item.orderId, "+")
                          }
                        />
                      </div>
                    ) : (
                      <button
                        className="btn-card"
                        onClick={() => handleAddProd(item.orderId)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    className="btn-card"
                    onClick={() => handleAddProd(item.orderId)}
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : 
          <div> No liked order Avalible </div>
        }
      </div>
    </div>
  );
};

export default WishList;
