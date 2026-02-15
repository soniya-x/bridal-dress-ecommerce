import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import bridalNew2 from "../Assets/Images/bridalNew2.png";
import bridalNew4 from "../Assets/Images/bridalNew4.png";
import bridalNew3 from "../Assets/Images/bridalNew3.png";

const data = [
  {
    image: bridalNew2,
    caption: "Ethereal Dreams",
    description:
      "Turning Your Wedding Fantasies into Reality with this Princess-Style Bridal Outfit",
  },
  {
    image: bridalNew4,
    caption: "Graceful Glamour",
    description:
      "A Bridal Ensemble that Radiates Princess Vibes and Timeless Beauty",
  },
  {
    image: bridalNew3,
    caption: "Enchanting Elegance",
    description:
      "Step into a Fairytale with this Princess-Inspired Bridal Gown",
  },
];

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ height: "50%" }}
    >
      {data.map((slide) => (
        <Carousel.Item key={slide.caption}>
          <div className="hi-1st">
            <img
              className="mainImg"
              src={slide.image}
              alt={slide.caption}
            />
          </div>

          <Carousel.Caption>
            <h3>{slide.caption}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
// import Carousel from "react-bootstrap/Carousel";

// const data = [
//   {
//     image: require("../Assets/Images/bridalNew2.png"),
//     caption: "Ethereal Dreams",
//     description:
//       "Turning Your Wedding Fantasies into Reality with this Princess-Style Bridal Outfit",
//   },
//   {
//     image: require("../Assets/Images/bridalNew4.png"),
//     caption: "Graceful Glamour",
//     description:
//       "A Bridal Ensemble that Radiates Princess Vibes and Timeless Beauty",
//   },
//   {
//     image: require("../Assets/Images/bridalNew3.png"),
//     caption: "Enchanting Elegance",
//     description:
//       "Step into a Fairytale with this Princess-Inspired Bridal Gown",
//   },
// ];

// function HomeCarousel() {
//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex, e) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel
//       activeIndex={index}
//       onSelect={handleSelect}
//       style={{ height: "50%" }}
//     >
//       {data.map((slide, i) => {
//         return (
//           <Carousel.Item key={slide.description}>
//             <div className="hi-1st">
//               <img className="mainImg" src={slide.image} alt="main" />
//             </div>
//             <Carousel.Caption>
//               <h3>{slide.caption}</h3>
//               <p>{slide.description}</p>
//             </Carousel.Caption>
//           </Carousel.Item>
//         );
//       })}
//     </Carousel>
//   );
// }
// export default HomeCarousel;