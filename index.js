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

    //rota 01
    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Olá, Mundo!');
        return;
    }

    //rota 02
    if (method === 'GET' && url === '/sobre') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end('<h1>Sobre</h1>');
        return;
    }

    //rota 03
    const partes = url.split('/').filter(Boolean);

    if (method === 'GET' && partes[0] === 'saudacao' && partes.length === 2) { 
        const nome = partes[1]; 
        res.writeHead(200, { 'Content-Type': 'text/plain' }); 
        res.end(`Olá, ${nome}!`); 
        return; 
    }

    //rota 04
    if (method === 'POST' && url === '/echo') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(body);
        });
        return;
    }

    //rota 05
    if (method === 'PUT' && partes[0] === 'itens' && partes.length === 2) {
        const id = partes[1];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Item ${id} atualizado`);
        return;
    }

    //rota 06
    if (method === 'DELETE' && partes[0] === 'itens' && partes.length === 2) {
        res.writeHead(204);
        res.end();
    }

    //rota 07
    if (method === 'PATCH' && url === '/config') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Configuração atualizada');
        return;
    }

    //rota 08
    if (method === 'HEAD' && url === '/status') {
        res.writeHead(200, { 'X-Status': 'ok' })
        res.end();
        return;
    }

    //rota 09
    if (method === 'GET' && url === '/agente') {
        const ua = (req.headers['user-agent'] || '').toLocaleLowerCase();
        let resposta;
        if (ua.includes('curl')) resposta = 'Você é o cURL';
        else if (ua.includes('chrome')) resposta = 'Você é um navegador';
        else resposta = 'Agente desconhecido';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(resposta);
        return;
    }

    //rota 10
    if (method === 'GET' && url === '/secreto') {
        if (req.headers['x-senha'] === '1234') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Acesso liberado');
        } else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Não autorizado')
        }
        return;
    }
 
});

 server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
