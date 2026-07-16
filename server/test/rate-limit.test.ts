import assert from 'node:assert/strict';
import test from 'node:test';
import type { NextFunction, Request, Response } from 'express';
import { createRateLimit } from '../src/middleware/rate-limit.js';

test('rejects requests after the per-client limit is reached', () => {
  const rateLimit = createRateLimit({ windowMs: 60_000, maxRequests: 2 });
  const request = {
    ip: '127.0.0.1',
    socket: {},
  } as Request;
  let nextCalls = 0;
  let statusCode = 200;
  let responseBody: unknown;
  const response = {
    setHeader() {
      return this;
    },
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(body: unknown) {
      responseBody = body;
      return this;
    },
  } as unknown as Response;
  const next = (() => {
    nextCalls += 1;
  }) as NextFunction;

  rateLimit(request, response, next);
  rateLimit(request, response, next);
  rateLimit(request, response, next);

  assert.equal(nextCalls, 2);
  assert.equal(statusCode, 429);
  assert.deepEqual(responseBody, { error: 'Too many requests' });
});
