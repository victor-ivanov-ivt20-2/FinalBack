import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaceService } from './place.service';
import { Place } from './entities/place.entity';
import { CreatePlaceInput } from './dto/create-place.input';
import { UpdatePlaceInput } from './dto/update-place.input';
import { FindMany } from './dto/findmany';
import { DeletePlaceInput } from './dto/delete-place.input';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}
  @Public()
  @Mutation(() => Place)
  createPlace(@Args('createPlaceInput') createPlaceInput: CreatePlaceInput) {
    return this.placeService.create(createPlaceInput);
  }

  @Public()
  @Query(() => [Place])
  findAll(@Args('findmany') findmany: FindMany) {
    return this.placeService.findAll(findmany);
  }
  @Public()
  @Query(() => Place, { name: 'place' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.placeService.findOne(id);
  }
  @Public()
  @Query(() => [Place])
  findThree() {
    return this.placeService.findThree();
  }

  @Mutation(() => Place)
  updatePlace(@Args('updatePlaceInput') updatePlaceInput: UpdatePlaceInput) {
    return this.placeService.update(updatePlaceInput.id, updatePlaceInput);
  }

  @Mutation(() => Place)
  removePlace(@Args('id') deletePlaceInput: DeletePlaceInput) {
    return this.placeService.remove(deletePlaceInput);
  }
}
