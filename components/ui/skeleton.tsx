const Skeleton = ({ className }: { className: string }) => {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
};

export default Skeleton;
