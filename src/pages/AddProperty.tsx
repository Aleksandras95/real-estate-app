import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const featuresList = [
  "Swimming Pool",
  "24 Hours Security",
  "Parking",
  "Private Lift",
  "Indoor Games",
  "Wifi",
  "Sit Out",
  "Gym",
  "24 Hours Water",
  "Hair dryer",
  "TV",
  "Smoke alarm",
];

const categories = ["Apartment", "Villa", "Duplex", "Houses", "Penthouse"];

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    intro: "",
    description: "",
    price: "",
    location: "",
    cover_image: "",
    gallery: [] as { url: string; name: string }[],
    features: [] as string[],
    deal_type: "buy",
    bedrooms: "1",
    bathrooms: "1",
    type: "Apartment",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("property-images")
      .upload(fileName, file);

    if (!error) {
      const publicUrl = `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/property-images/${fileName}`;
      setFormData((prev) => ({
        ...prev,
        cover_image: publicUrl,
      }));
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploads = await Promise.all(
      Array.from(files).map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
          .from("property-images")
          .upload(fileName, file);

        if (error) return null;

        return {
          url: `${
            import.meta.env.VITE_SUPABASE_URL
          }/storage/v1/object/public/property-images/${fileName}`,
          name: file.name,
        };
      })
    );

    const validUploads = uploads.filter((file) => file !== null) as {
      url: string;
      name: string;
    }[];

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...validUploads],
    }));
  };

  const handleSubmit = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const galleryUrls = formData.gallery.map((img) => img.url);

    const { error } = await supabase.from("properties").insert({
      title: formData.title,
      intro: formData.intro,
      description: formData.description,
      price: Number(formData.price),
      location: formData.location,
      cover_image: formData.cover_image,
      gallery: `{${galleryUrls.map((url) => `"${url}"`).join(",")}}`,
      features: `{${formData.features.map((f) => `"${f}"`).join(",")}}`,
      deal_type: formData.deal_type,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      type: formData.type,
      user_id: user.id,
    });

    if (!error) {
      navigate("/");
    } else {
      console.error(error.message);
    }
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                name="title"
                placeholder="Luxury Villa in Bali"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Intro</label>
              <input
                name="intro"
                placeholder="Beautiful beachfront property"
                value={formData.intro}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Full description of the property..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Price ($)</label>
              <input
                name="price"
                type="number"
                placeholder="350000"
                value={formData.price}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                name="location"
                placeholder="Los Angeles"
                value={formData.location}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Deal Type</label>
              <select
                name="deal_type"
                value={formData.deal_type}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">Select Deal Type</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Bedrooms</label>
              <select
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">Select Bedrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Bathrooms</label>
              <select
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="">Select Bathrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Property Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {["Apartment", "Villa", "Duplex", "Houses", "Penthouse"].map(
                  (type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleChange}
                      />
                      {type}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div
              className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition"
              onClick={() => document.getElementById("cover-upload")?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10272/10272622.png"
                  alt="Upload"
                  className="w-12 h-12 opacity-60"
                />
                <p className="text-gray-600">
                  <span className="text-blue-600 font-medium">
                    Drop your image here
                  </span>{" "}
                  or <span className="text-blue-500 underline">browse</span>
                </p>
                <p className="text-xs text-gray-400">
                  Supports: JPG, JPEG2000, PNG
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                id="cover-upload"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </div>
            {formData.cover_image && (
              <img
                src={formData.cover_image}
                alt="Cover Preview"
                className="mt-3 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            <div
              className="border-2 border-dashed border-green-400 rounded-lg p-6 text-center cursor-pointer hover:bg-green-50 transition"
              onClick={() => document.getElementById("gallery-upload")?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/10272/10272622.png"
                  alt="Upload"
                  className="w-12 h-12 opacity-60"
                />
                <p className="text-gray-600">
                  <span className="text-green-600 font-medium">
                    Drop multiple images
                  </span>{" "}
                  or <span className="text-green-500 underline">browse</span>
                </p>
                <p className="text-xs text-gray-400">Supports: JPG, PNG</p>
              </div>
              <input
                multiple
                type="file"
                accept="image/*"
                id="gallery-upload"
                className="hidden"
                onChange={handleGalleryUpload}
              />
            </div>
            {formData.gallery.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-3">
                {formData.gallery.map((img, i) => (
                  <div key={i} className="text-center">
                    <img
                      src={img.url}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <p className="text-xs text-gray-600 mt-1 break-words">
                      {img.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Property Features
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuresList.map((feature) => {
              const selected = formData.features.includes(feature);
              return (
                <label
                  key={feature}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition 
              ${
                selected
                  ? "bg-blue-50 border-blue-500 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => handleToggleFeature(feature)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{feature}</span>
                </label>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Submit Property
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyPage;
