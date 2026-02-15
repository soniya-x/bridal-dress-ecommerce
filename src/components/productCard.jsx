import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiFillHeart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data, CartOrderData } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { setCartOrderList, setLikedData } from "../redux/actions/actions";
import { toast } from 'react-toastify';


const ProductCard = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [formalDress, setFormalDress] = useState([]);
  const [specialEventDress, setSpecialEventDress] = useState([]);
  const [eveningDress, setEveningDress] = useState([]);
  const [cocktailDress, setCocktailDress] = useState([]);
  const [weadingDress, setWeadingDress] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [addProd, setAddProd] = useState(0);
  const [addOid, setAddOid] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.mobileNo);
  const likedData = useSelector((state) => state.likedData.likedData);
  const cartDataNew = useSelector((state) => state.cartOrderDataList.cartOrderDataList);

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

  const handleAddProd = (orderId) => {
    setAddProd(addProd + 1);
    var count = 0;
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
  };

  const handleChangeQuantity = (orderId, sign) => {
    setAddProd(addProd + 1);
    var newArr = [];
    for (let i = 0; i < cartDataNew.length; i++) {
      if (sign == "+") {
        if (cartDataNew[i].orderId == orderId) {
          const obj = {
            mobile: mobile,
            orderId: orderId,
            quantity: cartDataNew[i].quantity + 1,
          };
          newArr.push(obj);
        } else {
          newArr.push(cartDataNew[i]);
        }
      } else if ((sign = "-")) {
        if (cartDataNew[i].orderId == orderId) {
          const obj = {
            mobile: mobile,
            orderId: orderId,
            quantity: cartDataNew[i].quantity - 1,
          };
          newArr.push(obj);
        } else {
          newArr.push(cartDataNew[i]);
        }
      }
    }
    dispatch(setCartOrderList(newArr));
  };

  useEffect(() => {
    setAllProduct(data);
    const fetchData = async () => {
      try {
        const orderCartData = CartOrderData;
        const combinedData = CartOrderData.concat(data);

        const uniqueItems = {};

        for (const item of combinedData) {
          if (!uniqueItems[item.orderId]) {
            uniqueItems[item.orderId] = item;
          } else if (item.quantity > 0) {
            uniqueItems[item.orderId] = item;
          }
        }

        const orderData = Object.values(uniqueItems);

        setAllProduct(orderData);
        const C1FormalDress = [];
        const C2SpecialEventDress = [];
        const C3EveningDress = [];
        const C4CocktailDress = [];
        const C5WeadingDress = [];
        const category = [];

        for (let i = 0; i < orderData.length; i++) {
          if (orderData[i].itemCategory === "Formal Dress") {
            C1FormalDress.push(orderData[i]);
          } else if (orderData[i].itemCategory === "Special Event Dress") {
            C2SpecialEventDress.push(orderData[i]);
          } else if (orderData[i].itemCategory === "Evening Dress") {
            C3EveningDress.push(orderData[i]);
          } else if (orderData[i].itemCategory === "Cocktail Dress") {
            C4CocktailDress.push(orderData[i]);
          } else if (orderData[i].itemCategory === "Weading Dress") {
            C5WeadingDress.push(orderData[i]);
          }
          category.push(orderData[i].itemCategory);
        }

        setFormalDress(C1FormalDress);
        setSpecialEventDress(C2SpecialEventDress);
        setEveningDress(C3EveningDress);
        setCocktailDress(C4CocktailDress);
        setWeadingDress(C5WeadingDress);

        const FilterCategory = new Set(category);
        const newSet = Array.from(FilterCategory);
        setAllCategory(newSet);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleViewAll = (item) => {
    navigate("/itemdetails", { state: item });
  };

  const handleHeart = (orderId) => {
    var count = 0;
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
  };

  const handleOrderDetails = (orderId, category) => {
    navigate("/orderdetails", { state: { orderId, category } });
  };
  const notify = () => toast.warn('Please Login First');

  return (
    <div>
      <div className="pc-main">
        <div className="pc-first">
          <span className="pc-cat">Formal Dress</span>
          <div
            className="link-btn"
            onClick={() => handleViewAll(formalDress[0].itemCategory)}
          >
            view all
          </div>
        </div>
        <div className="outerCard">
          {formalDress.length > 0 &&
            formalDress.slice(0, 5).map((item) => (
              <div key={item.orderId} className="cards">
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
                      : () => notify()
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

                {(cartDataNew.length !== 0) && (localStorage.getItem('token')) ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId)
                              .quantity
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
        </div>
      </div>

      <div className="pc-main">
        <div className="pc-first">
          <span className="pc-cat">Formal Dress</span>
          <div
            className="link-btn"
            onClick={() => handleViewAll(specialEventDress[0].itemCategory)}
          >
            view all
          </div>
        </div>
        <div className="outerCard">
          {specialEventDress.length > 0 &&
            specialEventDress.slice(0, 5).map((item) => (
              <div key={item.orderId} className="cards">
                <img
                  className="cardImg"
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                  src={item.images}
                  alt="Denim Jeans"
                />
                <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () => notify()
                  }
                >
                  {/* <AiOutlineHeart /> */}
                  {likedData.find(
                    (newItem) => newItem.orderId === item.orderId
                  ) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </Link>
                <p className="pc-desc">{item.category}</p>
                <h6
                  className="pc-desc"
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                >
                  Price : {item.actualPrice}
                  <del className="delete"> {item.discount}% off </del>
                </h6>
                {(cartDataNew.length !== 0) && (localStorage.getItem('token')) ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId)
                              .quantity
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
        </div>
      </div>

      <div className="pc-main">
        <div className="pc-first">
          <span className="pc-cat">Formal Dress</span>
          <div
            className="link-btn"
            onClick={() => handleViewAll(eveningDress[0].itemCategory)}
          >
            view all
          </div>
        </div>
        <div className="outerCard">
          {eveningDress.length > 0 &&
            eveningDress.slice(0, 5).map((item) => (
              <div key={item.orderId} className="cards">
                <img
                  className="cardImg"
                  src={item.images}
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                  alt="Denim Jeans"
                />
                <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () => notify()
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
                {(cartDataNew.length !== 0) && (localStorage.getItem('token')) ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId)
                              .quantity
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
        </div>
      </div>

      <div className="pc-main">
        <div className="pc-first">
          <span className="pc-cat">Formal Dress</span>
          <div
            className="link-btn"
            onClick={() => handleViewAll(cocktailDress[0].itemCategory)}
          >
            view all
          </div>
        </div>
        <div className="outerCard">
          {cocktailDress.length > 0 &&
            cocktailDress.slice(0, 5).map((item) => (
              <div key={item.orderId} className="cards">
                <img
                  className="cardImg"
                  src={item.images}
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                  alt="Denim Jeans"
                />
                <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () => notify()
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
                {(cartDataNew.length !== 0) && (localStorage.getItem('token')) ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId)
                              .quantity
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
        </div>
      </div>

      <div className="pc-main">
        <div className="pc-first">
          <span className="pc-cat">Formal Dress</span>
          <div
            className="link-btn"
            onClick={() => handleViewAll(weadingDress[0].itemCategory)}
          >
            view all
          </div>
        </div>
        <div className="outerCard">
          {weadingDress.length > 0 &&
            weadingDress.slice(0, 5).map((item) => (
              <div key={item.orderId} className="cards">
                <img
                  className="cardImg"
                  src={item.images}
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                  alt="Denim Jeans"
                />
                <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () => notify()
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
                <p className="pc-desc">{item.category}</p>
                <h6
                  className="pc-desc"
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                >
                  Price : {item.actualPrice}
                  <del className="delete"> {item.discount}% off </del>
                </h6>

                {(cartDataNew.length !== 0) && (localStorage.getItem('token')) ? (
                  <div>
                    {cartDataNew.find((newItem) => newItem.orderId === item.orderId) ? (
                      <div className="cart-items-inc-btn">
                        <AiFillMinusSquare
                          className="cart-items-inc"
                          onClick={() => handleChangeQuantity(item.orderId, "-")}
                        />
                        <span className="cart-count">
                          {
                            cartDataNew.find((newItem) => newItem.orderId === item.orderId)
                              .quantity
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;