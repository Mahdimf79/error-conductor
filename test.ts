import { CustomError } from "./src/CustomError";
import ErrorConductor from "./src/index";

const reporter = new ErrorConductor("amqp://localhost", "errors");

// try {
//   throw new Error("This is a general error.");
// } catch (err: any) {
//   reporter.sendError(err, "Repo1");
// }

// try {
//   throw new CustomError("This is a custom error", "Critical", "501");
// } catch (err: any) {
//   reporter.sendError(err, "Repo2");
// }

// reporter.sendError(
//   {
//     category: "Warning",
//     code: "402",
//     timestamp: new Date(),
//     content: "This is a partial error",
//     repository: "Repo3",
//   },
//   "Repo3"
// );
