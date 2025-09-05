import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import FeaturedItem from "../components/Featured/FeaturedItem";
import PropertySkeleton from "../components/PropertySkeleton";

const LikedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: favorites, error } = await supabase
        .from("favorites")
        .select("property_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error getting favorites:", error.message);
        setLoading(false);
        return;
      }

      if (!favorites || favorites.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const propertyIds = favorites.map((fav) => fav.property_id);

      const { data: props, error: propsError } = await supabase
        .from("properties")
        .select("id, title, location, price, cover_image, type, deal_type")
        .in("id", propertyIds);

      if (propsError) {
        console.error("Error while getting objects:", propsError.message);
      } else {
        setProperties(props || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="py-25">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Liked Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <PropertySkeleton key={i} />
              ))
            : properties.map((item) => (
                <FeaturedItem
                  key={item.id}
                  item={item}
                  onUnlike={(id) => {
                    setProperties((prev) => prev.filter((p) => p.id !== id));
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default LikedProperties;
