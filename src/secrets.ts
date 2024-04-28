<<<<<<< HEAD
import "dotenv/config";
=======
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
>>>>>>> 01e9a1c70a3e400f3647ee66bef6c1a137f5d7b8

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET!;
