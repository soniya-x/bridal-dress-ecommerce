import React, { useEffect, useState, useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch, BiLogIn } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { BsCart3, BsTruck } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";
import logo from "../Assets/Images/bride3.jpg";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Screens/Login";
import { ToastContainer, toast } from "react-toastify";
// import { CartOrderData } from "../data";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isHoverd, setIsHoverd] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");

  const CartOrderData = useSelector(
    (state) => state.cartOrderDataList.cartOrderDataList,
  );
  const navigate = useNavigate();

  const closeModel = () => {
    setShowModel(false);
  };

  const handleLogo = () => {
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleLogout);

    return () => {
      window.removeEventListener("beforeunload", handleLogout);
    };
  }, [window]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsHoverd(false);
  };

  const handleOver = () => setIsHoverd(true);
  const handelOut = () => {
    setTimeout(() => {
      setIsHoverd(false);
    }, 3000);
  };

  const notify = () =>
    toast.warn("Please Login First", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleMyOrder = () => {
    navigate("/myorder");
    setIsHoverd(false);
  };
  const handleCart = () => {
    navigate("/cart");
  };

  const handleForward = (itemCategory) => {
    navigate("/itemdetails", { state: itemCategory });
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <nav className="nav">
          <div className="logo-div">
            <img
              className="logo"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGgfOM2i3pnzYa1AGcg0p7ZjL_RRaAmfpHsakSwC9cl2KUTlEF"
              onClick={handleLogo}
              alt="Logo"
            />
          </div>
          <div className="menu-1st">
            <div className="menu-2nd">
              <div
                className="menu-pro"
                onClick={() => handleForward("Formal Dress")}
              >
                <Link className="Link">Formal Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Special Event Dress")}
              >
                <Link className="Link">Special Event Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Evening Dress")}
              >
                <Link className="Link">Evening Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Cocktail Dress")}
              >
                <Link className="Link">Cocktail Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => {
                  handleForward("Weading Dress");
                }}
              >
                <Link className="Link">Weading Dress</Link>
              </div>
            </div>
          </div>
          <div className="item-div">
            <select className="nav-sel">
              <option className="option">En</option>
            </select>
            <ul className="nav-ul nav-ul-b">
              <li className="nav-li">
                <Link to="/search" className="opt">
                  <BiSearch />
                </Link>
                {isHoverd && (
                  <div
                    onMouse
                    onMouseOver={handleOver}
                    onMouseOut={handelOut}
                    className="h-over"
                    style={{ fontSize: "1rem", position: "fixed" }}
                  >
                    <div className="h-ov" onClick={handleMyOrder}>
                      <BsTruck
                        style={{ paddingTop: ".25rem", fontSize: "1.75rem" }}
                      />{" "}
                      <p>My Order</p>
                    </div>
                    <div className="h-ov" onClick={handleLogout}>
                      {" "}
                      <BiLogIn
                        style={{ paddingTop: ".25rem", fontSize: "1.75rem" }}
                      />{" "}
                      <p>LogOut</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-li">
                <Link className="opt" to="/wishlist">
                  <AiOutlineHeart />
                </Link>
              </li>
              <li
                className="nav-li"
                onMouseOver={handleOver}
                onMouseOut={handelOut}
              >
                <Link onClick={() => setShowModel(true)} className="opt">
                  <FiUser />
                </Link>
              </li>
              <li className="nav-li">
                <Link className="opt" to="/cart" style={{ display: "flex" }}>
                  <BsCart3 onClick={handleCart} />{" "}
                  <sup
                    style={{
                      fontSize: "15px",
                      borderRadius: "50%",
                      color: "black",
                    }}
                  >
                    {CartOrderData.length > 0 ? (
                      <div>{CartOrderData.length}</div>
                    ) : (
                      ""
                    )}
                  </sup>
                </Link>
              </li>
            </ul>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <ul className="">
                    <li className="nav-li-2">
                      <Link to="/search" onClick={onClose} className="opt">
                        Search
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        to="/wishlist"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Like
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        to="/myorder"
                        onClick={() => {
                          onClose();
                        }}
                        className="opt"
                      >
                        myorder
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        onClick={() => {
                          handleLogout();
                          onClose();
                        }}
                      >
                        LogOut
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        to="/cart"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cart
                      </Link>
                    </li>

                    <br />
                    <p>Some Other Links</p>

                    <div className="">
                      <div
                        className=" "
                        onClick={() => {
                          handleForward("Formal Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Formal Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Special Event Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Special Event Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Evening Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Evening Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Cocktail Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Cocktail Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Weading Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Weading Dress</Link>
                      </div>
                    </div>
                  </ul>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <ul className="nav-ul nav-menu">
              <li className="nav-li">
                <Link onClick={onOpen} className="opt menu-click">
                  <FiMenu />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="nav">
          <div className="logo-div nav-ul">
            <img
              className="logo"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGgfOM2i3pnzYa1AGcg0p7ZjL_RRaAmfpHsakSwC9cl2KUTlEF"
              onClick={handleLogo}
              alt="Logo"
            />
          </div>
          <div className="menu-1st">
            <div className="menu-2nd">
              <div
                className="menu-pro"
                onClick={() => handleForward("Formal Dress")}
              >
                <Link className="Link">Formal Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Special Event Dress")}
              >
                <Link className="Link">Special Event Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Evening Dress")}
              >
                <Link className="Link">Evening Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => handleForward("Cocktail Dress")}
              >
                <Link className="Link">Cocktail Dress</Link>
              </div>
              <div className="menu-sp">|</div>
              <div
                className="menu-pro"
                onClick={() => {
                  handleForward("Weading Dress");
                }}
              >
                <Link className="Link">Weading Dress</Link>
              </div>
            </div>
          </div>
          <div className="item-div">
            <select className="nav-sel">
              <option className="option">En</option>
            </select>
            <ul className="nav-ul nav-ul-b">
              <li className="nav-li">
                <Link to="/search" className="opt">
                  <BiSearch />
                </Link>
                {isHoverd && (
                  <div
                    onMouseOver={handleOver}
                    onMouseOut={handelOut}
                    className="h-over"
                    style={{ fontSize: "1rem", position: "fixed" }}
                  >
                    <div className="h-ov" onClick={notify}>
                      <BsTruck
                        style={{ paddingTop: ".25rem", fontSize: "1.75rem" }}
                      />{" "}
                      <p>My Order</p>
                    </div>
                    <div className="h-ov" onClick={() => setShowModel(true)}>
                      {" "}
                      <BiLogIn
                        style={{ paddingTop: ".25rem", fontSize: "1.75rem" }}
                      />{" "}
                      <p>Login</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-li">
                <Link onClick={notify} className="opt">
                  <AiOutlineHeart />
                </Link>
              </li>
              <li
                className="nav-li "
                onMouseOver={handleOver}
                onMouseOut={handelOut}
              >
                <Link className="opt">
                  <FiUser />
                </Link>
              </li>
              {showModel && <Login closeModel={closeModel} />}
              <li className="nav-li">
                <Link className="opt" onClick={notify}>
                  <BsCart3 />
                </Link>
              </li>
            </ul>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                <DrawerBody>
                  <ul className="">
                    <li className="nav-li-2">
                      <Link to="/search" onClick={onClose} className="opt">
                        Search
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        onClick={() => {
                          notify();
                          onClose();
                        }}
                      >
                        Like
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        onClick={() => {
                          notify();
                          onClose();
                        }}
                      >
                        myorder
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        onClick={() => {
                          setShowModel(true);
                          onClose();
                        }}
                        className="opt"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-li-2">
                      <Link
                        className="opt"
                        onClick={() => {
                          notify();
                          onClose();
                        }}
                      >
                        Cart
                      </Link>
                    </li>

                    <br />
                    <p>Some Other Links</p>

                    <div className="">
                      <div
                        className=" "
                        onClick={() => {
                          handleForward("Formal Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Formal Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Special Event Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Special Event Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Evening Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Evening Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Cocktail Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Cocktail Dress</Link>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          handleForward("Weading Dress");
                          onClose();
                        }}
                      >
                        <Link className="Link">Weading Dress</Link>
                      </div>
                    </div>
                  </ul>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            {showModel && <Login closeModel={closeModel} />}
            <ul className="nav-ul nav-menu">
              <li className="nav-li">
                <Link onClick={onOpen} className="opt menu-click">
                  <FiMenu />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
