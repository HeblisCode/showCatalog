import {
  Body,
  Post,
  JsonController,
  Req,
  Res,
  Authorized,
} from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import UserService from "../services/userService";

@JsonController()
export class FavoriteController {}
