import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaceInput } from './dto/create-place.input';
import { DeletePlaceInput } from './dto/delete-place.input';
import { FindMany } from './dto/findmany';
import { UpdatePlaceInput } from './dto/update-place.input';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}
  async create(createPlaceInput: CreatePlaceInput) {
    // const address = await this.prisma.address.create({
    //   data: {
    //     longitude: createPlaceInput.longitude,
    //     latitude: createPlaceInput.latitude,
    //   },
    // });
    return this.prisma.place.create({
      data: {
        name: createPlaceInput.name,
        description: createPlaceInput.description,
        addressId: 0,
        longitude: createPlaceInput.longitude,
        latitude: createPlaceInput.latitude,
      },
    });
  }

  async findAll(findmany: FindMany) {
    return this.prisma.place.findMany({
      skip: findmany.skip,
      take: findmany.take,
    });
  }

  findOne(id: number) {
    return this.prisma.place.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updatePlaceInput: UpdatePlaceInput) {
    return this.prisma.place.update({
      where: {
        id: updatePlaceInput.id,
      },
      data: {
        name: updatePlaceInput.name,
        description: updatePlaceInput.description,
      },
    });
  }

  async remove(deletePlaceInput: DeletePlaceInput) {
    return this.prisma.place.delete({
      where: {
        id: deletePlaceInput.id,
      },
    });
  }
}
