//process.stdin
//  .pipe(process.stdout)


import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)

            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }

        }, 800);

    }
}

class MultiplayByTenStream extends Writable {
    _write(chunk, encondig, callback) {
        console.log(chunk.toString() * 10)
        callback()
    }

}

class InverseNumberStream extends Transform {
    _transform(chunk, encondig, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}



new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplayByTenStream)



