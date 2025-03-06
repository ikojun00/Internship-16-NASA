export interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
    name: string;
  };
  rover: {
    name: string;
    status: string;
    launch_date: string;
    landing_date: string;
  };
  sol: number;
}

export interface UseMarsRoverPhotosProps {
  rover: string;
  earth_date?: string;
  camera?: string;
  page?: number;
}
