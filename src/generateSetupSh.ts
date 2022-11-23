import { writeFileSync } from 'fs'
import { resolve } from 'path'

import setup from './setup'

writeFileSync(resolve(__dirname, '..', 'scripts', 'setup.sh'), setup, 'utf-8')
console.log('Wrote setup.sh to scripts file.')