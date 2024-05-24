import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get(':userId')
  async findManyByUserId(
    @Param('userId') userId: string,
  ): Promise<Reservation[] | null> {
    return await this.reservationsService.getReservationsByUserId(userId);
  }

  @Get(':userId/:reservationId')
  async findById(
    @Param('userId') userId: string,
    @Param('reservationId') reservationId: string,
  ): Promise<Reservation | null> {
    return await this.reservationsService.getReservationById(
      userId,
      reservationId,
    );
  }

  @Post()
  async create(@Body() reservation: Reservation): Promise<Reservation> {
    return await this.reservationsService.createReservation(reservation);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation | null> {
    return await this.reservationsService.deleteReservation(id);
  }
}
