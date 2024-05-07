import * as z from "zod";

export const ProductInputCreate = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  tags: z.string(),
  image: z
    .array(
      z.object({
        publicId: z.string(),
        url: z.string(),
        id: z.string().optional(),
      }),
    )
    .optional(),
});

export const productInput = ProductInputCreate.pick({
  name: true,
  description: true,
  price: true,
  tags: true,
});

export type ProductInput = z.TypeOf<typeof productInput>;
