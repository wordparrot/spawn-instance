const { mkdirSync, writeFileSync, rmSync } = require('fs')
const files = require('./src/files')

try {
    rmSync('./scripts', {recursive: true})
} catch (e) {
    // will throw error if no folder exists, but we can ignore this.
}

mkdirSync('./scripts')

files.forEach((file) => {
    try {
        writeFileSync(`./scripts/${file.name}`, file.rawString, 'utf-8')
    } catch (e) {
        console.log(`Failed to write ${file.name}.`)
    }
})