import http from 'node:http'

const users = []

const server = http.createServer(async(req, res) => {
    const { method, url } = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const body =  Buffer.concat(buffers).toString() 

    console.log(body  || 'nome não encontrado')

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const user = {
            id: users.length + 1,
            name: 'Jhon',
            email: 'Jhon@gmail.com'
        }
        users.push(user)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end('not found')
})

server.listen(3333)
