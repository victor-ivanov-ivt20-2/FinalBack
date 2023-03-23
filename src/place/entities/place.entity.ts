import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Place {
  @Field(() => Int, { description: 'id' })
  id: number;
  @Field(() => String, { description: 'Название места' })
  name: string;
  @Field(() => String, { description: 'Описание места' })
  description: string;
  @Field(() => String, { description: 'город' })
  city: string;
  @Field(() => String, { description: 'улица' })
  street: string;
  @Field(() => String, { description: 'дом' })
  house: string;
  @Field(() => Int, { nullable: true, description: 'цена' })
  price: number;
  @Field(() => String, { nullable: true, description: 'долгота' })
  longitude: string;
  @Field(() => String, { nullable: true, description: 'широта' })
  latitude: string;
}
