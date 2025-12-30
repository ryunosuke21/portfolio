import { APP_NAME } from "@/constants/app-info";

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;

export const MAX_SESSIONS = 5;
/**
 * 5 minutes -
 * Time in MS
 */
export const SESSION_FRESH_TIME = 5 * 60 * 1000;

export const ISSUER = APP_NAME;
export const BACKUP_CODES_AMOUNT = 10;
export const BACKUP_CODES_LENGTH = 16;

export const TWO_FACTOR_DIGITS = 6;
export const TWO_FACTOR_PERIOD = 32;

export const DEFAULT_BAN_REASON =
  "You are banned from using our services. If you believe this is an error, please contact support.";
