import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    
  if(!isValidObjectId(value)){
    throw new BadRequestException(`${value} no es un id de mongo valido.`)
  }

  // pero  si lo es voy a regresar el id 

  return value;

    return value.toUpperCase();
  }
}
