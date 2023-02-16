export interface URLMap  {
  large: string;
  original: string;
  large2x: string;
  small: string
  medium: string
} 

export interface ImageData {
  id: string;
  alt_description: string;
  avg_color: string;
  src: URLMap,
  photographer_url: string
  photographer: string
}

