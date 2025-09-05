import HeroImg from "../../assets/hero.jpg";

const HeroImage = () => {
  return (
    <div className="mt-12.5">
      <img
        className="w-full object-cover object-center h-[651px]"
        src={HeroImg}
        alt="Hero image"
      />
    </div>
  );
};

export default HeroImage;
