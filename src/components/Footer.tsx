import { Link } from "react-router-dom";
import LogoWhite from "../assets/logo-white.png";

const Footer = () => {
  return (
    <div className="bg-[#3E54EB] py-7.5">
      <div className="container mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <Link to="/">
              <img src={LogoWhite} alt="Real Estate logo" />
            </Link>
            <p className="text-white text-base mt-5 max-w-72.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
              tempus felis vitae sit est quisque.
            </p>
          </div>
          <div>
            <div className="text-white font-bold text-lg mb-5">About</div>
            <nav className="flex flex-col gap-5">
              <Link to="/" className="text-white text-base hover:underline">
                About Us
              </Link>
              <Link
                to="/properties"
                className="text-white text-base hover:underline"
              >
                Properties
              </Link>
              <Link to="/" className="text-white text-base hover:underline">
                Contact Us
              </Link>
            </nav>
          </div>
          <div>
            <div className="text-white font-bold text-lg mb-5">Service</div>
            <nav className="flex flex-col gap-5">
              <Link to="/" className="text-white text-base hover:underline">
                Payment & Tax
              </Link>
              <Link
                to="/properties"
                className="text-white text-base hover:underline"
              >
                Features
              </Link>
              <Link to="/" className="text-white text-base hover:underline">
                View Booking
              </Link>
            </nav>
          </div>
          <div>
            <div className="text-white font-bold text-lg mb-5">
              Our Location
            </div>
            <p className="text-white text-base">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white my-7.5"></div>
        <div className="text-center text-white text-base">
          Copyright 2025 bitway. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
