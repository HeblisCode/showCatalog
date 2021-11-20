import { Action, createExpressServer } from "routing-controllers";
import "reflect-metadata";
import { ShowController } from "./controllers/showController";
import { UserController } from "./controllers/userController";
import { RatingController } from "./controllers/ratingController";
import { FavoriteController } from "./controllers/favoriteController";

const app = createExpressServer({
  controllers: [
    ShowController,
    UserController,
    RatingController,
    FavoriteController,
  ],
  cors: true,
  authorizationChecker: checkJwtToken,
});

// run express application on port 3000
app.listen(3000, () => {
  console.log("Server up and running");
});

async function checkJwtToken(action: Action) {
  const jwt = require("jsonwebtoken");
  const token = action.request.headers["authorization"].split(" ")[1];
  let isValid: boolean = false;

  jwt.verify(token, "test", (err: any, user: any) => {
    if (err) {
      return;
    } else {
      action.request.userId = user.userId;
      isValid = true;
    }
  });

  return isValid;
}
