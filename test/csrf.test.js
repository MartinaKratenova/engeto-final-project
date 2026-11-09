import assert from 'node:assert/strict';
import { test } from 'node:test';
import express from 'express';
import session from 'express-session';
import { csrfProtection } from '../middleware/csrf.js';

test('CSRF tokens protect state-changing requests and are bound to a session', async (t) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(session({ secret: 'test-only-session-secret', resave: false, saveUninitialized: false }));
  app.use(csrfProtection);
  app.get('/', (req, res) => res.json({ token: res.locals.csrfToken }));
  for (const path of ['/login', '/addDish', '/admin/1/update', '/admin/1/delete', '/logout']) {
    app.post(path, (req, res) => res.sendStatus(204));
  }

  const server = app.listen(0, '127.0.0.1');
  t.after(() => new Promise(resolve => server.close(resolve)));
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const page = await fetch(base);
  const cookie = page.headers.get('set-cookie').split(';')[0];
  const { token } = await page.json();
  assert.match(token, /^[a-f0-9]{64}$/);
  assert.equal(page.headers.get('cache-control'), 'no-store');
  const otherPage = await fetch(base);
  const otherToken = (await otherPage.json()).token;

  for (const path of ['/login', '/addDish', '/admin/1/update', '/admin/1/delete', '/logout']) {
    for (const submitted of ['', 'invalid', otherToken, ['duplicate', token]]) {
      const body = new URLSearchParams();
      for (const value of Array.isArray(submitted) ? submitted : [submitted]) body.append('_csrf', value);
      const response = await fetch(base + path, { method: 'POST', headers: { cookie }, body });
      assert.equal(response.status, 403, `${path} must reject invalid tokens`);
      await response.text();
    }
    const accepted = await fetch(base + path, {
      method: 'POST', headers: { cookie }, body: new URLSearchParams({ _csrf: token })
    });
    assert.equal(accepted.status, 204);
  }
  const noSession = await fetch(base + '/logout', {
    method: 'POST', body: new URLSearchParams({ _csrf: token })
  });
  assert.equal(noSession.status, 403);
  await noSession.text();
  assert.equal((await fetch(base + '/logout', { headers: { cookie } })).status, 404);
});
