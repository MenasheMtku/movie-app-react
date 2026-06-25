"use client";

type Genre = { id: number; name: string };

interface GenreChipsProps {
  genres: Genre[];
  selected: number[];
  onToggle: (id: number) => void;
}

const GenreChips = ({ genres, selected, onToggle }: GenreChipsProps) => (
  <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
    {genres.map(genre => (
      <button
        key={genre.id}
        onClick={() => onToggle(genre.id)}
        className={`shrink-0 px-3 py-1 rounded-full text-sm font-semibold border transition-colors duration-150 ${
          selected.includes(genre.id)
            ? "bg-primary text-white border-primary"
            : "bg-bkg_alt text-content border-transparent hover:border-primary"
        }`}
      >
        {genre.name}
      </button>
    ))}
  </div>
);

export default GenreChips;
