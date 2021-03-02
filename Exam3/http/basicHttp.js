const http = require('http');

const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
    const { url, method, headers, httpVersion } = req;

    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.write('Hello world. Message received.\n\n');
    res.write(`URL: ${url}\n\n`);
    res.write(`Method: ${method}\n\n`);
    res.write(`HTTP Version: ${httpVersion}\n\n`);
    res.write(`headers: ${JSON.stringify(headers)}`);
    res.end();
});

server.listen(port, () => {
    console.log(`Server is now listening to port: ${port}`);
});
