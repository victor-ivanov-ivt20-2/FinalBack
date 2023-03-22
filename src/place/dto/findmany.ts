import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class FindMany {
  @Field(() => Int, { description: 'Сколько скипнем' })
  skip: number;
  @Field(() => Int, { description: 'Сколько возьмём' })
  take: number;
}
