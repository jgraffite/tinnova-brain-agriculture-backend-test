import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import {
  throwHttpBadRequestException,
  throwHttpFarmerNotFound,
} from 'src/shared/utils';
import { checkHasMissingRequiredFields } from './helpers/helper';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';
import { PLANTED_CROP_TYPES } from './enums/planted-crops.enum';
import { REQUIRE_FIELDS_PLANTED_CROPS } from './enums/required-fields.enum';

@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  async validateValues(formData: CreateFarmerDto, isEditing = false) {
    const { data } = formData;
    const missingFields = checkHasMissingRequiredFields(data);

    if (!isEditing && missingFields.length > 0) {
      throwHttpBadRequestException(
        'Alguns campos são obrigatórios e não foram preenchidos',
        { missingFields },
      );
    }

    if (!cpf.isValid(data.docNumber) && !cnpj.isValid(data.docNumber)) {
      throwHttpBadRequestException('O CPF/CNPJ não é um número válido');
    }

    if (data.arableArea + data.vegetationArea > data.totalArea) {
      throwHttpBadRequestException(
        "A soma da 'Área Agricultável' com a 'Área de Vegetação' não pode ser maior que a Área Total da fazenda",
      );
    }

    if (
      !isEditing &&
      (await this.farmerService.isDocNumberInUse(data.docNumber))
    ) {
      throwHttpBadRequestException('O CPF/CNPJ informado já está em uso');
    }
  }

  async validatePlantedCropValues(formData: CreatePlantedCropDto) {
    const { data } = formData;
    const missingFields = checkHasMissingRequiredFields(
      data,
      REQUIRE_FIELDS_PLANTED_CROPS,
    );

    if (missingFields.length > 0) {
      throwHttpBadRequestException(
        'Alguns campos são obrigatórios e não foram preenchidos',
        { missingFields },
      );
    }

    if (!PLANTED_CROP_TYPES[data.type]) {
      throwHttpBadRequestException(
        'O tipo de plantação informado não é permitido',
      );
    }
  }

  @Post()
  async create(@Body() createFarmerDto: CreateFarmerDto) {
    const { data } = createFarmerDto;

    await this.validateValues(createFarmerDto);

    data.docNumber = data.docNumber.replace(/[^0-9]+/g, '');

    return this.farmerService.create(createFarmerDto);
  }

  @Post(':farmerId/planted-crop')
  async createPlantedCrop(
    @Param('farmerId') farmerId: string,
    @Body() createPlantedCropDto: CreatePlantedCropDto,
  ) {
    if (!(await this.farmerService.findOne(+farmerId))) {
      throwHttpFarmerNotFound();
    }

    await this.validatePlantedCropValues(createPlantedCropDto);

    return this.farmerService.createPlantedCrop(
      +farmerId,
      createPlantedCropDto,
    );
  }

  @Get('/totals')
  async getTotals() {
    const totalFarms = await this.farmerService.count();
    const totalHectares = await this.farmerService.sumBy('totalArea');
    const totalByStates = await this.farmerService.totalBy('state');
    const totalByCity = await this.farmerService.totalBy('city');
    const totalByArableArea = await this.farmerService.sumBy('arableArea');
    const totalByVegetationArea =
      await this.farmerService.sumBy('vegetationArea');
    const totalPlantedCrops = await this.farmerService.totalBy(
      'type',
      'plantedCrop',
    );

    return {
      totalFarms,
      totalHectares,
      totalByStates,
      totalByCity,
      totalByArableArea,
      totalByVegetationArea,
      totalPlantedCrops,
    };
  }

  @Get()
  findAll() {
    return this.farmerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const farmer = await this.farmerService.findOne(+id);

    if (!farmer) {
      throwHttpFarmerNotFound();
    }

    return farmer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ) {
    const { data } = updateFarmerDto;

    if (!(await this.farmerService.findOne(+id))) {
      throwHttpFarmerNotFound();
    }

    await this.validateValues(updateFarmerDto, true);

    data.docNumber = data.docNumber.replace(/[^0-9]+/g, '');
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!(await this.farmerService.findOne(+id))) {
      throwHttpFarmerNotFound();
    }

    await this.farmerService.remove(+id);
    return {
      status: 'OK',
      description: 'O fazendeiro foi removido',
    };
  }
}
