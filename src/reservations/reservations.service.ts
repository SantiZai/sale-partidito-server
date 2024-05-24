import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Reservation } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async getReservationsByUserId(userId: string): Promise<Reservation[] | null> {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        userId,
      },
    });
    if (reservations) return reservations;
    throw new NotFoundException(
      'No se han encontrado reservas para este usuario',
    );
  }

  async getReservationById(
    userId: string,
    reservationId: string,
  ): Promise<Reservation | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        reservations: true,
      },
    });
    const reservation = user.reservations.find(
      (res: Reservation) => res.id == reservationId,
    );
    if (reservation) return reservation;
    throw new NotFoundException('No se ha encontrado la reserva seleccionada');
  }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    return await this.prisma.reservation.create({
      data: reservation,
    });
  }

  async deleteReservation(id: string): Promise<Reservation | null> {
    return await this.prisma.reservation.delete({
      where: {
        id,
      },
    });
  }
}
