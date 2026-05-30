export type FabricType = 'semi-wool' | 'fleece' | 'satin' | 'denim';
export type CuttingType = 'middle' | 'two-lines';
export type ButtonType = 'button' | 'hook';
export type VolumeType = 'straight' | 'wide' | 'pencil';

export interface FabricOption {
  id: FabricType;
  name: string;
  price: number;
  image: string;
}

export interface PatchOption {
  id: string;
  image: string;
  price: number;
}

export interface ConfiguratorState {
  fabric: FabricType;
  cutting: CuttingType;
  button: ButtonType;
  volume: VolumeType;
  patch: string | null;
  customPatch: File | null;
}

export interface PantsConfiguration {
  id: string;
  fabric: FabricType;
  cutting: CuttingType;
  button: ButtonType;
  volume: VolumeType;
  imageUrl: string;
}

export type ConfigOption = 'a' | 'b'

export interface ConfigState {
  variable1: ConfigOption
  variable2: ConfigOption
  variable3: ConfigOption
}

export interface ConfigImage {
  src: string
  alt: string
}

export type ConfigMapping = {
  [key: string]: ConfigImage
}

