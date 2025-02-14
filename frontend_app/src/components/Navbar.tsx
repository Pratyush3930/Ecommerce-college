import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchInput from "./SearchInput";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const {cartFilled} = useAppContext();
  //react router navigation
  const navigate = useNavigate();
  const location = useLocation();

  const advertisements = [
    "https://img.lazcdn.com/us/domino/d1caae22-694c-4b8f-ab28-5d1ddc41b2f0_NP-1976-688.jpg_2200x2200q80.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg",
    "https://img.lazcdn.com/us/domino/ec0d415b-046e-498b-8621-b55dd0240830_NP-1976-688.jpg_2200x2200q80.jpg",
  ];

  return (
    <div className="flex flex-col">
      {/* Banner */}
      {isBannerVisible &&  location.pathname === '/' && (
        <div className="relative h-[50%] bg-gray-500">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            {advertisements.map((ad, index) => (
              <div key={index} className="h-[60%]">
                <img
                  src={ad}
                  alt={`Advertisement ${index + 1}`}
                  className="w-full lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] object-cover"
                />
              </div>
            ))}
          </Carousel>
          <button
            className="absolute top-2 right-4 bg-white text-gray-800 p-2 rounded-md hover:bg-gray-300"
            onClick={() => setIsBannerVisible(false)}
          >
            Close
          </button>
        </div>
      )}

      {!isBannerVisible && location.pathname === '/' && (
        <div
          className="h-12 bg-gray-200 text-gray-800 p-2 hover:bg-gray-300 cursor-pointer flex justify-center items-center"
          onClick={() => setIsBannerVisible(true)}
        >
          Open
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-700 text-white shadow-md ">
        {/* Left Side: Logo and Nav Links */}
        <div className="flex items-center space-x-12">
          <div className="text-3xl font-bold text-gray-300 cursor-pointer hover:text-white">
            Logo
          </div>
          <ul className="flex space-x-8">
            <li className="cursor-pointer hover:text-gray-300 transition duration-300" onClick={() => navigate("/") }>
              Home
            </li>
            <li className="cursor-pointer hover:text-gray-300 transition duration-300">
              About
            </li>
            <li className="cursor-pointer hover:text-gray-300 transition duration-300">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Right Side: Search and Cart */}
        <div className="flex items-center space-x-8">
          {/* Search Bar */}
          <div>
            <SearchInput />
          </div>
          <span className="cursor-pointer hover:text-gray-300 transition duration-300 text-wrap max-w-12" onClick={() => navigate("/orders") }>
              Your Orders
            </span>
          {/* Cart Icon with Cart Count */}
          <div className="relative cursor-pointer">
            <span onClick={() => navigate("/cart")}>
              <ShoppingCartIcon fontSize="large" />
            </span>
            {cartFilled && (
              <span className="absolute top-[-2px] right-[-2px] bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"></span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
