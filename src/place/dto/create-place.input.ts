import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlaceInput {
  @Field(() => String, { description: 'Название места' })
  name: string;
  @Field(() => String, { description: 'Описание места' })
  description: string;
  @Field(() => String, { description: 'долгота' })
  longitude: string;
  @Field(() => String, { description: 'широта' })
  latitude: string;
}
