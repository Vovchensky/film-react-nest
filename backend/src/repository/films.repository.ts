import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IFilmDoc, IScheduleDoc } from './film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @Inject('FILM_MODEL') private readonly filmModel: Model<IFilmDoc>,
  ) {}

  async findAll(): Promise<Omit<IFilmDoc, 'schedule'>[]> {
    return this.filmModel
      .find({}, { _id: 0, __v: 0, schedule: 0 })
      .lean()
      .exec();
  }

  async findSchedule(filmId: string): Promise<IScheduleDoc[] | null> {
    const film = await this.filmModel
      .findOne({ id: filmId }, { _id: 0, __v: 0 })
      .lean()
      .exec();
    if (!film) {
      return null;
    }
    return film.schedule;
  }

  async occupySeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<boolean> {
    const result = await this.filmModel.updateOne(
      {
        id: filmId,
        schedule: {
          $elemMatch: {
            id: sessionId,
            taken: { $ne: seatKey },
          },
        },
      },
      { $push: { 'schedule.$.taken': seatKey } },
    );
    return result.modifiedCount > 0;
  }
}
