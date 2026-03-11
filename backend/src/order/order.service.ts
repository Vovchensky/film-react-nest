import { Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const results: OrderResultDto[] = [];

    for (const ticket of dto.tickets) {
      const seatKey = `${ticket.row}:${ticket.seat}`;

      const success = await this.filmsRepository.occupySeat(
        ticket.film,
        ticket.session,
        seatKey,
      );

      if (!success) {
        throw new BadRequestException(
          `Seat ${seatKey} is already taken or session not found`,
        );
      }

      const result = new OrderResultDto();
      result.id = randomUUID();
      result.film = ticket.film;
      result.session = ticket.session;
      result.daytime = ticket.daytime;
      result.row = ticket.row;
      result.seat = ticket.seat;
      result.price = ticket.price;
      results.push(result);
    }

    return { total: results.length, items: results };
  }
}
