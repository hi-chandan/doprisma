import * as z from "zod";

export const createAddress = z.object({
  lineone: z.string(),
  city: z.string(),
  country: z.string(),
  pincode: z.string(),
  userId: z.string(),
});

export type addresstype = z.TypeOf<typeof createAddress>;
