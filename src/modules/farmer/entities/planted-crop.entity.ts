import { PLANTED_CROP_TYPES } from '../enums/planted-crops.enum';
import { Farmer } from './farmer.entity';

export class PlantedCrops {
  id?: number;
  name: string;
  type: PLANTED_CROP_TYPES;
  farmerId?: number;
  farmer?: Farmer;
}
