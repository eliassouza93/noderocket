import http from 'node:http'
import {randomUUID} from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'


const database = new Database()

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    console.log('Corpo da requisição:', req.body);  //corpo da req

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')

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
            id: randomUUID(),
            name,
            email
        }

        users.push(user)
        database.insert('users', user)

        return res.writeHead(201).end('Usuário criado com sucesso')
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333, () => {
    console.log('Servidor rodando na porta 3333')
})
