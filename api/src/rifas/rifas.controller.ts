import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AddOwnerDto } from './dto/body/addOwner.dto';
import { AddRifaDto } from './dto/body/addRifa.dto';
import { RifaDto } from './dto/expose/rifa.dto';
import { RifasService } from './rifas.service';

@UseGuards(JwtAuthGuard)
@Controller('rifas')
export class RifasController {
  constructor(private rifasService: RifasService) {}

  @Serialize(RifaDto)
  @Get()
  async list(@Request() req) {
    return await this.rifasService.list(req.user);
  }

  @Post()
  async create(@Body() body: AddRifaDto, @Request() req) {
    return await this.rifasService.add(body, req.user);
  }

  @Serialize(RifaDto)
  @Post('/addOwner')
  async addOwner(@Body() body: AddOwnerDto) {
    return await this.rifasService.addOwner(body);
  }

  @Serialize(RifaDto)
  @Post('/removeOwner')
  async removeOwner(@Body() body: AddOwnerDto) {
    return await this.rifasService.removeOwner(body);
  }
}
