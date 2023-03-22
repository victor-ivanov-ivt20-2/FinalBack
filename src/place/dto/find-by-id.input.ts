import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindById {
  @Field(() => Int, { description: 'id' })
  id: number;
}
