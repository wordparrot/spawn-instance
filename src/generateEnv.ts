import { mkdirSync, writeFileSync, rmSync } from 'fs'
import files from './files'

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