import { appSchema } from "@nozbe/watermelondb/Schema";
import { carsSchema } from "./carSchema";
import { userSchema } from "./userSchema";

export const schemas = appSchema({
  version: 2,
  tables: [userSchema, carsSchema],
});
