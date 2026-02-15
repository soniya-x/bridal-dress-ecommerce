import React, { useState, useEffect } from "react";
import "../Assets/CSS/Filter.css";

const Filter = ({ data, sendData,onClose}) => {
  const [price,setPrice]=useState(100);
  const [sortBy,setSortBy]=useState(null);
  const [discount,setDiscount]=useState(null)

  const filter = data;


  const handleApply = ()=>{
    const obj = {
      price:price,
      sortBy:sortBy,
      discount:discount
    }
    sendData(obj);
    onClose()
  }

  const handleClearAll = ()=>{
    setPrice(100)
    setSortBy(null)
    setSortBy(null)
    onClose()
  }
  return (
    <div>
      <div className="f-main">
        <div className="f-first">
          <p className="f-p">Filters</p>
          <button className="f-btn" onClick={()=>{handleApply()}} style={{ color: "green" }}>
            Apply
          </button>
          <button className="f-btn" onClick={handleClearAll} style={{ color: "orangered" }}>
            Clear All
          </button>
        </div>
        <div className="f-second">
          <label for="price"> Price</label>
          <input type="range" min="100" max="20000"  onChange={(e)=>setPrice(e.target.value)} className="f-range"></input>
         <p>{price}</p>
        </div>
        <div className="f-sortby">
          <p>Sort By</p>
          <div>
            <input className="f-s-input" type="radio" onChange={(e)=>setSortBy(e.target.value)} name="sortby" value="1" />
            <label className="f-s-lable" for="Popularity">
              Popularity
            </label>
          </div>
          <div>
            <input className="f-s-input" type="radio" onChange={(e)=>setSortBy(e.target.value)}  name="sortby" value="2" />
            <label className="f-s-lable" for="LowToHigh">
              Price : Low to High
            </label>
          </div>
          <div>
            <input className="f-s-input" onChange={(e)=>setSortBy(e.target.value)}  type="radio" name="sortby" value="3" />
            <label className="f-s-lable" for="HighToLow">
              Price : High to Low
            </label>
          </div>
          <div>
            <input className="f-s-input" onChange={(e)=>setSortBy(e.target.value)}  type="radio" name="sortby" value="4" />
            <label className="f-s-lable" for="NewArrivels">
              New Arrivels
            </label>
          </div>
          <div className="f-sortby">
            <p>Discount</p>
            <div>
              <input type="radio"  onChange={(e)=>setDiscount(e.target.value)} name="discount" value="50" />
              <label className="f-s-lable" for="50">
                50% or More
              </label>
            </div>
            <div>
              <input type="radio" onChange={(e)=>setDiscount(e.target.value)} name="discount" value="40" />
              <label className="f-s-lable" for="40">
                40% or More
              </label>
            </div>
            <div>
              <input type="radio" onChange={(e)=>setDiscount(e.target.value)} name="discount" value="30" />
              <label className="f-s-lable" for="30">
                30% or More
              </label>
            </div>
            <div>
              <input type="radio" onChange={(e)=>setDiscount(e.target.value)} name="discount" value="20" />
              <label className="f-s-lable" for="20">
                20% or More
              </label>
            </div>
            <div>
              <input type="radio" onChange={(e)=>setDiscount(e.target.value)} name="discount" value="10" />
              <label className="f-s-lable" for="10">
                10% or More
              </label>
            </div>
            <div>
              <input type="radio" onChange={(e)=>setDiscount(e.target.value)} name="discount" value="1" />
              <label className="f-s-lable" for="1">
                10% or below
              </label>
            </div>
          </div>
          <div>
            <p>Brand</p>
            <input type="checkbox" name="brand" value="brand" />
          </div>
        </div>
      </div>
      {filter && (
        <div className="f-s">
          <div className="f-main-2">
            <div className="f-first">
              <p className="f-p">Filters</p>
              <button className="f-btn" onClick={()=>{handleApply();onClose()}} style={{ color: "green" }}>
                Apply
              </button>
              <button className="f-btn" onClick={()=>{handleClearAll();onClose()}}  style={{ color: "orangered" }}>
                Clear All
              </button>
            </div>
            <div className="f-second">
              <label for="price"> Price</label>
              <input 
                type="range"
                min="10"
                max="100000" onChange={(e)=>setPrice(e.target.value)}
                className="f-range"
              ></input>
            </div>
            <div className="f-sortby">
              <p>Sort By</p>
              <div>
                <input
                  className="f-s-input"
                  type="radio"
                  name="sortby"
                  value="1" onChange={(e)=>setSortBy(e.target.value)}
                />
                <label className="f-s-lable" for="Popularity">
                  Popularity
                </label>
              </div>
              <div>
                <input
                  className="f-s-input"
                  type="radio"
                  name="sortby"
                  value="2" onChange={(e)=>setSortBy(e.target.value)}
                />
                <label className="f-s-lable" for="LowToHigh">
                  Price : Low to High
                </label>
              </div>
              <div>
                <input
                  className="f-s-input"
                  type="radio"
                  name="sortby"
                  value="3" onChange={(e)=>setSortBy(e.target.value)}
                />
                <label className="f-s-lable" for="HighToLow">
                  Price : High to Low
                </label>
              </div>
              <div>
                <input
                  className="f-s-input"
                  type="radio"
                  name="sortby"
                  value="4" onChange={(e)=>setSortBy(e.target.value)}
                />
                <label className="f-s-lable" for="NewArrivels">
                  New Arrivels
                </label>
              </div>
              <div className="f-sortby">
                <p>Discount</p>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)} value="50" />
                  <label className="f-s-lable" for="50">
                    50% or More
                  </label>
                </div>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)} value="40" />
                  <label className="f-s-lable" for="40">
                    40% or More
                  </label>
                </div>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)} value="30" />
                  <label className="f-s-lable" for="30">
                    30% or More
                  </label>
                </div>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)}  value="20" />
                  <label className="f-s-lable" for="20">
                    20% or More
                  </label>
                </div>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)} value="10" />
                  <label className="f-s-lable" for="10">
                    10% or More
                  </label>
                </div>
                <div>
                  <input type="radio" name="discount" onChange={(e)=>setDiscount(e.target.value)} value="1" />
                  <label className="f-s-lable" for="1">
                    10% or below
                  </label>
                </div>
              </div>
              <div>
                <p>Brand</p>
                <input type="checkbox" name="brand" value="brand" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

{
  /* <Slider
        min={0}
        max={10000}
        step={50}
        value={sliderValue}
        orientation="horizontal"
        reverse={true}
        tooltip={true}
        labels={{}}
        handleLabel="String"
        format={() => null}
        onChangeStart={handleSliderStart}
        onChange={handleSliderChange}
        onChangeComplete={handleSliderComplete}
      />
      <p>Slider Value: {sliderValue}</p> */
}
