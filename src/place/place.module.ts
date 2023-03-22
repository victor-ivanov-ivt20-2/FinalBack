import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceResolver } from './place.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PlaceResolver, PlaceService, PrismaService],
})
export class PlaceModule {}
