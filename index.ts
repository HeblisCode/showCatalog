import { createExpressServer } from "routing-controllers";
import "reflect-metadata";
import { AppController } from "./controllers/appController";
import { SQLZ } from "./utils/SQLZ";

const app = createExpressServer({
  controllers: [AppController],
});

// run express application on port 3000
app.listen(3000, () => {
  console.log("Server up and running");
});

const test = SQLZ.getInstance();

(async () => {
  try {
    await test.authenticate();
    console.log("yep");
  } catch (err) {
    console.log("nope", err);
  }
})();
