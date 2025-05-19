import 'dotenv/config';
import * as joi from 'joi';

interface EnvsVars {
  SERVER_PORT: number;
  SALT_ROUNDS: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: boolean;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    SALT_ROUNDS: joi.number().default(10),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_SYNCHRONIZE: joi.boolean().default(true),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const validationResult = envsSchema.validate(process.env);

if (validationResult.error)
  throw new Error(`Config validation error: ${validationResult.error.message}`);

const envVars: EnvsVars = validationResult.value as EnvsVars;

export const envs = {
  server: {
    port: envVars.SERVER_PORT,
  },
  hash: {
    saltRounds: envVars.SALT_ROUNDS,
  },
  db: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    synchronize: envVars.DB_SYNCHRONIZE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
};
