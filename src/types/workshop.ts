
export interface Workshop {
  id: number;
  title: string;
  company: string;
  date: string;
  time: string;
  mode: string;
  status: string;
  image: string;
  meetLink?: string;
  location?: string;
  rating?: number;
  price?: number;
  seats?: number;
  registeredSeats?: number;
  registrationMode?: string;
}
