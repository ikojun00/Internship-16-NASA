export interface NearEarthObject {
  id: number;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_second: number;
    };
    miss_distance: {
      kilometers: number;
    };
  }[];
}

export interface NEOResponse {
  element_count: number;
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
}
