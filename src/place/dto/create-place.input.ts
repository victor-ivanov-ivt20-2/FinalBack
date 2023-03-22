import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaceInput {
  @Field(() => String, { description: 'Название места' })
  name: string;
  @Field(() => String, { description: 'Описание места' })
  description: string;
  @Field(() => String, { description: 'регион' })
  region: string;
  @Field(() => String, { description: 'город' })
  city: string;
  @Field(() => String, { description: 'улица' })
  street: string;
  @Field(() => String, { description: 'дом' })
  house: string;
}
