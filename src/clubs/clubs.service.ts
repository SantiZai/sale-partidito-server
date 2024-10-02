import { Injectable, NotFoundException } from '@nestjs/common';
import { Club, SPORTS } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async getClubById(id: string): Promise<Club | null> {
    const club = this.prisma.club.findUnique({
      where: {
        id,
      },
      include: {
        courts: {
          include: {
            reservations: true,
          },
        },
      },
    });
    if (club) return club;
    throw new NotFoundException(
      'No se ha encontrado algún club en ese identificador',
    );
  }

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

    const locationUrl = `${club.address.split(' ').join('%2B')},${club.location.split(' ').join('%2B').replaceAll(',', '')}`;

    const response = await fetch(
      `https://api.distancematrix.ai/maps/api/geocode/json?address=${locationUrl}&key=${process.env.GEOCODING_ACCURATE_API_KEY}`,
    );
    const data = await response.json();
    const coords = `${data.result[0].geometry.location.lat},${data.result[0].geometry.location.lng}`;

    const newClub = await this.prisma.club.create({
      data: {
        ...club,
        name: club.name.trim().toLowerCase().split(' ').join('+'),
        location: club.location
          .trim()
          .toLowerCase()
          .split(',')
          .map((each) => each.trim().split(' ').join('+'))
          .join(),
        coords: coords,
      },
    });
    return newClub;
  }

  async deleteClub(id: string): Promise<Club | null> {
    const existingClub = await this.prisma.club.findUnique({
      where: {
        id,
      },
    });

    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: existingClub.adminId,
      },
    });
    await this.prisma.user.update({
      where: {
        id: userToUpdate.id,
      },
      data: {
        ...userToUpdate,
        userType: 'user',
      },
    });

    return await this.prisma.club.delete({
      where: {
        id,
      },
    });
  }
}
