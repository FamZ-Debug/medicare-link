// User Types
export type UserRole = 'user' | 'provider' | 'admin';

export interface User {
    id: string;
    fullName: string;
    phoneNumber: string;
    role: UserRole;
    email?: string;
    isOnline?: boolean;
    verificationStatus?: 'pending' | 'approved' | 'rejected';
    walletBalance?: number;
    profileImage?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    bloodType?: string;
    emergencyContact?: {
        name: string;
        phoneNumber: string;
        relationship: string;
    };
}

// Service Types
export type ServiceType =
    | 'ambulance'
    | 'doctor-appointment'
    | 'online-consultation'
    | 'home-service';

export interface Service {
    id: string;
    type: ServiceType;
    title: string;
    icon: string;
    color: 'teal' | 'rose' | 'blue' | 'amber' | 'purple';
}

// Booking Types
export type BookingStatus = 
    | 'waiting' 
    | 'accepted' 
    | 'arrived' 
    | 'in-progress' 
    | 'completed' 
    | 'cancelled';

export type BookingMode = 'quick' | 'advance';

export interface BookingData {
    id: string;
    serviceType?: ServiceType;
    serviceTitle?: string;
    patientType?: 'general' | 'disabled';
    location?: string;
    gps?: { lat: number; lng: number };
    region?: string;
    province?: string;
    date?: string;
    time?: string;
    mode?: BookingMode;
    notes?: string;
    status: BookingStatus;
    paymentMethod?: PaymentMethod;
    totalAmount?: number;
    providerId?: string;
    userId: string;
    startTime?: string;
    endTime?: string;
}

// Payment Types
export type PaymentMethod = 'credit-card' | 'promptpay' | 'cash';

export interface PaymentInfo {
    method: PaymentMethod;
    amount: number;
}

// Form Types
export interface LoginFormData {
    phoneNumber: string;
}

export interface RegisterFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
}

export interface VerifyFormData {
    otp: string;
}

export interface ProfileFormData {
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodType: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
}

export interface ServiceRequestFormData {
    location: string;
    date: string;
    time: string;
    notes: string;
}

// Appointment Types
export interface Appointment {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    status: 'upcoming' | 'completed' | 'cancelled';
}
