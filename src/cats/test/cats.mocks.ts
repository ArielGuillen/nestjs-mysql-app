import { Response } from "@/common";
import { Cat } from "../entities/cat.entity";

export const cat: Cat = {
  id: "a47ecdc2-77d6-462f-9045-c440c5e4616f",
  name: "hello",
};

export const cats: Cat[] = [cat];

export const createCatDto = {
  name: "hello",
};

export const catResponse: Response<Cat> = {
  data: cat,
  error: undefined,
  status: 200,
};

export const catsResponse: Response<Cat[]> = {
  data: cats,
  error: undefined,
  status: 200,
};

export const deleteCatResponse: Response<Cat> = {
  data: { id: cat.id, message: "Cat deleted" },
  error: undefined,
  status: 200,
};
