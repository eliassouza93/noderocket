import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

console.log(databasePath)


export class Database {
    database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.database = JSON.parse(data)
        }).catch(() => {
            this.persiste()
        })
    }

    persiste() {
        fs.writeFile(databasePath, JSON.stringify(this.database))
    }

    select(table, search) {
        let data = this.database[table] ?? []

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }

        this.persiste()

        return data;

    }
    update(table, id, data) {
        const rouIndex = this.database[table].findIndex(row => row.id === id)
        if (rouIndex > -1) {
            this.database[table][rouIndex] = { id, ...data }
            this.persiste()
        }

    }
    delete(table, id) {
        const rouIndex = this.database[table].findIndex(row => row.id === id)
        if (rouIndex > -1) {
            this.database[table].splice(rouIndex, 1)
            this.persiste()
        }

    }

}