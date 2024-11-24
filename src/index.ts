import amqp from "amqplib";
import { CustomError } from "./CustomError";

interface ErrorDetails {
  category: string;
  code: string;
  timestamp: Date;
  content: string;
  repository: string;
  stack?: string;
}

type ErrorInput = Error | CustomError | Partial<ErrorDetails>;

class ErrorConductor {
  private rabbitMQUrl: string;
  private queueName: string;

  constructor(rabbitMQUrl: string, queueName: string) {
    this.rabbitMQUrl = rabbitMQUrl;
    this.queueName = queueName;
  }

  async sendError(error: ErrorInput, repository: string): Promise<void> {
    const errorDetails = this.formatError(error, repository);

    try {
      const connection = await amqp.connect(this.rabbitMQUrl);
      const channel = await connection.createChannel();

      await channel.assertQueue(this.queueName);

      channel.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(errorDetails))
      );

      await channel.close();
      await connection.close();
    } catch (err) {
      console.error("Failed to send error to RabbitMQ:", err);
    }
  }

  private formatError(error: ErrorInput, repository: string): ErrorDetails {
    if (error instanceof CustomError) {
      return {
        category: error.category,
        code: error.code,
        timestamp: new Date(),
        content: error.message,
        repository,
        stack: error.stack,
      };
    }

    if (error instanceof Error) {
      return {
        category: "General",
        code: "500",
        timestamp: new Date(),
        content: error.message,
        repository,
        stack: error.stack,
      };
    }

    return {
      category: error.category || "General",
      code: error.code || "500",
      timestamp: error.timestamp || new Date(),
      content: error.content || "Unknown error",
      repository,
      stack: error.stack,
    };
  }
}

export default ErrorConductor;
