export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  iat: number;
  exp: number;
}