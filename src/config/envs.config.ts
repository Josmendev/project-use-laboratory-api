import 'dotenv/config';
import * as joi from 'joi';

interface EnvsVars {
  SERVER_PORT: number;
  SALT_ROUNDS: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    SALT_ROUNDS: joi.number().default(10),
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
};
