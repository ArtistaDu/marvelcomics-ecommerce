export interface Comic {

  title: string;
  id: string;
  description: string;
  prices: ComicPrice[]
  thumbnail: {
    path: string;
    extension: string;
  },
  creators: {
    items: Creators[]
  }
  urls: Url[];
  dates: Date[];
}

export interface Creators {
  name: string,
  role: string
}

interface Date {
  type: string,
  date: string
}

interface ComicPrice {
  type: string,
  price: string
}

export interface ApiResponse {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
  };
}

export interface Url {
  type: string
  url: string
}
