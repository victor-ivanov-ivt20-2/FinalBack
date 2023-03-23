import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindMany {
  @Field(() => Int, { description: 'Сколько возьмём' })
  take: number;
}
