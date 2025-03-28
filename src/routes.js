import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { builRoutePath } from './utils/build-route-path.js'

const database = new Database()



export const routes = [
    {
        method: 'GET',
        path: builRoutePath('/users'),
        handler: (req, res) => {
            console.log(req.query)
            const users = database.select('users')
          
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: builRoutePath('/users'),
        handler: (req, res) => {
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
            database.insert('users', user)

            return res.writeHead(201).end('Usuário criado com sucesso')
        }
    },
    {
        method: 'PUT',
        path: builRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.parms
            const { name, email } = req.body
            database.update('users', id, {
                name,
                email
            })
            return res.writeHead(204).end()

        },
    },
    {
        method: 'DELETE',
        path: builRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.parms
            database.delete('users', id)
            return res.writeHead(204).end()

        },
    }

]