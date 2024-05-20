import { Injectable, NotFoundException } from '@nestjs/common';
import { Court } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourtsService {
  constructor(private prisma: PrismaService) {}

  async getCourtsByClubId(clubId: string): Promise<Court[] | null> {
    const courts = await this.prisma.court.findMany({
      where: {
        clubId,
      },
      include: {
        reservations: true,
      },
    });
    if (courts) return courts;
    throw new NotFoundException('No se han encontrado canchas en este club');
  }

  async getCourtById(id: string): Promise<Court | null> {
    const court = await this.prisma.court.findUnique({
      where: {
        id,
      },
      include: {
        reservations: true,
      },
    });
    if (court) return court;
    throw new NotFoundException(
      'No se ha encontrado alguna cancha con este id',
    );
  }

  async createCourt(court: Court): Promise<Court> {
    const newCourt = await this.prisma.court.create({
      data: court,
    });
    return newCourt;
  }

  async deleteCourtById(id: string): Promise<Court | null> {
    return await this.prisma.court.delete({
      where: {
        id,
      },
    });
  }
}
