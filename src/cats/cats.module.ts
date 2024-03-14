import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CatsService } from "./services/cats.service";
import { CatsController } from "./controllers/cats.controller";
import { Cat } from "./entities/cat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
