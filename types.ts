
export interface Train {
  trainNumber: string;
  trainName: string;
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  seatsAvailable: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

export interface Booking {
  pnr: string;
  train: Train;
  passengers: Passenger[];
  dateOfJourney: string;
  totalFare: number;
}

export interface SearchParams {
    from: string;
    to: string;
    date: string;
}

export interface TeamMember {
  name: string;
  roll: number;
}

export enum View {
    SEARCH = 'SEARCH',
    RESULTS = 'RESULTS',
    BOOKING = 'BOOKING',
    CONFIRMATION = 'CONFIRMATION',
    HISTORY = 'HISTORY',
}
