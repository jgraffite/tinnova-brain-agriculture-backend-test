import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [FarmerController],
  providers: [FarmerService, PrismaService],
})
export class FarmerModule {}
