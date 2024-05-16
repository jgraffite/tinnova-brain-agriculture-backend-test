import { PLANTED_CROP_TYPES, PrismaClient } from '@prisma/client';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const MOCK = [
  {
    docNumber: cpf.generate(),
    name: 'Alberto Oliveira',
    farmName: 'Fazenda Oliveira',
    city: 'Salvador',
    state: 'Bahia',
    totalArea: 5000,
    arableArea: 4000,
    vegetationArea: 1000,
    plantedCrops: [
      {
        name: 'Plantação de Soja',
        type: PLANTED_CROP_TYPES.SOYA,
      },
    ],
  },
  {
    docNumber: cpf.generate(),
    name: 'Leandro de Jesus',
    farmName: 'Fazenda Leandro de Jesus',
    city: 'Feira de Santana',
    state: 'Bahia',
    totalArea: 20000,
    arableArea: 4000,
    vegetationArea: 16000,
    plantedCrops: [
      {
        name: 'Plantação de Algodão',
        type: PLANTED_CROP_TYPES.COTTON,
      },
    ],
  },
  {
    docNumber: cnpj.generate(),
    name: 'João Silva',
    farmName: 'Fazenda Silva',
    city: 'Goiânia',
    state: 'Goiás',
    totalArea: 1000,
    arableArea: 8000,
    vegetationArea: 2000,
    plantedCrops: [
      {
        name: 'Plantação de Milho',
        type: PLANTED_CROP_TYPES.CORN,
      },
      {
        name: 'Plantação de Café',
        type: PLANTED_CROP_TYPES.COFFEE,
      },
    ],
  },
];

const prisma = new PrismaClient();
async function main() {
  MOCK.forEach(async (mock: any) => {
    const farmer = await prisma.farmer.create({
      data: {
        ...mock,
        plantedCrops: undefined,
      },
    });

    mock.plantedCrops.forEach(async (plantedCrop: any) => {
      await prisma.plantedCrop.create({
        data: {
          ...plantedCrop,
          farmerId: farmer.id,
        },
      });
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
