export interface License {
    id: string;
    type: 'free' | 'premium';
    startDate: string | null;
    endDate: string | null;
}