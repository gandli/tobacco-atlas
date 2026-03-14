import rawManufacturers from "./manufacturers.json";
import type { Manufacturer } from "./types";

export const manufacturers = rawManufacturers as Manufacturer[];

export default manufacturers;
