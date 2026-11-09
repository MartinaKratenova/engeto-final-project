import { randomBytes, timingSafeEqual } from 'node:crypto';

export const csrfProtection = (req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = randomBytes(32).toString('hex');
  }

  res.locals.csrfToken = req.session.csrfToken;
  // Pages contain session-specific tokens and must not be shared by caches.
  res.set('Cache-Control', 'no-store');

  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const token = req.body?._csrf;
  const expected = Buffer.from(req.session.csrfToken);
  if (typeof token !== 'string' || Buffer.byteLength(token) !== expected.length
    || !timingSafeEqual(Buffer.from(token), expected)) {
    return res.status(403).send('Invalid CSRF token. Reload the page and try again.');
  }

  next();
};
