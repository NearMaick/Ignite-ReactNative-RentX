import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export class User extends Model {
  static table = "users";

  @field("user_id")
  user_id!: string;

  @field("name")
  name!: string;

  @field("drive_license")
  drive_license!: string;

  @field("avatar")
  avatar!: string;

  @field("token")
  token!: string;
}
