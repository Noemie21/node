export interface RandomUserType {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateAge;
  registered: DateAge;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface DateAge {
  date: Date;
  age: number;
}

interface Id {
  name: string;
  value: null;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Street {
  number: number;
  name: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}