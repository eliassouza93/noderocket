import { Readable } from 'node:stream';
import http from 'node:http';

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    console.log('Body:', body);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server received the data!');
  });
});

const port = 3334;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 800);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
})
  .catch((error) => {
    console.error('Fetch failed:', error);
  });