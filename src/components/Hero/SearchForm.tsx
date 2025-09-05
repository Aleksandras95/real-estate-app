import { useNavigate } from "react-router-dom";
import { locations, propertyTypes, prices } from "../../utils/searchOptions";
import { useFilterStore } from "../../store/filterStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import locationIcon from "../../assets/location.svg";
import home from "../../assets/home.svg";
import coin from "../../assets/coin.svg";
import search from "../../assets/search.svg";

const SearchForm = () => {
  const navigate = useNavigate();

  const {
    location,
    price,
    type,
    setLocation,
    setPrice,
    setType,
    setPriceRange,
  } = useFilterStore();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (location) queryParams.append("location", location);
    if (price) {
      const numericPrice = Number(price);
      setPriceRange([0, numericPrice]);
      queryParams.append("priceMin", "0");
      queryParams.append("priceMax", price);
    }
    if (type) queryParams.append("type", type);

    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <div className="absolute bottom-[-50px] transform bg-[#3E54EB] p-6 rounded-lg shadow-lg w-[945px] h-[100px] flex items-center text-white">
      <div className="flex flex-row gap-4 justify-between items-center w-full">
        {/* Location */}
        <div className="flex items-center p-4 w-58">
          <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center mr-4 flex-none">
            <img src={locationIcon} alt="Location icon" />
          </div>

          <div className="flex flex-col text-white">
            <span className="font-semibold mb-1">Location</span>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-39 bg-transparent border-none px-0 text-white appearance-none shadow-none customSelect">
                <SelectValue
                  placeholder="Select Location"
                  className="text-white"
                />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-[1px] h-[60px] bg-[#FFFFFF1A]"></div>

        {/* Price */}
        <div className="flex items-center p-4 rounded-lg w-58">
          <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center mr-4 flex-none">
            <img src={coin} alt="price icon" />
          </div>

          <div className="flex flex-col text-white">
            <span className="font-semibold mb-1">Price</span>
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="w-39 bg-transparent border-none px-0 text-white appearance-none shadow-none customSelect outline-none">
                <SelectValue
                  placeholder="Select Price"
                  className="text-white"
                />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {prices.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-[1px] h-[60px] bg-[#FFFFFF1A]"></div>

        {/* Type */}
        <div className="flex items-center p-4 rounded-lg w-58">
          <div className="w-[60px] h-[60px] bg-white/20 rounded-full flex items-center justify-center mr-4 flex-none">
            <img src={home} alt="Property" />
          </div>

          <div className="flex flex-col text-white">
            <span className="font-semibold mb-1">Type of Property</span>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-39 bg-transparent border-none px-0 text-white appearance-none shadow-none customSelect">
                <SelectValue placeholder="Select Type" className="text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {propertyTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value.toLowerCase()}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="bg-white text-blue-600 w-14 h-14 rounded-[10px] font-semibold flex items-center justify-center cursor-pointer"
        >
          <img src={search} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
