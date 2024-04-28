import * as z from "zod";

export const ProductInputCreate = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.string(),
});

export const productInput = ProductInputCreate.pick({
  name: true,
  description: true,
  price: true,
  tags: true,
});

export type ProductInput = z.TypeOf<typeof productInput>;
