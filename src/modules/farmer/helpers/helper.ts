import { PlantedCrop } from '@prisma/client';
import { Farmer } from '../entities/farmer.entity';
import { REQUIRE_FIELDS } from '../enums/required-fields.enum';

export function checkHasMissingRequiredFields(
  dataFields: Farmer | PlantedCrop,
  requiredFields: any = REQUIRE_FIELDS,
) {
  const missingFieldsErrors = Object.keys(requiredFields)
    .filter((key) => !dataFields[key])
    .map((key) => `${requiredFields[key]}`);

  return missingFieldsErrors;
}
