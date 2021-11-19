import { Action, createExpressServer } from "routing-controllers";
import "reflect-metadata";
import { AppController } from "./controllers/appController";

const app = createExpressServer({
  controllers: [AppController],
  cors: true,
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["testtoken"];
    return token === "testToken:190561756138456197418347194";
  },
});

// run express application on port 3000
app.listen(3000, () => {
  console.log("Server up and running");
});
