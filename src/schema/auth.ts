<<<<<<< HEAD
import * as z from "zod";

export const createUserInput = z.object({
=======
import z from "zod";

export const SignupSchema = z.object({
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
<<<<<<< HEAD

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
=======
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8
