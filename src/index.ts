import 'dotenv/config.js';
import { createServer as createServerHttp } from 'node:http';
import { route } from './route.ts';

const app = () => {
  const PORT = process.env.PORT || 8080;

  const crudServer = createServerHttp((req, res) => {
    const handler = route(req.method, req.url);
    const { code, data } = handler();
    res.writeHead(code);
    res.end(data);
  });

  crudServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
  });
};

app();
