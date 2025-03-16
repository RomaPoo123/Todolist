import { z } from "zod";
import { FieldError } from "../../../common/types/types";

// Типизация todolist с помощью Zod
export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number()
});
export type Todolist = z.infer<typeof TodolistSchema>;

// Типизация todolist
// export type Todolist = {
//   id: string;
//   title: string;
//   addedDate: string;
//   order: number;
// };

