// Tokens for the public API are JWTs issued by our auth provider.
export function parseToken(header: string | null) {
  const token = (header ?? '').replace(/^Bearer\s+/i, '');
  const [, payload] = token.split('.');
  const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  return { userId: claims.sub as string, role: claims.role as string };
}
