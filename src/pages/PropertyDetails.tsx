import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Property = {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  location: string;
  price: number;
  features: Array;
  type: string;
  deal_type: string;
  created_at: string;
};

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error on load", error.message);
        setError("Failed to load data.");
        setProperty(null);
      } else {
        setProperty(data);
        setError(null);
      }

      setLoading(false);
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">Loading...</div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto py-20 text-center text-red-500">
        {error || "Property not found"}
      </div>
    );
  }

  return (
    <div className="pb-20">
      <img
        src={property.cover_image}
        alt={property.title}
        className="w-full h-[979px] object-cover object-center mb-6"
      />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="text-lg font-semibold text-green-600 mb-4">
          €{property.price.toLocaleString()}
        </p>
        <p className="mb-6">{property.description}</p>
        <div className="text-sm text-gray-500">
          <p>
            <strong>Deal type:</strong> {property.deal_type}
          </p>
          <p>
            <strong>Type:</strong> {property.type}
          </p>
          <p>
            <strong>Posted on:</strong>{" "}
            {new Date(property.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
