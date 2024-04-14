import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import saveIcon from "../../Assets/saveicon.png";
import savedIcon from "../../Assets/savedicon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "tailwind-scrollbar-hide";


function ProductsSaved() {
  const [products, setproducts] = useState([]);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const BASE_URL = "https://aguero.pythonanywhere.com";

  const token = localStorage.getItem("token");
        let config = null;
  
        if (token) {
          config = {
            headers: {
              Authorization: `JWT ${token}`,
              "Content-Type": "application/json",
            },
          };
        } else {
          console.error("Token not found in localStorage");
        }

  const getproducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/0/save`, config);
      console.log("res", response.data);
      setproducts(response.data)
      set
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(()=>{
    getproducts()
  },[products])

  console.log(products);
  products.map(product=>{
    console.log(product)
  })

  const scrollContainer = (scrollValue) => {
    const scrollElement = document.getElementById("scroll-content");
    console.log("Scrolling...");
    if (scrollElement) {
      scrollElement.scrollLeft += scrollValue;
      setScrollLeft(scrollElement.scrollLeft);
      console.log("scrollLeft:", scrollElement.scrollLeft);
    }
  };

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  const toggleSaved = (productId) => {
    if (savedProducts.includes(productId)) {
      setSavedProducts(savedProducts.filter((id) => id !== productId));
    } else {
      setSavedProducts([...savedProducts, productId]);
    }
  };

  const isSaved = (productId) => savedProducts.includes(productId);

  const lineStyle = {
    width: isHovered ? "35%" : "0%",
    height: "2px",
    backgroundColor: "rgb(11, 11, 63)",
    display: "block",
    margin: "8px auto",
    transition: "width 0.7s",
  };
  const saveIconStyle = {
    display: isHovered ? "block" : "none",
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "white",
    borderRadius: "50%",
    padding: "5px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  const scrollButtonStyle = {
    marginTop: "-100px",
    fontSize: "30px",
  };

  return (
    <div className="p-8 relative bg-sky-50">
      <div className="text-center font-bold text-3xl my-12 relative">
        <p
          className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-light text-lg">PRODUCTS</span>
          <br />
          <span className=" text-5xl text-gray-900"> Saved Products</span>
        </p>
        <span style={lineStyle}></span>
      </div>

      {products.length !== 0 ? (
        <div className="flex items-center justify-center space-x-4">
          <button
            className="px-4 py-2 "
            onClick={() => scrollContainer(-100)}
            style={scrollButtonStyle}
          >
            <FaChevronLeft />
          </button>
          <div
            id="scroll-content"
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide space-x-6 relative"
            style={{ scrollBehavior: "smooth", scrollLeft: scrollLeft + "px" }}
          >
            {products.map((each) => (
              <Link to={`/product/${each.product.id}`} key={each.product.id}>
                <div
                  key={each.product.id}
                  className="w-64  rounded-xl p-2 mb-4 relative hover:scale-110 hover:opacity-90 transition duration-300 ease-in-out cursor-pointer shadow-lg"
                  onMouseEnter={() => handleMouseEnter(each.product.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor:
                      isHovered && hoveredImage === each.product.id
                        ? "#E5E7EB"
                        : "white",
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    <div className="w-64 h-64 overflow-hidden mb-2 relative rounded-lg">
                      <img
                        src={each.product.image}
                        alt={each.product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {isHovered && hoveredImage === each.product.id && (
                        <img
                          src={isSaved(each.product.id) ? savedIcon : saveIcon}
                          alt="Save"
                          style={saveIconStyle}
                          onClick={() => toggleSaved(each.product.id)}
                        />
                      )}
                    </div>
                    <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">
                      {each.product.title}
                    </p>
                    <p className="text-gray-600">{each.product.rating} stars</p>
                    <p className="text-gray-600 text-center">
                      Price: ${each.product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button
            className="px-4 py-2 "
            onClick={() => scrollContainer(100)}
            style={scrollButtonStyle}
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <p>No saved products yet</p>
      )}
    </div>
  );
}

export default ProductsSaved;
