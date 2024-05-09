import { Injectable, NotFoundException } from '@nestjs/common';
import { Club, SPORTS } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async getClubsByLocation(location: string): Promise<Club[] | null> {
    const clubs = this.prisma.club.findMany({
      where: {
        location,
      },
      include: {
        courts: {
          include: {
            reservations: true,
          },
        },
      },
    });
    if (clubs) return clubs;
    throw new NotFoundException(
      'No se ha encontrado algún club en esa ubicación',
    );
  }

  async getClubsByLocationAndSport(
    location: string,
    sport: SPORTS,
  ): Promise<Club[] | null> {
    const clubs = this.prisma.club.findMany({
      where: {
        location,
        sports: {
          has: sport,
        },
      },
    });
    if (clubs) return clubs;
    throw new NotFoundException(
      'No se ha encontrado algún club en esa ubicación y con ese deporte disponible',
    );
  }

  async createClub(club: Club): Promise<Club> {
    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: club.adminId,
      },
    });
    await this.prisma.user.update({
      where: {
        id: userToUpdate.id,
      },
      data: {
        ...userToUpdate,
        userType: 'superadmin',
      },
    });
    const newClub = await this.prisma.club.create({
      data: {
        ...club,
        name: club.name.trim().toLowerCase().split(' ').join('-'),
        // deberá recibir location del tipo ciudad, provincia, país
        location: club.location.trim().toLowerCase().split(' ').join(''),
      },
    });
    return newClub;
  }

  async deleteClub(id: string): Promise<Club | null> {
    return await this.prisma.club.delete({
      where: {
        id,
      },
    });
  }
}
