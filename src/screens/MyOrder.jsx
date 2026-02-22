import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { data } from "../data";

const MyOrder = () => {
  const [placedOrder, setPlacedOrder] = useState([]);
  const [orderDataNew, setOrderDataNew] = useState([]);
  const [totalprice, setTotalPrice] = useState(200);
  const [shipCharge, setShipCharge] = useState(200);
  const [addressData, setAddressData] = useState([]);

  const location = useLocation();
  const addressNewData = location.state;
  const placedOrderNew = useSelector((state) => state.placedOrder.placedOrder);

  const navigate  = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      if (addressNewData && addressNewData.length > 0) {
        setAddressData(addressNewData);
      }
    };
    fetchData();
  }, [addressNewData]);

  useEffect(() => {
    const fetchData = () => {
      var price = 0;
      var priceOne = 1;
      for (var i = 0; i < orderDataNew.length; i++) {
        for (var j = 0; j < placedOrder.length; j++) {
          if (orderDataNew[i].orderId === placedOrder[j].orderId) {
            priceOne = orderDataNew[i].actualPrice * placedOrder[j].quantity;
            price = price + priceOne;
            priceOne = 1;
          }
        }
      }
      setTotalPrice(price);
      const ship = placedOrder.length * 500;
      setShipCharge(ship);
    };
    fetchData();
  }, [orderDataNew]);

  useEffect(() => {
    const fetchData = () => {
      setPlacedOrder(placedOrderNew);
    };
    fetchData();
  }, [placedOrderNew]);

  useEffect(() => {
    const fetchData = () => {
      if (placedOrderNew && placedOrderNew.length > 0) {
        var newArr = [];
        for (var i = 0; i < placedOrderNew.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (data[j].orderId === placedOrderNew[i].orderId) {
              newArr.push(data[i]);
            }
          }
        }
        setOrderDataNew(newArr);
      }
    };
    fetchData();
  }, [placedOrderNew]);

  return (
    <div>
       <div className="back">
        <button onClick={() => navigate("/dashboard")}>Back</button>
      </div>
      <div className="App">Placed order List</div>
      {placedOrder && placedOrder.length > 0 ? (
        <div className="RO-02nd">
          <div className="RO-item-cart">
            {orderDataNew.length > 0 &&
              orderDataNew.map((item) => {
                const matchingOrder = placedOrderNew.filter((newItem) => newItem.orderId === item.orderId);
                const quantity = matchingOrder ? matchingOrder.quantity : 0; 
                return (
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
                    {quantity}
                  </div>
                </div>
              )}
              
              )}
          </div>
          <div className="RO-item-pay">
            {addressNewData && addressNewData.length > 0 ? (
              <>
                {addressNewData.map((item) => (
                  <div className="RO-item-pay-01st" key={item.addId}>
                    <p>Shipping Address</p>
                    <span>
                      {item.fName} {item.lName}
                    </span>
                    <span>Bholaram indore</span>
                    <span> indore</span>
                    <span>Madhya Pradesh</span>
                    <span>452004</span>
                  </div>
                ))}
              </>
            ) : (
              <p></p>
            )}

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
              <div className="RO-pay"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="App">
          <div>My Order</div>
          <div>
            No order yet at this id <Link to="/dashboard">Click</Link> here to
            continue shopping
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
