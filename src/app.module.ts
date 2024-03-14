import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DBConfigService } from "@/config/";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
    }),
    CatsModule,
  ],
})
export class AppModule {}
