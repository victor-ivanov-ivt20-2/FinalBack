import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Place {
  @Field(() => String, { description: 'Название места' })
  name: string;
  @Field(() => String, { description: 'Описание места' })
  description: string;
  @Field(() => Int, { description: 'id адреса' })
  addressId: number;
  @Field(() => String, { nullable: true, description: 'долгота' })
  longitude: string;
  @Field(() => String, { nullable: true, description: 'широта' })
  latitude: string;
}
