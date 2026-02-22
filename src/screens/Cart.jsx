import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartOrderData, data } from "../data";
import "../Assets/CSS/Cart.css";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AddressAdd from "../components/AddressAdd";
import { setCartOrderList } from "../redux/actions/actions";

const CartData = () => {
  const [cartOrder, setCartOrder] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [CartDataFull, setCartDataFull] = useState([]);
  const [newCart, setNewCart] = useState([]);
  const [addProd, setAddProd] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModel = () => setShowModel(false);
  const cartDataNew = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList,
  );

  useEffect(() => {
    setCartDataFull(cartDataNew);
  }, [cartDataNew, addProd]);

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
  }, [CartDataFull, addProd]);

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
    };
    fetchData();
  }, [newCart]);

  useEffect(() => {
    const fetchData = () => {
      setCartOrder(CartOrderData);
    };
    fetchData();
  }, []);

  const handleChangeQuantity = (orderId, sign) => {
    setAddProd(addProd + 1);
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
  };

  const handleRemoveOrder = (oid) => {
    setAddProd(addProd + 1);
    const newArr = CartDataFull.filter((item) => item.orderId !== oid);
    dispatch(setCartOrderList(newArr));
  };

  return (
    <div>
      <div className="back">
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>

      <div className="cart-main">
        {newCart.length === 0 ? (
          <div className="cart-2nd-none">
            <div>My Order</div>
            <div>
              No order find on cart yet at this id .
              <Link to="/dashboard">Click</Link> here to continue shopping
            </div>
          </div>
        ) : (
          <div className="cart-2nd">
            <div className="cart-item">
              {newCart.map((item) => (
                <div className="cart-items" key={item.orderId}>
                  <img
                    src={item.images}
                    alt="product image "
                    className="cart-items-image"
                  />
                  <div className="cart-items-mid">
                    <p>{item.category} </p>
                    <span>Rs. {item.actualPrice}</span>
                  </div>
                  <div className="cart-items-last">
                    <div className="cart-items-inc-btn">
                      <AiFillMinusSquare
                        className="cart-items-inc"
                        onClick={() => handleChangeQuantity(item.orderId, "-")}
                      />
                      <span className="cart-count">
                        {CartDataFull.find(
                          (newItem) => newItem.orderId === item.orderId,
                        )?.quantity || 0}
                      </span>

                      <AiFillPlusSquare
                        className="cart-items-inc"
                        onClick={() => handleChangeQuantity(item.orderId, "+")}
                      />
                    </div>
                    <button
                      className="cart-btn-remove "
                      onClick={() => handleRemoveOrder(item.orderId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-bill">
              <div className="cart-bill-main">
                <div className="cart-bill-2nd">
                  <div style={{ width: "50%" }}>
                    Subtotal ({newCart.length} items)
                  </div>
                  <div>:</div>
                  <div>Rs. {totalprice}</div>
                </div>
                <div className="cart-bill-2nd">
                  <div style={{ width: "50%" }}>Total Amount</div>
                  <div>:</div>
                  <div>Rs. {totalprice}</div>
                </div>
              </div>
              <div className="cart-bill-promo">
                <input
                  type="text"
                  className="cart-bill-input"
                  placeholder="Enter Promocode"
                />
                <button className="cart-bill-apply">Apply</button>
              </div>
              <button
                className="cart-bill-checkout"
                onClick={() => setShowModel(true)}
              >
                Proceed to Checkout
              </button>
            </div>
            {showModel && <AddressAdd model={closeModel} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartData;
