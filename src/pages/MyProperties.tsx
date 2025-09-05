import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import FeaturedItem from "../components/Featured/FeaturedItem";
import PropertySkeleton from "../components/PropertySkeleton";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  cover_image: string;
  type: string;
  deal_type: string;
};

const MyProperties = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProperties = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not authenticated", userError);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("properties")
        .select("id, title, location, price, cover_image, type, deal_type")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error getting properties:", error.message);
      } else {
        setProperties(data || []);
      }

      setLoading(false);
    };

    fetchUserAndProperties();
  }, []);

  return (
    <div className="py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8">My Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <PropertySkeleton key={i} />
            ))
          ) : properties.length === 0 ? (
            <p className="col-span-full text-gray-500">
              You haven’t added any properties yet.
            </p>
          ) : (
            properties.map((item) => <FeaturedItem key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
