export interface URLMap  {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
} 

export interface ImageData {
  id: string;
  alt_description: string;
  color: string;
  urls: URLMap,
  user: {
    name: string
    profile_image: {
      small: string
    }
  }
}

