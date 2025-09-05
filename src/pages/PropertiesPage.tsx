import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import PropertySkeleton from "../components/PropertySkeleton";
import FiltersSidebar from "../components/FiltersSidebar/FiltersSidebar";
import SortMenu from "../components/SortMenu/SortMenu";
import FeaturedItem from "../components/Featured/FeaturedItem";
import Pagination from "../components/Pagination";

type Property = {
  id: string;
  title: string;
  cover_image: string;
  description: string;
  location: string;
  price: number;
  type: string;
  deal_type: string;
  created_at: string;
};

const PropertiesPage = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = 6;
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

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);

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

      if (sort === "price_asc")
        query = query.order("price", { ascending: true });
      if (sort === "price_desc")
        query = query.order("price", { ascending: false });
      if (sort === "date_desc")
        query = query.order("created_at", { ascending: false });

      const { data, count, error } = await query;

      if (error) {
        console.error("Ошибка при загрузке:", error);
      } else {
        setProperties(data || []);
        setTotalCount(count || 0);
      }

      setLoading(false);
    };

    fetchFilteredProperties();
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
  ]);

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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <PropertySkeleton key={i} />
                    ))
                  : properties.map((item) => (
                      <FeaturedItem key={item.id} item={item} />
                    ))}
              </div>
              {!loading && totalPages > 1 && (
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
