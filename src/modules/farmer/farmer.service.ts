import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { PrismaService } from 'src/services/prisma.service';
import { CreatePlantedCropDto } from './dto/create-planted-crop.dto';

@Injectable()
export class FarmerService {
  constructor(private prisma: PrismaService) {}

  async isDocNumberInUse(docNumber: string): Promise<boolean> {
    return !!(await this.prisma.farmer.findFirst({
      where: { docNumber },
    }));
  }

  create(createFarmerDto: CreateFarmerDto) {
    const { data: creationData } = createFarmerDto;

    return this.prisma.farmer.create({
      data: {
        name: creationData.name,
        docNumber: creationData.docNumber,
        farmName: creationData.farmName,
        city: creationData.city,
        state: creationData.state,
        totalArea: creationData.totalArea,
        arableArea: creationData.arableArea,
        vegetationArea: creationData.vegetationArea,
      },
    });
  }

  createPlantedCrop(
    farmerId: number,
    createPlantedCropDto: CreatePlantedCropDto,
  ) {
    const { data: creationData } = createPlantedCropDto;

    return this.prisma.plantedCrop.create({
      data: {
        name: creationData.name,
        type: creationData.type,
        farmerId: farmerId,
      },
    });
  }

  async findAll() {
    return await this.prisma.farmer.findMany({});
  }

  async count() {
    return await this.prisma.farmer.count();
  }

  async sumBy(fieldName) {
    const totals = await this.prisma.farmer.groupBy({
      by: ['createdAt'],
      _sum: {
        [fieldName]: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return totals.reduce((acc, curr) => {
      acc += curr._sum[fieldName];
      return acc;
    }, 0);
  }

  async totalBy(fieldName, collection = 'farmer') {
    const totals = await this.prisma[collection].groupBy({
      by: [fieldName],
      _count: {
        [fieldName]: true,
      },
      orderBy: {
        [fieldName]: 'desc',
      },
    });

    return totals.reduce((acc, curr) => {
      if (!acc[curr[fieldName]]) {
        acc[curr[fieldName]] = 0;
      }
      acc[curr[fieldName]] += curr._count[fieldName];
      return acc;
    }, {});
  }

  async findOne(id: number) {
    return await this.prisma.farmer.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateFarmerDto: any) {
    delete updateFarmerDto.data.id;
    return await this.prisma.farmer.update({
      where: { id },
      //data: _.omit(updateFarmerDto.data, ['id']),
      data: updateFarmerDto.data,
    });
  }

  async remove(id: number) {
    return !!(await this.prisma.farmer.delete({
      where: { id },
    }));
  }
}
