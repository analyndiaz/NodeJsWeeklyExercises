const http = require('http');
const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
    const { url, method, headers, httpVersion } = req;

    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'x-mill-secret-key': 'somerandomtokenstuff',
    });

    res.write('<html>');
    res.write('<body>');
    res.write('<div style="border: 12px solid green">');
    res.write('<h1>HTML response from Node.js server</h1>');
    res.write('<p>The quick brown fox jumps over the lazy dog.</p>');
    res.write('</div>');
    res.write('</body>');
    res.write('</html>');
    res.end();
});

server.listen(port, () => {
    console.log(`Server is now listening to port: ${port}`);
});
