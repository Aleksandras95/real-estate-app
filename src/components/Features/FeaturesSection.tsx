import FeatureList from "./FeatureList";
import FeatureMan from "../../assets/feature-man.png";

const FeaturesSection = () => {
  const features = [
    {
      id: 0,
      title: "Best Platform",
      description:
        "Using it can make you sound like you have been studying english for a long time. Here’s the challenge",
      icon: "/assets/medal.svg",
    },
    {
      id: 1,
      title: "Guaranteed Service",
      description:
        "Using it can make you sound like you have been studying english for a long time. Here’s the challenge",
      icon: "/assets/home-setting.svg",
    },
    {
      id: 2,
      title: "Verified Platform",
      description:
        "Using it can make you sound like you have been studying english for a long time. Here’s the challenge",
      icon: "/assets/badge-percent.svg",
    },
  ];

  return (
    <div className="pt-37.5">
      <div className="container mx-auto relative">
        <div>
          <div className="pb-27">
            <h2 className="text-[#0F1015] font-bold text-4xl mb-2.5">
              Why should good house for you?
            </h2>
            <p className="text-[#A4A6AC] text-base mb-12.5">
              Using it can make you sound like you have been studying english
              <br></br>
              for a long time. Here’s the challenge
            </p>
            <FeatureList features={features} />
          </div>
          <img
            className="absolute bottom-0 right-0"
            src={FeatureMan}
            alt="feature-man"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
