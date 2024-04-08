export interface License {
    id: string;
    type: 'free' | 'premium';
    startDate: Date | null;
    endDate: Date | null;
}