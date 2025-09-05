import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Grid } from "swiper/modules";
import SwiperCore from "swiper";
import FeaturedItem from "./FeaturedItem";

type Property = {
  id: string;
  title: string;
  cover_image: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  type: string;
  deal_type: string;
};

const FeaturedSection = () => {
  const swiperRef = useRef<SwiperCore>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select(
          "id, title, cover_image, bathrooms, bedrooms, location, price, type, deal_type"
        )
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Klaida gaunant property:", error.message);
        setProperties([]);
      } else {
        setProperties(data || []);
      }

      setLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <div className="bg-[#A4A6AC0D] pt-[70px] pb-[100px]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-12.5">
          <h2 className="text-4xl font-bold text-[#0F1015] max-w-[603px] leading-[46px]">
            Explore the latest properties available
          </h2>
          <div className="flex items-center gap-4">
            <svg
              onClick={() => swiperRef.current?.slidePrev()}
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              className="arrowPrev"
            >
              <rect
                x="56"
                y="56"
                width="56"
                height="56"
                rx="10"
                transform="rotate(180 56 56)"
                fill="#A4A6AC"
                fillOpacity="0.05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.4697 28.5303C21.1768 28.2374 21.1768 27.7626 21.4697 27.4697L25.4697 23.4697C25.7626 23.1768 26.2374 23.1768 26.5303 23.4697C26.8232 23.7626 26.8232 24.2374 26.5303 24.5303L23.8107 27.25L34 27.25C34.4142 27.25 34.75 27.5858 34.75 28C34.75 28.4142 34.4142 28.75 34 28.75L23.8107 28.75L26.5303 31.4697C26.8232 31.7626 26.8232 32.2374 26.5303 32.5303C26.2374 32.8232 25.7626 32.8232 25.4697 32.5303L21.4697 28.5303Z"
                fill="#0F1015"
              />
            </svg>
            <svg
              onClick={() => swiperRef.current?.slideNext()}
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              className="arrowNext"
            >
              <rect width="56" height="56" rx="10" fill="#3E54EB" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.5303 27.4697C34.8232 27.7626 34.8232 28.2374 34.5303 28.5303L30.5303 32.5303C30.2374 32.8232 29.7626 32.8232 29.4697 32.5303C29.1768 32.2374 29.1768 31.7626 29.4697 31.4697L32.1893 28.75L22 28.75C21.5858 28.75 21.25 28.4142 21.25 28C21.25 27.5858 21.5858 27.25 22 27.25L32.1893 27.25L29.4697 24.5303C29.1768 24.2374 29.1768 23.7626 29.4697 23.4697C29.7626 23.1768 30.2374 23.1768 30.5303 23.4697L34.5303 27.4697Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={3}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={30}
            modules={[Grid]}
            className="featured-swiper"
          >
            {properties.map((item) => (
              <SwiperSlide key={item.id}>
                <FeaturedItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default FeaturedSection;
