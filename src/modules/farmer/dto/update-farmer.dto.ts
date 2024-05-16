import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmerDto } from './create-farmer.dto';
import { Farmer } from '../entities/farmer.entity';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
  data: Farmer;
}
