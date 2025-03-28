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
    res.end('fake http iniciado!');
  });
});

const port = 3332;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 10) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 800);
  }
}

fetch('http://localhost:3332', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half',
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
}) 



