import { useFilterStore } from "../../store/filterStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FiltersSidebar = () => {
  const {
    location,
    setLocation,
    deal_type,
    setDealType,
    type,
    setType,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (deal_type) params.set("deal_type", deal_type);
    if (type) params.set("type", type);
    if (bedrooms) params.set("bedrooms", bedrooms.toString());
    if (bathrooms) params.set("bathrooms", bathrooms.toString());
    if (priceRange[0]) params.set("priceMin", priceRange[0].toString());
    if (priceRange[1]) params.set("priceMax", priceRange[1].toString());

    const newSearch = params.toString();
    const currentSearch = window.location.search.slice(1);

    if (newSearch !== currentSearch) {
      navigate(`/properties?${newSearch}`, { replace: true });
    }
  }, [location, priceRange, deal_type, type, bedrooms, bathrooms]);

  return (
    <aside className="w-full md:w-65 xl:w-80 bg-white border rounded shadow p-6 space-y-6 h-[765px]">
      <div>
        <label className="font-semibold text-sm text-gray-700">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded"
          placeholder="California, etc"
        />
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-700">
          Property Type
        </label>
        <select
          value={deal_type}
          onChange={(e) => setDealType(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded"
        >
          <option value="">Any</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-700">
          Categories
        </label>
        <div className="flex flex-col gap-2 mt-2">
          {["Apartment", "Villa", "Duplex", "Houses", "Penthouse"].map(
            (cat) => (
              <label key={cat} className="inline-flex items-center">
                <input
                  type="radio"
                  checked={type.includes(cat.toLowerCase())}
                  onChange={() => setType(cat.toLowerCase())}
                />
                <span className="ml-2">{cat}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-700">Bedrooms</label>
        <select
          value={bedrooms ?? ""}
          onChange={(e) => setBedrooms(Number(e.target.value) || null)}
          className="mt-1 w-full px-3 py-2 border rounded"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}+ Beds
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-700">Bathrooms</label>
        <select
          value={bathrooms ?? ""}
          onChange={(e) => setBathrooms(Number(e.target.value) || null)}
          className="mt-1 w-full px-3 py-2 border rounded"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}+ Baths
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-semibold text-sm text-gray-700">
          Price Range
        </label>
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-1/2 px-2 py-1 border rounded"
            placeholder="Min"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-1/2 px-2 py-1 border rounded"
            placeholder="Max"
          />
        </div>
      </div>
      <button
        onClick={() => {
          resetFilters();
          navigate("/properties", { replace: true }); // убираем query
        }}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FiltersSidebar;
