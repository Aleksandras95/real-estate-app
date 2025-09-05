import { useNavigate, useSearchParams } from "react-router-dom";

const SortMenu = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    navigate(`/properties?${params.toString()}`, { replace: true });
  };

  return (
    <div className="flex justify-end items-center gap-2 mb-4">
      <span className="text-sm text-gray-600">Shot by Price:</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="border px-3 py-1.5 rounded text-sm"
      >
        <option value="">Default</option>
        <option value="price_asc">Low to High</option>
        <option value="price_desc">High to Low</option>
        <option value="date_desc">Newest First</option>
      </select>
    </div>
  );
};

export default SortMenu;
