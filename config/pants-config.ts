import { FabricOption, PantsConfiguration } from "@/types/configurator";

export const FABRIC_OPTIONS: FabricOption[] = [
  {
    id: "semi-wool",
    name: "Semi-Wool",
    price: 150000,
    image: "/pants-config/fabric/semi-wool.JPG",
  },
  {
    id: "fleece",
    name: "Fleece",
    price: 110000,
    image: "/pants-config/fabric/fleece.JPG",
  },
  {
    id: "satin",
    name: "Satin",
    price: 120000,
    image: "/pants-config/fabric/satin.JPG",
  },
  {
    id: "denim",
    name: "Denim",
    price: 150000,
    image: "/pants-config/fabric/denim.JPG",
  },
];

export const PANTS_CONFIGURATIONS: PantsConfiguration[] = [
  {
    id: "config-1",
    fabric: "semi-wool",
    cutting: "middle",
    button: "button",
    volume: "straight",
    imageUrl: "/configurations/semi-wool-middle-button-straight.jpg",
  },
  {
    id: "config-2",
    fabric: "semi-wool",
    cutting: "middle",
    button: "hook",
    volume: "straight",
    imageUrl: "/configurations/semi-wool-middle-hook-straight.jpg",
  },
  // Add more configurations as needed
];

export const formatPrice = (price: number) => {
  return `Rp ${price.toLocaleString("id-ID")}`;
};

export type FabricType = "linen" | "nylon" | "twill" | "satin";
export type VolumeType = "wide" | "pencil";
export type CutType = "middle" | "2-line";
export type ButtonType = "button" | "hook";

export const fabricOptions: ConfigOption[] = [
  {
    id: "1",
    label: "Linen",
    value: "linen",
    price: 150000,
    image: "/pants-config/fabric/linen.jpg",
  },
  {
    id: "2",
    label: "Nylon",
    value: "nylon",
    price: 100000,
    image: "/pants-config/fabric/nylon.webp",
  },
  {
    id: "3",
    label: "Twill",
    value: "twill",
    price: 125000,
    image: "/pants-config/fabric/twill.jpg",
  },
  {
    id: "4",
    label: "Satin",
    value: "satin",
    price: 200000,
    image: "/pants-config/fabric/satin.jpg",
  },
];

export const volumeOptions: ConfigOption[] = [
  { id: "1", label: "Wide", value: "wide" },
  { id: "2", label: "Pencil", value: "pencil" },
];

export const cutOptions: ConfigOption[] = [
  { id: "1", label: "Middle", value: "middle" },
  { id: "2", label: "2 Line", value: "2-line" },
];

export const buttonOptions: ConfigOption[] = [
  { id: "1", label: "Button", value: "button" },
  { id: "2", label: "Hook", value: "hook" },
];

export type PantsConfig = {
  fabric: string;
  volume: string;
  cut: string;
  button: string;
};

export type ConfigOption = {
  id: string;
  label: string;
  value: string;
  price?: number;
  image?: string;
};
