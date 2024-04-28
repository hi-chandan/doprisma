import * as z from "zod";

export const createUserInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupInput = createUserInput.pick({
  email: true,
  password: true,
  name: true,
});

export const loginInput = createUserInput.pick({
  email: true,
  password: true,
});

export const updateInput = createUserInput.pick({
  name: true,
  email: true,
});
export type updateInput = z.TypeOf<typeof updateInput>;

export type loginInput = z.TypeOf<typeof loginInput>;

export type SignupInput = z.TypeOf<typeof signupInput>;
