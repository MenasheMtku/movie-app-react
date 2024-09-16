export const shortenOverview = overvie => {
  if (overvie.length <= 100) return overvie;
  const short = overvie.slice(0, 150);

  return short + "...";
};
export const shortenTitle = title => {
  if (!title?.length > 30) return title;

  const shortTitle = title.replace(/:/g, "").split(" ").slice(0, 3).join(" ");

  return shortTitle;
};

export const minutesTohours = minutes => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};

export const ratingToPercentage = rating => {
  return (rating * 10)?.toFixed(0);
};

export const resolveRatingColor = rating => {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};
