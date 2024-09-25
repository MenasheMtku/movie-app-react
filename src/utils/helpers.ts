export const shortenOverview = (overview: string): string => {
  if (overview.length <= 100) return overview;
  const short = overview.slice(0, 150);

  return short + "...";
};
export const shortenTitle = (title: string) => {
  if (!title || title.length <= 30) return title;

  const shortTitle = title.replace(/:/g, "").split(" ").slice(0, 3).join(" ");

  return shortTitle;
};

export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursString = hours > 0 ? `${hours}h` : "";
  const minsString = mins > 0 ? `${mins}m` : "";
  return `${hoursString} ${minsString}`;
};

export const ratingToPercentage = (rating: number) => {
  return (rating * 10)?.toFixed(0);
};

export const resolveRatingColor = (rating: number) => {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};
