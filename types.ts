export interface Country {
    id: string,
    name: string,
    continent: string,
    flagUrl: string,
    independenceYear: number,
    motto: string
}

export interface City {
  id: string;
  name: string;
  description: string;
  population: number;
  isCapital: boolean;
  foundedDate: string;
  imageUrl: string;
  regionType: string;
  landmarks: string[];
  countryid: string;
}
