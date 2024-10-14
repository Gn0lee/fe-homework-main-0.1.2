export interface Location {
  id: number;
  name: string;
  type: string;
  robot: {
    id: string;
    is_online: boolean;
  } | null;
}
