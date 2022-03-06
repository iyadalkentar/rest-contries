export interface Country {
  name: { common: string; official: string };
  cca3: string;
  capital: string[];
  region: string;
  area: number;
  population: number;
  flags: { png: string; svg: string };
}
