export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic') {
      const decoded = Buffer.from(encoded, 'base64').toString();
      if (decoded === 'storyhub:ensemble') {
        res.setHeader('Set-Cookie', `sh_auth=1; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax`);
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
      }
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="StoryHub Report"');
  res.statusCode = 401;
  res.end('Unauthorized');
}
