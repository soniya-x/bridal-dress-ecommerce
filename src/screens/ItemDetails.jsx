import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineHeart,AiFillMinusSquare,AiFillPlusSquare, AiFillHeart } from "react-icons/ai";
import { MdFilterList } from "react-icons/md";
import { data } from "../data";
import Filter from "../components/Filter";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCartOrderList, setLikedData } from "../redux/actions/actions";
import { toast } from "react-toastify";

const ItemDetails = () => {
  const [simProduct, setSimProduct] = useState([]);
  const [showNow, setShowNow] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [fitlData, setFiltData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");
  const location = useLocation();
  const itemCategory = location.state;
  const [categorynew, setCategoryNew] = useState(itemCategory);
  const likedData = useSelector((state) => state.likedData.likedData);
  const mobile = useSelector((state) => state.mobileNo);
  const dispatch = useDispatch();
  const [CartDataFull, setCartDataFull] = useState([]);
  const [addProd,setAddProd] = useState(0);

  const navigate = useNavigate();
  const cartDataNew = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList
  );

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
  }, [cartDataNew]);

  useEffect(() => {
    if (itemCategory !== null) {
      setCategoryNew(itemCategory);
    }
  }, [itemCategory]);

  const handleChildData = (data) => {
    setFilterData(data);
    setShowNow(false);
  };

  useEffect(() => {
    const fetchData = () => {
      const FiltArr = [];
      for (let i = 0; i < simProduct.length; i++) {
        if (
          filterData.price >= simProduct[i].actualPrice ||
          filterData.price === 100
        ) {
          if (
            filterData.discount <= simProduct[i].discount &&
            filterData.discount != 1
          ) {
            FiltArr.push(simProduct[i]);
          } else if (filterData.discount == 1) {
            if (simProduct[i].discount >= 1 && simProduct[i].discount <= 10) {
              FiltArr.push(simProduct[i]);
            }
          }
        }
      }
      const SortFunction = (arr) => {
        if (filterData.sortBy != null) {
          if (filterData.sortBy == 1) {
            return FiltArr.sort((a, b) => b.rating - a.rating);
          } else if (filterData.sortBy == 2) {
            return FiltArr.sort((a, b) => a.actualPrice - b.actualPrice);
          } else if (filterData.sortBy == 3) {
            return FiltArr.sort((a, b) => b.actualPrice - a.actualPrice);
          }
        }
      };
      SortFunction(FiltArr);
      setSimProduct(FiltArr);
    };
    fetchData();
  }, [filterData]);

  const handleFilter = () => {
    if (showNow === true) {
      setShowNow(false);
    } else if (showNow === false) {
      setShowNow(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allOrder = data;
      const simArr = [];
      for (let i = 0; i < allOrder.length; i++) {
        if (allOrder[i].itemCategory === itemCategory) {
          simArr.push(allOrder[i]);
        }
      }
      setSimProduct(simArr);
    };
    fetchData();
  }, [categorynew]);

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
      const filteredItems = likedData.filter(
        (item) => item.orderId !== orderId
      );
      dispatch(setLikedData(filteredItems));
    }
  };

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

  const handleOrderDetails = (orderId, category) => {
    navigate("/orderdetails", { state: { orderId, category } });
  };
  const notify = () => toast.warn('Please Login First');

  return (
    <div className="ID-f-Card">
      <div className="ID-link">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Home {">"} {categorynew}
        </Link>
        <div className="F-Icons">
          <MdFilterList onClick={onOpen} />
        </div>
      </div>
      <Drawer
        placement={placement}
        onClose={onClose}
        isOpen={isOpen}
        className="filter-drawer"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
          <DrawerBody>
            <div>
              <Filter
                data={showNow}
                sendData={handleChildData}
                onClose={onClose}
              />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className="ID-main">
        <div className="ID-filter">
          <Filter data={showNow} onClose={onClose} sendData={handleChildData} />
        </div>
        <div className="outerCard ID-cards">
        {simProduct.length > 0 ? <>{
                simProduct.map((item) => (
                  <div key={item.orderId} className="ID-cards-2">
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
                ))}</>:<div style={{width:"80vw", display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center"}}> Result Not Found</div>     }
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};
export default ItemDetails;

