
export interface Card {
  title: string;
  description: string;
}

export interface CardDashboard {
  card: Card;
  textButton: string;
}

export interface Course {
  id?: number,
  name: string,
  description: string,
  duration: string,
  level: string,
  price: number  
}