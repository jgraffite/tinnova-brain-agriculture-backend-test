import { PlantedCrops } from './planted-crop.entity';

export class Farmer {
  id?: number;
  docNumber: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  plantedCrops: PlantedCrops[];
}
