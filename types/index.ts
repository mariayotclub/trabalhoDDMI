export interface AlbumReview {
  id?: string;
  userId: string;
  title: string;
  artist: string;
  rating: number;
  listenDate: string; // Mantemos como string para facilitar o input HTML
  comment: string;
}