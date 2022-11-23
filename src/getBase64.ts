import setupSh from './setup'

export const setupScriptInUtf8 = (config) => {
    const {
        domainName,
        mysqlRootPassword,
        databaseUser,
        databasePassword,
    } = config

    if (!domainName) {
        throw new Error('Error: must supply domain name to setup script')
    }

    if (!mysqlRootPassword) {
        throw new Error('Error: must supply mysqlRootPassword to setup script')
    }

    if (!databaseUser) {
        throw new Error('Error: must supply databaseUser to setup script')
    }

    if (!databasePassword) {
        throw new Error('Error: must supply databasePassword to setup script')
    }

    let modifiedSetupScript = setupSh.replace(
        '###INJECT_AUTHORIZED_DOMAIN###', 
        `echo "AUTHORIZED_DOMAIN=${domainName}" >> .env`
    )

    // Inject values for database and phpMyAdmin access
    modifiedSetupScript = setupSh.replace(
        '###INJECT_MYSQL_ROOT_PASSWORD###', 
        `echo "MYSQL_ROOT_PASSWORD=${mysqlRootPassword}" >> .env`
    )
    modifiedSetupScript = setupSh.replace(
        '###INJECT_DATABASE_USER###', 
        `echo "DATABASE_USER=${databaseUser}" >> .env`
    )
    modifiedSetupScript = setupSh.replace(
        '###INJECT_DATABASE_PASSWORD###', 
        `echo "DATABASE_PASSWORD=${databasePassword}" >> .env`
    )
    
    return modifiedSetupScript
}

const setupScriptInBase64 = async (config) => {
    const setupScript = await setupScriptInUtf8(config)
    const buf = Buffer.from(setupScript, 'utf-8')
    return buf.toString('base64')
}
 
export default setupScriptInBase64