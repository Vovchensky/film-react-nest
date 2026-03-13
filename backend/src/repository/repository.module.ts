import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { FilmSchema, IFilmDoc } from './film.schema';
import { FilmsRepository } from './films.repository';

const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (configService: ConfigService) => {
    const url = configService.get<string>(
      'DATABASE_URL',
      'mongodb://localhost:27017/prac',
    );
    await mongoose.connect(url);
    return mongoose.connection;
  },
  inject: [ConfigService],
};

const filmModelProvider = {
  provide: 'FILM_MODEL',
  useFactory: (connection: mongoose.Connection) => {
    return (
      connection.models.Film || connection.model<IFilmDoc>('Film', FilmSchema)
    );
  },
  inject: ['DATABASE_CONNECTION'],
};

@Module({
  providers: [databaseProvider, filmModelProvider, FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
