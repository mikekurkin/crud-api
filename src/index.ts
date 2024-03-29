import 'dotenv/config.js';
import { createServer as createServerHttp } from 'node:http';
import { parse } from 'querystring';
import { route } from './route';

const PORT = process.env.PORT || 8080;

export const server = createServerHttp((req, res) => {
  let body = '';
  const requestData = { post: {}, get: {} };

  const handler = route(req.method, req.url);

  if (req.url)
    requestData.get = new URL(
      req.url,
      `http://${req.headers.host}`,
    ).searchParams;

  req.on('data', (chunk) => (body += chunk));
  req.on('end', () => {
    console.log(body);
    requestData.post = parse(body);

    const { code, data } = handler(requestData);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(code);
    res.end(JSON.stringify(data));
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});
