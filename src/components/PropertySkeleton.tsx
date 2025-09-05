const PropertySkeleton = () => {
  return (
    <div className="mb-4 border p-4 rounded flex flex-col items-center gap-8 animate-pulse">
      <div className="w-81 h-59 bg-gray-300 rounded" />
      <div className="space-y-2">
        <div className="w-48 h-4 bg-gray-300 rounded" />
        <div className="w-32 h-4 bg-gray-300 rounded" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-20 h-4 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default PropertySkeleton;
