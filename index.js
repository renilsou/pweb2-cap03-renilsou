// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):
//
import http from 'node:http';

 const PORT = process.env.PORT || 3000;

 const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ mensagem: 'Olá, Mundo!'}));
        return;
    }

    if (method === 'GET' && url === '/sobre') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<h1>Sobre</h1>');
        return;
    }

    const partes = url.split('/').filter(Boolean);

    if (method === 'GET' && partes[0] === 'saudacao' && partes.length === 2) { 
        const nome = partes[1]; 
        res.writeHead(200, { 'Content-Type': 'text/plain' }); 
        res.end(`Olá, ${nome}!`); 
        return; 
    }

    if (method === 'POST' && url === '/echo') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(body);
        });
        return;
    }

    if (method === 'PUT' && partes[0] === 'itens' && partes.length === 2) {
        const id = partes[1];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Item ${id} atualizado`);
        return;
    }
 
});

 server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
