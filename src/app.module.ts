import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmerModule } from './modules/farmer/farmer.module';

@Module({
  imports: [FarmerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
