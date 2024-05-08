import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { CourtsService } from './courts/courts.service';
import { CourtsController } from './courts/courts.controller';
import { ClubsService } from './clubs/clubs.service';
import { ClubsController } from './clubs/clubs.controller';
import { ReservationsService } from './reservations/reservations.service';
import { ReservationsController } from './reservations/reservations.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, CourtsController, ClubsController, ReservationsController],
  providers: [AppService, PrismaService, UsersService, CourtsService, ClubsService, ReservationsService],
})
export class AppModule {}
