import UserRepo, { User } from "../repository/userRepo";

export default class UserService {
  private userRepo: UserRepo = new UserRepo();

  async login(payload: User) {
    const isUserRegistered: boolean = await this.userRepo.isUserRegistered(
      payload
    );
    if (isUserRegistered) {
      return "testToken:190561756138456197418347194";
    } else {
      throw "not registered";
    }
  }
}
