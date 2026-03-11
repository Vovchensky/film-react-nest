import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(id: string) {
    const items = await this.filmsRepository.findSchedule(id);
    if (!items) {
      return { total: 0, items: [] };
    }
    return { total: items.length, items };
  }
}
