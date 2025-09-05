import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div className="flex items-center gap-[80px]">
      <h1 className="text-6xl font-bold text-[#0F1015] leading-[75px] flex-1/2">
        Let’s start search for your dream home
      </h1>
      <div className="flex-1/3">
        <p className="text-xl text-[#0F1015] leading-normal mb-7.5">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <Link
          to="/"
          className="text-base text-white bg-[#3E54EB] hover:bg-[#0F1015] px-23 py-4 rounded-[10px]"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
