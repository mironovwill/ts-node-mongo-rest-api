import crypto from 'crypto';

const SECRET = 'DANIEL_REST_API';

export const random = () => crypto.randomBytes(129).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};
