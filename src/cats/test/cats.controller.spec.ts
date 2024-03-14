import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CatsService } from "../services/cats.service";
import { CatsController } from "../controllers/cats.controller";
import { Cat } from "../entities/cat.entity";

import { createCatDto, deleteCatResponse, cat, catResponse, catsResponse } from "./cats.mocks";

describe("CatController", () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all cats", async () => {
    jest.spyOn(service, "findAll").mockResolvedValueOnce(catsResponse);
    expect(await service.findAll()).toEqual(catsResponse);
  });

  it("should return one cat", async () => {
    jest.spyOn(service, "findOne").mockResolvedValueOnce(catResponse);
    expect(await service.findOne("1")).toEqual(catResponse);
  });

  it("should create a cat", async () => {
    jest.spyOn(service, "create").mockResolvedValueOnce(catResponse);
    expect(await service.create(createCatDto)).toEqual(catResponse);
  });

  it("should update a cat", async () => {
    jest.spyOn(service, "update").mockResolvedValueOnce(catResponse);
    expect(await service.update(cat.id, createCatDto)).toEqual(catResponse);
  });

  it("should delete a cat", async () => {
    jest.spyOn(service, "remove").mockResolvedValueOnce(deleteCatResponse);
    expect(await service.remove(cat.id)).toEqual(deleteCatResponse);
  });
});
