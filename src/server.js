import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    console.log('Corpo da requisição:', req.body);  //corpo da req

    if (method === 'GET' && url === '/users') {
        return res
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body || {}

        console.log('Nome:', name)
        console.log('Email:', email)

        if (!name || !email) {
            return res.writeHead(400).end('Nome e email são obrigatórios')
        }

        const user = {
            id: users.length + 1,
            name,
            email
        }

        users.push(user)

        return res.writeHead(201).end('Usuário criado com sucesso')
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333, () => {
    console.log('Servidor rodando na porta 3333')
})
