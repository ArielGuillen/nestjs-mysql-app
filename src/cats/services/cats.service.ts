import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Response } from "@/common";

import { Cat } from "../entities/cat.entity";
import { CreateCatDto, UpdateCatDto } from "../dto";

@Injectable()
export class CatsService {
  private logger = new Logger("CatService");
  constructor(@InjectRepository(Cat) private repository: Repository<Cat>) {}

  async create(input: CreateCatDto): Promise<Response<Cat>> {
    try {
      const cat = this.repository.create(input);
      const catCreated = await this.repository.save(cat);
      return Response.success(catCreated);
    } catch (error) {
      this.logger.error(error);
      Response.exception("Error creating cat");
    }
  }

  async findAll() {
    try {
      const cats = await this.repository.find();
      return Response.success(cats);
    } catch (error) {
      this.logger.error(error);
      Response.exception("Error fetching cats");
    }
  }

  async findOne(id: string) {
    try {
      const cat = await this.repository.findOneBy({ id });
      if (!cat) return Response.error("Cat not found", 404);
      return Response.success(cat);
    } catch (error) {
      this.logger.error(error);
      Response.exception("Error fetching cat");
    }
  }

  async update(id: string, input: UpdateCatDto) {
    try {
      const cat = await this.repository.update(id, input);
      if (cat.affected == 0) return Response.error("Cat not found", 404);
      return Response.success({ id, ...input });
    } catch (error) {
      this.logger.error(error);
      Response.exception("Error updating cat");
    }
  }

  async remove(id: string) {
    try {
      const response = await this.repository.delete(id);
      if (response.affected === 0) return Response.error("Cat not found", 404);
      return Response.success({ id, message: "Cat deleted" });
    } catch (error) {
      this.logger.error(error);
      Response.exception("Error deleting cat");
    }
  }
}
