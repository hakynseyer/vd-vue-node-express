export interface TypeAlertData {
  color?: string;
  status?: boolean;
  message?: string;
  timer?: number;
}

export interface TypeSelectOptions {
  label: string;
  value: string;
}

export interface TypeTableHeader {
  label: string;
  link: string;
}

export type TypeMaterial = {
  id: number;
  name: string;
  description: string;
  price: string;
  priceString: string;
  amount: number;
  um: string;
  idProvider: number;
  provider: string;
  user: string;
  rank: string;
};

export type TypeProvider = {
  id: number;
  company: string;
  description: string;
  idUser: number;
  user: string;
  rank: string;
};

export type TypeUser = {
  id: number;
  name: string;
  surnameFirst: string;
  surnameSecond: string;
  password: string;
  address: string;
  city: string;
  country: string;
  notes: string;
  idRank: number;
  rank: string;
};

export type TypeRank = {
  id: number;
  rank: string;
  description: string;
};
