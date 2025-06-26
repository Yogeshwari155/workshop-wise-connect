
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
  price: number; // Make price required instead of optional
  seats?: number;
  registeredSeats?: number;
  registrationMode?: string;
}
