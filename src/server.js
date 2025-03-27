import http from 'node:http'


const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method == 'GET' && url == '/users') {
        return res.end('listagem de usuários')
    }
    if (method == 'POST' && url == '/users') {
        users.push({
            id: 1,
            nome: 'Jhon',
            email: 'Jhon@gmail.com'
        })


    }

    return res.end('Hello World')


})


server.listen(3333)

