const got = require('got');

const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cloudkit/zones/list', async (req, res) => {
    try {
        const {body} = await got.get('https://api.apple-cloudkit.com/database/1/com.apple.shazam/Production/private/zones/list?ckAPIToken=4984bd7492e2813b6b227b815a262f1a632601eec4c8c6e8f6bc4cf86c2e22fd&ckWebAuthToken='+ req.body.token, {
            responseType: 'json',
            headers: {
                Origin: 'https://www.shazam.com',
                Referer: 'https://www.shazam.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        });

        res.send(body)
    } catch(e) {
        res.writeHead(500)
        res.write(e.message)
        res.end()
    }
})

app.post('/cloudkit/records/query', async (req, res) => {
    try {
        const {body} = await got.post('https://api.apple-cloudkit.com/database/1/com.apple.shazam/production/private/records/query?ckAPIToken=4984bd7492e2813b6b227b815a262f1a632601eec4c8c6e8f6bc4cf86c2e22fd&ckWebAuthToken='+ req.body.token, {
            json: req.body.data,
            responseType: 'json',
            headers: {
                Origin: 'https://www.shazam.com',
                Referer: 'https://www.shazam.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        });
        
        res.send(body)
    } catch(e) {
        res.writeHead(500)
        res.write(e.message)
        res.end()
    }
})

app.listen(port, () => {
  console.log(`Shazify API listening at http://localhost:${port}`)
})