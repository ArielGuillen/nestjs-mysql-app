import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { Response } from "@/common";

import { CatsService } from "../services/cats.service";
import { CreateCatDto } from "../dto/";

@Controller("cats")
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get()
  async findAll(): Promise<any> {
    const response = await this.service.findAll();
    if (response.error) Response.exception(response.error, response.status);
    return response.data;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<any> {
    const response = await this.service.findOne(id);
    if (response.error) Response.exception(response.error, response.status);
    return response.data;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() input: CreateCatDto): Promise<any> {
    const response = await this.service.create(input);
    if (response.error) Response.exception(response.error, response.status);
    return response.data;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() input: CreateCatDto): Promise<any> {
    const response = await this.service.update(id, input);
    if (response.error) Response.exception(response.error, response.status);
    return response.data;
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<any> {
    const response = await this.service.remove(id);
    if (response.error) Response.exception(response.error, response.status);
    return response.data;
  }
}
