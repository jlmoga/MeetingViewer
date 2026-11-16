/**
 * Servidor HTTP local lleuger per a MeetingViewer
 * No requereix instal·lar cap paquet extern (utilitza mòduls estàndard de Node.js)
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const PUBLIC_DIR = path.join(__dirname, 'www');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

/**
 * Descarrega una URL seguint redireccions de forma transparent
 */
function fetchUrlWithRedirects(targetUrl, maxRedirects, callback) {
  if (maxRedirects <= 0) {
    return callback(new Error('Massa redireccions'));
  }

  try {
    const isHttps = targetUrl.startsWith('https:');
    const client = isHttps ? https : http;

    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/calendar, text/plain, */*'
      }
    }, (res) => {
      // Seguir redireccions (301, 302, 307, 308)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, targetUrl).href;
        return fetchUrlWithRedirects(nextUrl, maxRedirects - 1, callback);
      }
      callback(null, res);
    });

    req.on('error', callback);
  } catch (err) {
    callback(err);
  }
}

const server = http.createServer((req, res) => {
  // Endpoint unificat per a calendaris (iCal / .ics / JSON via URL remota)
  if (req.url.startsWith('/api/calendar') || req.url.startsWith('/api/ics')) {
    try {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      let target = parsedUrl.searchParams.get('url') || parsedUrl.searchParams.get('path') || parsedUrl.searchParams.get('file');
      if (!target) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Falta el paràmetre url');
        return;
      }

      target = target.trim();

      // Convertir esquema webcal a https
      if (target.startsWith('webcal://')) {
        target = 'https://' + target.slice('webcal://'.length);
      }

      const isRemoteUrl = /^https?:\/\//i.test(target);
      if (!isRemoteUrl) {
        res.writeHead(400, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        });
        res.end('Només s\'admeten adreces URL remotes (http:// o https://)');
        return;
      }

      console.log(`[Calendar Proxy] Descarregant: ${target.slice(0, 80)}...`);

      fetchUrlWithRedirects(target, 5, (err, remoteRes) => {
        if (err) {
          console.error('[Calendar Proxy] Error descarregant:', err.message);
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('Error descarregant calendari: ' + err.message);
          return;
        }

        const isJson = target.toLowerCase().endsWith('.json');
        const defaultType = isJson ? 'application/json; charset=utf-8' : 'text/calendar; charset=utf-8';

        res.writeHead(remoteRes.statusCode, {
          'Content-Type': remoteRes.headers['content-type'] || defaultType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
        remoteRes.pipe(res);
      });
      return;
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error intern de la API de calendaris: ' + e.message);
      return;
    }
  }

  let reqPath = decodeURI(req.url.split('?')[0]);

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Evitar directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Prohibit');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 No trobat: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  MEETING VIEWER - SPLIT-FLAP STATION BOARD`);
  console.log(`  Servidor web iniciat correctament!`);
  console.log(`  Adreça local: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
