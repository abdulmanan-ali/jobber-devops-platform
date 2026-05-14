import { config } from '@notifications/config';
import { winstonLogger } from '@abdulmanan-ali/jobber-shared';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const client = require('amqplib');
import { Channel } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationQueueConnection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection = await client.connect(`${config.RABBITMQ_ENDPOINT}` as string);
    const channel: Channel = await connection.createChannel();
    log.info('Notification server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'NotificationService error createConnection() method:', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: any): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };


// Genuine
// import { config } from '@notifications/config';
// import { winstonLogger } from '@abdulmanan-ali/jobber-shared';
// import client, { Channel, ChannelModel } from 'amqplib';
// import { Logger } from 'winston';

// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationQueueConnection', 'debug');

// async function createConnection(): Promise<Channel | undefined> {
//   try {
//     const connection: ChannelModel = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
//     const channel: Channel = await connection.createChannel();
//     log.info('Notification server connected to queue successfully...');
//     closeConnection(channel, connection);
//     return channel;
//   } catch (error) {
//     log.log('error', 'NotificationService error createConnection() method:', error);
//     return undefined;
//   }
// }

// function closeConnection(channel: Channel, connection: ChannelModel): void {
//   process.once('SIGINT', async () => {
//     await channel.close();
//     await connection.close();
//   });
// }

// export { createConnection };


// Claude

// import { config } from '@notifications/config';
// import { winstonLogger } from '@abdulmanan-ali/jobber-shared';
// import * as amqp from 'amqplib';
// import { Channel, Connection } from 'amqplib';
// import { Logger } from 'winston';

// const log: Logger = winstonLogger(
//   `${config.ELASTIC_SEARCH_URL}`,
//   'notificationQueueConnection',
//   'debug'
// );

// async function createConnection(): Promise<Channel | undefined> {
//   let connection: Connection | undefined;
//   let channel: Channel | undefined;

//   try {
//     connection = await amqp.connect(`${config.RABBITMQ_ENDPOINT}`);
//     channel = await connection.createChannel();

//     log.info('Notification server connected to queue successfully...');

//     closeConnection(channel, connection);

//     return channel;
//   } catch (error) {
//     log.log('error', 'NotificationService error createConnection() method:', error);
//     return undefined;
//   }
// }

// function closeConnection(channel: Channel, connection: Connection): void {
//   process.once('SIGINT', async () => {
//     try {
//       await channel.close();
//       await connection.close();
//       log.info('RabbitMQ connection closed gracefully');
//     } catch (error) {
//       log.error('Error while closing RabbitMQ connection', error);
//     }
//   });
// }

// export { createConnection };




