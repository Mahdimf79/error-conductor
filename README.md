# ErrorConductor

**A NodeJS package for centralized error reporting using RabbitMQ**

`ErrorConductor` is a NodeJS package that allows you to send and manage errors across multiple repositories to a RabbitMQ queue. It provides a unified way to report, categorize, and track errors, making it easy to monitor and analyze system failures.

### Installation

```bash
npm install error-conductor
```

### Usage

#### Example 1: Sending a general error

```typescript
import ErrorConductor, { CustomError } from "error-conductor";

// Initialize the ErrorConductor with RabbitMQ connection URL and queue name
const reporter = new ErrorConductor("amqp://localhost", "errors");

try {
  throw new Error("This is a general error.");
} catch (err) {
  reporter.sendError(err, "Repo1");
}
```

#### Example 2: Sending a custom error

```typescript
import ErrorConductor, { CustomError } from "error-conductor";

const reporter = new ErrorConductor("amqp://localhost", "errors");

try {
  throw new CustomError("This is a custom error", "Critical", "501");
} catch (err) {
  reporter.sendError(err, "Repo2");
}
```

#### Example 3: Sending a partial error

```typescript
import ErrorConductor from "error-conductor";

const reporter = new ErrorConductor("amqp://localhost", "errors");

reporter.sendError({
  category: "Warning",
  code: "402",
  timestamp: new Date(),
  content: "This is a partial error",
  repository: "Repo3",
});
```

#### Example 4: Receiving errors from the RabbitMQ queue

You can use the `receiveErrors` method to listen for error messages on the RabbitMQ queue. The method takes a callback function that handles the received error data.

```typescript
import ErrorConductor from "error-conductor";

const receiver = new ErrorConductor("amqp://localhost", "errors");

receiver.receiveErrors((errorDetails) => {
  console.log("Received error:", errorDetails);
  // Handle the errorDetails as needed
});
```

### CustomError Class

You can create your own custom errors by extending the `CustomError` class. This allows you to specify custom error categories and codes.

```typescript
import { CustomError } from "error-conductor";

class MyCustomError extends CustomError {
  constructor(message: string, category: string, code: string) {
    super(message, category, code);
  }
}
```

### Options

`ErrorConductor` uses RabbitMQ for sending errors. It takes two parameters when being initialized:

- **RabbitMQ URL**: The connection URL for your RabbitMQ server (e.g., `amqp://localhost`).
- **Queue Name**: The name of the queue where errors will be sent (e.g., `"errors"`).

```typescript
const reporter = new ErrorConductor("amqp://localhost", "errors");
```

### Why Use ErrorConductor?

`ErrorConductor` provides a way to easily track and manage errors in large-scale distributed applications. By centralizing error reports in RabbitMQ, you can:

- **Monitor errors**: Gain visibility across multiple repositories.
- **Analyze issues**: Use consistent error formats for easier debugging.
- **React quickly**: Streamline error handling for rapid resolution.

### Contributing

Contributions are welcome! If you'd like to contribute to the development of `ErrorConductor`, feel free to submit a pull request.

### License

`ErrorConductor` is open-source and released under the MIT license.
