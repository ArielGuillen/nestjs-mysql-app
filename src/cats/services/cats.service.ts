import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Cat } from "../entities/cat.entity";
import { CreateCatDto, UpdateCatDto } from "../dto/";

@Injectable()
export class CatsService {
  private logger = new Logger("CatService");
  constructor(@InjectRepository(Cat) private repository: Repository<Cat>) {}

  async create(input: CreateCatDto) {
    try {
      const cat = this.repository.create(input);
      return await this.repository.save(cat);
    } catch (error) {
      this.logger.error(error);
      return { error: "Error creating cat" };
    }
  }

  async findAll() {
    try {
      return this.repository.find();
    } catch (error) {
      this.logger.error(error);
      return { error: "Error fetching transports" };
    }
  }

  async findOne(id: string) {
    try {
      return this.repository.findOneBy({ id });
    } catch (error) {
      this.logger.error(error);
      return { error: "Error fetching cat" };
    }
  }

  async update(id: string, input: UpdateCatDto) {
    try {
      return await this.repository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      return { error: "Error updating cat" };
    }
  }

  async remove(id: string) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      this.logger.error(error);
      return { error: "Error removing cat" };
    }
  }
}
