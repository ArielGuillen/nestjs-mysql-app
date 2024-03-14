import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { cat, cats } from "./cats.mocks";
import { Cat } from "../entities/cat.entity";
import { CatsService } from "../services/cats.service";

describe("CatsService", () => {
  let service: CatsService;
  let repo: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repo = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return for findAll", async () => {
    jest.spyOn(repo, "find").mockResolvedValueOnce(cats);
    expect((await service.findAll()).data).toEqual(cats);
  });

  it("should return one Cat", async () => {
    jest.spyOn(repo, "findOneBy").mockResolvedValueOnce(cat);
    expect((await service.findOne(cat.id)).data).toEqual(cat);
  });

  it("should return for create", async () => {
    jest.spyOn(repo, "create").mockReturnValueOnce(cat);
    jest.spyOn(repo, "save").mockResolvedValueOnce(cat);

    const response = await service.create(cat);
    expect(response.data).toEqual(cat);
  });

  it("should return for update", async () => {
    jest.spyOn(repo, "update").mockResolvedValueOnce({
      raw: [],
      generatedMaps: undefined,
      affected: 1,
    });

    const response = await service.update(cat.id, cat);
    expect(response.data).toEqual(cat);
  });

  it("should return for remove", async () => {
    jest.spyOn(repo, "delete").mockResolvedValueOnce({
      raw: [],
      affected: 1,
    });
    const response = await service.remove(cat.id);
    expect(response.data).toEqual({ id: cat.id, message: "Cat deleted" });
  });
});
