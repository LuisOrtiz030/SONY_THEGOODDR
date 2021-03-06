const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const app = bottender({
    dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        bodyParser.json({
            verify: (req, _, buf) => {
                req.rawBody = buf.toString();
            },
        })
    );

    server.get('/api', (req, res) => {
        res.json({ ok: true });
    });

    server.get('/', (req, res) => {
        res.send("Conectado. Al puerto");
    });

    server.get('/webhooks/messenger', (req, res) => {
        if (req.query['hub.verify_token'] === 'CNSONY20') {
            res.send(req.query['hub.challenge'])
        } else {
            res.send("Tu no")
        }
    })

    server.all('*', (req, res) => {
        return handle(req, res);
    });


    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});