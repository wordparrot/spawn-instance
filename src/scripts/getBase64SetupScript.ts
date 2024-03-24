import setupSh from '../templates/setup.sh'

export const getSetupScriptWithInjectedVars = (config: {
    domainName: string
    mysqlRootPassword: string
    databaseUser: string
    databasePassword: string
}) => {
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
    modifiedSetupScript = modifiedSetupScript.replace(
        '###INJECT_MYSQL_ROOT_PASSWORD###', 
        `echo "MYSQL_ROOT_PASSWORD=${mysqlRootPassword}" >> .env`
    )
    modifiedSetupScript = modifiedSetupScript.replace(
        '###INJECT_DATABASE_USER###', 
        `echo "DATABASE_USER=${databaseUser}" >> .env`
    )
    modifiedSetupScript = modifiedSetupScript.replace(
        '###INJECT_DATABASE_PASSWORD###', 
        `echo "DATABASE_PASSWORD=${databasePassword}" >> .env`
    )
    
    return modifiedSetupScript
}

const getBase64SetupScript = async (config) => {
    const setupScript = getSetupScriptWithInjectedVars(config);
    const buf = Buffer.from(setupScript, 'utf-8')
    return buf.toString('base64')
}
 
export default getBase64SetupScript