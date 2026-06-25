const ProgressBar = () => {
  return (
    <div className="flex min-h-screen justify-start bg-bkg text-content pt-8">
      <div className="mx-auto pt-28">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    </div>
  );
};

export default ProgressBar;
