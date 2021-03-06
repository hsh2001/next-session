import { Store as ExpressStore } from 'express-session';

export type SessionData = {
  [key: string]: any;
  id: string;
  cookie: SessionCookieData;
  commit: () => Promise<void>;
  destroy: () => Promise<void>;
  isNew: boolean;
};

export interface SessionCookieData {
  path: string;
  maxAge: number | null;
  secure: boolean;
  httpOnly: boolean;
  domain?: string | undefined;
  expires?: Date;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
}

export abstract class SessionStore {
  abstract get: (sid: string) => Promise<SessionData | null>;
  abstract set: (sid: string, sess: SessionData) => Promise<void>;
  abstract destroy: (sid: string) => Promise<void>;
  abstract touch?: (sid: string, sess: SessionData) => Promise<void>;
  on?: (event: string | symbol, listener: (...args: any[]) => void) => this;
}

export interface NormalizedSessionStore {
  [key: string]: any;
  __get: (sid: string) => Promise<SessionData | null>;
  __set: (sid: string, sess: SessionData) => Promise<void>;
  __destroy: (sid: string) => Promise<void>;
  __touch?: (sid: string, sess: SessionData) => Promise<void>;
  __normalized: true,
}

export interface CookieOptions {
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  sameSite?: boolean | 'lax' | 'strict' | 'none';
  maxAge?: number | null;
}

export interface Options {
  name?: string;
  store?: SessionStore | ExpressStore;
  genid?: () => string;
  encode?: (rawSid: string) => string;
  decode?: (encryptedSid: string) => string | null;
  rolling?: boolean;
  touchAfter?: number;
  cookie?: CookieOptions;
  autoCommit?: boolean;
}
