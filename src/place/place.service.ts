import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressInput } from './dto/create-address.input';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}
  async create(createPlaceInput: CreatePlaceInput) {
    const address = await this.prisma.address.create({
      data: {
        longitude: createPlaceInput.longitude,
        latitude: createPlaceInput.latitude,
      },
    });
    return this.prisma.place.create({
      data: {
        name: createPlaceInput.name,
        description: createPlaceInput.description,
        addressId: address.id,
      },
    });
  }

  findAll() {
    return `This action returns all place`;
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceInput: UpdatePlaceInput) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
