import { shortenTitle } from "../utils/helpers";

const PosterTitle = ({ title }: { title: string }) => {
  return (
    <p className="font-semibold text-content_secondary">
      {shortenTitle(title)}
    </p>
  );
};

export default PosterTitle;
