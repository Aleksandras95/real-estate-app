import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";
import PropertySkeleton from "../components/PropertySkeleton";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortMenu from "../components/SortMenu/SortMenu";
import FeaturedItem from "../components/Featured/FeaturedItem";
import Pagination from "../components/Pagination";
import type { Property, SortOption } from "../types/index";
import { ITEMS_PER_PAGE, SORT_OPTIONS, API_MESSAGES } from "../constants/index";
import { getErrorMessage } from "../lib/utils";

const PropertiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = ITEMS_PER_PAGE;
  const currentPage = Number(searchParams.get("page")) || 1;

  const location = searchParams.get("location");
  const deal_type = searchParams.get("deal_type");
  const type = searchParams.get("type");
  const bedrooms = Number(searchParams.get("bedrooms"));
  const bathrooms = Number(searchParams.get("bathrooms"));
  const priceMin = Number(searchParams.get("priceMin"));
  const priceMax = Number(searchParams.get("priceMax"));
  const sort = searchParams.get("sort");

  const handlePageChange = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const fetchFilteredProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("properties")
        .select("*", { count: "exact" })
        .range(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage - 1
        );

      if (location) query = query.ilike("location", `%${location}%`);
      if (deal_type) query = query.eq("deal_type", deal_type);
      if (type) query = query.eq("type", type);
      if (!isNaN(bedrooms) && searchParams.has("bedrooms")) {
        query = query.gte("bedrooms", bedrooms);
      }
      if (!isNaN(bathrooms) && searchParams.has("bathrooms")) {
        query = query.gte("bathrooms", bathrooms);
      }
      if (!isNaN(priceMin) && searchParams.has("priceMin")) {
        query = query.gte("price", priceMin);
      }
      if (!isNaN(priceMax) && searchParams.has("priceMax")) {
        query = query.lte("price", priceMax);
      }

      const sortOption = sort as SortOption;
      if (sortOption === SORT_OPTIONS.PRICE_ASC)
        query = query.order("price", { ascending: true });
      if (sortOption === SORT_OPTIONS.PRICE_DESC)
        query = query.order("price", { ascending: false });
      if (sortOption === SORT_OPTIONS.DATE_DESC)
        query = query.order("created_at", { ascending: false });

      const { data, count, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      setProperties(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      const errorMessage = getErrorMessage(err) || API_MESSAGES.LOADING_ERROR;
      setError(errorMessage);
      console.error("Error loading properties:", err);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    location,
    deal_type,
    type,
    bedrooms,
    bathrooms,
    priceMin,
    priceMax,
    sort,
    searchParams,
  ]);

  useEffect(() => {
    fetchFilteredProperties();
  }, [fetchFilteredProperties]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="py-25">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Properties</h1>
        <div className="flex gap-8">
          <FiltersSidebar />
          <div className="flex-1">
            <SortMenu />
            <div>
              {error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={fetchFilteredProperties}
                    className="bg-[#3E54EB] text-white px-4 py-2 rounded-[10px] hover:bg-[#0F1015]"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {loading
                      ? Array.from({ length: 4 }).map((_, i) => (
                          <PropertySkeleton key={i} />
                        ))
                      : properties.map((item) => (
                          <FeaturedItem key={item.id} item={item} />
                        ))}
                  </div>
                  {!loading && !error && properties.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">{API_MESSAGES.NO_RESULTS}</p>
                    </div>
                  )}
                  {!loading && totalPages > 1 && (
                    <Pagination
                      page={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
