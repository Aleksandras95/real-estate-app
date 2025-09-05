import type { Feature } from "../../types/Feature";

interface Props {
  feature: Feature;
}

const FeatureItem = ({ feature }: Props) => {
  return (
    <div className="pb-5 border-b border-solid border-b-[#A4A6AC33] w-[573px]">
      <div className="bg-[#3E54EB0D] rounded-[10px] flex items-center justify-center w-12.5 h-12.5 mb-4">
        <img src={feature.icon} alt={feature.title} />
      </div>
      <h3 className="text-xl font-bold text-[#0F1015] mb-[5px]">
        {feature.title}
      </h3>
      <p className="text-base text-[#A4A6AC] max-w-[467px]">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureItem;
