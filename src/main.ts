import { mkdir, writeFile, rmdir } from 'fs/promises';
import fileList from './templates/fileList'

/*
Generate a list of files for wordparrot use. Includes:
- .env
- .env.sandbox
- docker-compose.yml
- setup.sh
- start.sh

Important variables will also be injected into the files.
*/
export const main = () => {
    ((async () => {
        try {
            await rmdir('./build', {
                recursive: true
            })
            await mkdir('./build');

            await Promise.all(fileList.map((file) => {
                return writeFile(`./build/${file.name}`, file.rawString, 'utf-8')
            }))

            console.log('Spawn Instance file generation completed.');
            process.exit(0);
        } catch (e) {
            // will throw error if no folder exists, but we can ignore this.
            console.log('Spawn Instance file generation failed.');
            console.log(e);
            process.exit(1);
        }
    })())
} 