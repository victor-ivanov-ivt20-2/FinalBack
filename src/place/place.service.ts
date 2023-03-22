import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlaceInput } from './dto/create-place.input';
import { DeletePlaceInput } from './dto/delete-place.input';
import { FindMany } from './dto/findmany';
import { UpdatePlaceInput } from './dto/update-place.input';
import axios from 'axios';
@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}
  async create(createPlaceInput: CreatePlaceInput) {
    const url = 'https://cleaner.dadata.ru/api/v1/clean/address';
    const token = 'cc1aaaf3a82677815dbd0aa8358410e61060099f';
    const secret = '85f0552501a40f5911c55df70790512a7431b19f';
    const query =
      createPlaceInput.city +
      ' ' +
      createPlaceInput.street +
      ' ' +
      createPlaceInput.house;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
        'X-Secret': secret,
      },
    };
    let long = '';
    let lati = '';
    await axios
      .post(url, JSON.stringify([query]), options)
      .then((response) => {
        long = response.data[0].geo_lon;
        lati = response.data[0].geo_lat;
      })
      .catch((error) => console.log('error', error));
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
        longitude: long,
        latitude: lati,
        region: createPlaceInput.region,
        city: createPlaceInput.city,
        street: createPlaceInput.street,
        house: createPlaceInput.house,
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
