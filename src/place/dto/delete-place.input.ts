import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeletePlaceInput {
  @Field(() => Int)
  id: number;
}
