import HeroContent from "./HeroContent";
import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="relative pt-12.5">
      <div className="container mx-auto">
        <HeroContent />
      </div>
      <div className="customBg mt-12.5 relative">
        <div className="container mx-auto">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
