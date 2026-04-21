export interface CarRequest {
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  photoUrl: string;
}

export interface CarResponse extends CarRequest {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarFilters {
  plate?: string;
  model?: string;
  brand?: string;
  color?: string;
  year?: number | string;
}
