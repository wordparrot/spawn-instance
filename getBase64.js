const { readFile } = require('node:fs/promises')

const setupScriptInBase64 = async (domainName) => {
    if (!domainName) {
        throw new Error('Error: must supply domain name to setup script')
    }

    return readFile('./setup.sh', { encoding: 'utf-8' })
    .then((setupSh) => {
        const modifiedSetupScript = setupSh.replace(
            '###INJECT_AUTHORIZED_DOMAIN###', 
            `echo "AUTHORIZED_DOMAIN=${domainName}" >> .env`
        )
        const buf = Buffer.from(modifiedSetupScript, 'utf-8')
        return buf.toString('base64')
    })
}
 
module.exports = setupScriptInBase64

