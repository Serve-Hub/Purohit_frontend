export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    contact?: string;
    avatar?: string;
    bio?: string;
  }

export interface Pandit{
  phoneNumber: string;
  day: string;
  month: string;
  year: string;
  province: string;
  district: string;
  municipality: string;
  tolAddress: string;
  pmProvince: string;
  pmDistrict: string;
  pmMun: string;
  pmToladdress: string;
  qualification: string;
  institution: string;
  experience: string;
  // qcertificate: File | null;
  // citizenshipFrontPhoto: File | null;
  // citizenshipBackPhoto: File | null;

}

export interface Booking{
  date:Date | null, 
  time: string,
  province: string,
  district: string,
  municipality: string,
  tollAddress: string,
}

interface Address {
  tolAddress: string;
  municipality: string;
  district: string;
  province: string;
}

interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

interface PanditKYP {
  panditID: {
    firstName: string;
    lastName: string;
    avatar:string;
  };
  phoneNumber: string;
  permanentAddress: Address;
  temporaryAddress: Address;
  dateOfBirth: DateOfBirth;
  // _id:string;
}

export interface Puja {
  _id: string;
  pujaName: string;
  description: string;
  category: string;
  duration: number; // in hours
  panditsRequired: number;
  baseFare: number;
  pujaImage?: string;
}

export interface SelectedPandit {
  panditKYP: PanditKYP;
  panditID: string;
  _id:string
}

export interface Location {
  tollAddress: string;
  municipality: string;
  district: string;
  province: string;
}

export interface PujaID {
  _id:string;
  pujaName: string;
  baseFare: number;
}

export interface BookingData {
  _id: string;
  date:Date | null;
  pujaID: PujaID;
  selectedPanditWithKYP: SelectedPandit[];
  status: 'Completed' | 'pending' | 'Cancelled' | 'other';  // Extend this with other status types if needed
  location: Location;
  bookingDate: string; 
}