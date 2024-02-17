import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  // es para saver que tengo una dependencia de axios en mi servicio 


  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,

    ){}

  async executeSeed(){

    // elimina los pokemon que estaban en la base de datos 

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
   

  // forma de insertar multiples registros de manera simultanea

  //   const insertPromisesArray = [];


  //  data.results.forEach(({name,url})=>{

  //    const segments = url.split('/');
  //    const no = +segments[segments.length - 2]

  //   //  const pokemon = await this.pokemonModel.create({name,no})
  //   insertPromisesArray.push(
  //     this.pokemonModel.create({name,no})
  //   )

  //  });

  //  await Promise.all(insertPromisesArray)
   
  //   return 'Seed Executed';



  // Segunda forma de insertar multiples registros a la bd mongo 

  const pokemonToInsert: { name: string, no: number }[] = [];

     data.results.forEach(({name,url})=>{

     const segments = url.split('/');
     const no = +segments[segments.length - 2]

      pokemonToInsert.push({name,no});

   });

   await this.pokemonModel.insertMany(pokemonToInsert);
   return 'Seed Executed'
}




}
