import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club, SPORTS } from '@prisma/client';

@Controller('clubs')
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Get(':location/:sport')
  async findByLocationAndSport(
    @Param('location') location: string,
    @Param('sport') sport: SPORTS,
  ): Promise<Club[] | null> {
    return await this.clubsService.getClubsByLocationAndSport(location, sport);
  }

  @Get(':location')
  async findByLocation(
    @Param('location') location: string,
  ): Promise<Club[] | null> {
    return await this.clubsService.getClubsByLocation(location);
  }

  @Post()
  async create(@Body() club: Club): Promise<Club> {
    return await this.clubsService.createClub(club);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Club | null> {
    return await this.clubsService.deleteClub(id);
  }
}
