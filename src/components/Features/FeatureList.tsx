import type { Feature } from "../../types/Feature";
import FeatureItem from "./FeatureItem";

interface Props {
  features: Feature[];
}

const FeatureList = ({ features }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {features.map((feature) => (
        <FeatureItem feature={feature} key={feature.id} />
      ))}
    </div>
  );
};

export default FeatureList;
