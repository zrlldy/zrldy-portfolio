export const disciplines = [
  { name: "Anime music videos", note: "Cutting footage to rhythm, beat by beat." },
  { name: "Video editing", note: "Pacing, transitions, and story." },
  { name: "Motion graphics", note: "Type, shape, and timing in motion." },
  { name: "Apple-inspired motion", note: "Restrained, precise, physically believable." },
];

export type CreativePiece = {
  title: string;
  discipline: string;
  year: string;
  platform: "youtube" | "vimeo";
  videoId: string;
};

// Only pieces the owner made and has the right to show. Empty until media is supplied.
export const creativePieces: CreativePiece[] = [];
