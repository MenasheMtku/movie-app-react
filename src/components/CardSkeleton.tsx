const CardSkeleton = () => (
  <div className="bg-bkg_alt p-2 rounded-lg overflow-hidden">
    <div className="relative w-full aspect-[2/3] bg-bkgDarker animate-pulse rounded-md" />
    <div className="mt-2 h-3 w-3/4 mx-auto bg-bkgDarker animate-pulse rounded-full" />
  </div>
);

export default CardSkeleton;
