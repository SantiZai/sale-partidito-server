import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { Court } from '@prisma/client';

@Controller('courts')
export class CourtsController {
  constructor(private courtsService: CourtsService) {}

  @Get('club/:id')
  async findByClubId(@Param('id') id: string): Promise<Court[] | null> {
    return await this.courtsService.getCourtsByClubId(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Court | null> {
    return await this.courtsService.getCourtById(id);
  }

  @Post()
  async create(@Body() court: Court): Promise<Court> {
    return await this.courtsService.createCourt(court);
  }
}
