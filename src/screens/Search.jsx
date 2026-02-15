import React,{useState,useEffect} from "react";
import "../Assets/CSS/Search.css";
import { data } from "../data.js";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart,AiFillHeart,AiFillMinusSquare,AiFillPlusSquare } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setCartOrderList, setLikedData } from "../redux/actions/actions";
import { toast } from "react-toastify";


const Search = (props) => {

  const [addProd, setAddProd] = useState(0);

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
    setAddProd(addProd+1);
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
    setAddProd(addProd+1);
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

  const filtered = data.filter((v, i) => {
    if (props.data !== undefined) {
      return v.category.toLowerCase().includes(props.data.toLowerCase());
    }
  });

  const handleOrderDetails = (orderId, category) => {
    navigate("/orderdetails", { state: { orderId, category } });
  };

  const notify = ()=>toast.warn('please login first')

  return (
    <div className="s-main">
      {filtered.length !== 0 ? (
        <div>
          <div className="outerCard SearchouterCard">
            {filtered.length > 0 &&
              filtered.map((item) => (
                <div key={item.orderId} className="Searchcards">
                  <img
                  onClick={() =>
                    handleOrderDetails(item.orderId, item.category)
                  }
                    className="cardImg"
                    src={item.images}
                    alt="Denim Jeans"
                  />
                   <Link
                  className="pc-Heart"
                  onClick={
                    localStorage.getItem("token")
                      ? () => handleHeart(item.orderId)
                      : () =>toast.warn('please login first')
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
      ) : (
        <div className="s-main">
          <div className="empty-search">
            <div style={{fontSize:"2.5rem"}}>
            <BiSearch />
            </div>
            <div>
            Search
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;









