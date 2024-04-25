import bcrypt from 'bcryptjs'
import * as jose from 'jose'
import arc from '@architect/functions'
export const getHashFromPassword = async ({ password }) => {
    let hash = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                reject(err)
                return
            }
            bcrypt.hash(password, salt, function (err, hash) {

                if (err) {
                    reject(err)
                    return
                }
                // Store hash in your password DB.
                resolve(hash)
            });
        });
    })

    return hash
}

export const verifyHashFromPassword = async ({ password, hash }) => {

    return await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        });
    })
}

export const generateNewKeyPair = async () => {
    return await new Promise(async (resolve, reject) => {
        const { publicKey, privateKey } = await jose.generateKeyPair('RS256')

        let reply = {
            publicKey: await jose.exportJWK(publicKey),
            privateKey: await jose.exportJWK(privateKey)
        }


        resolve(reply)
    })

}

export const saveKeys = async ({ publicKey, privateKey }) => {
    let Tables = await arc.tables()
    let namespaceKey = process.env.ARC_ENV || ''

    await Tables.siteMetadata.put({
        metaDataId: 'publicKey_JWT_' + namespaceKey,
        value: JSON.stringify(publicKey),
    })

    await Tables.siteMetadata.put({
        metaDataId: 'privateKey_JWT_' + namespaceKey,
        value: JSON.stringify(privateKey),
    })
}

export const loadKeys = async () => {
    let Tables = await arc.tables()
    let namespaceKey = process.env.ARC_ENV || ''

    let publicKeyObject = await Tables.siteMetadata.get({
        metaDataId: 'publicKey_JWT_' + namespaceKey
    })
    let privateKeyObject = await Tables.siteMetadata.get({
        metaDataId: 'privateKey_JWT_' + namespaceKey
    })

    // console.log(publicKey, privateKey)

    return {
        publicKey: JSON.parse(publicKeyObject.value),
        privateKey: JSON.parse(privateKeyObject.value)
    }
}

export const provideKeys = async () => {
    if (process.env.PRIVATE_KEY && process.env.PUBLIC_KEY) {
        return {
            privateKey: JSON.parse(process.env.PRIVATE_KEY),
            publicKey: JSON.parse(process.env.PUBLIC_KEY)
        }
    }
    let namespaceKey = process.env.ARC_ENV || ''

    try {
        let loadedKeys = await loadKeys()

        process.env.PRIVATE_KEY = JSON.stringify(loadedKeys.privateKey)
        process.env.PUBLIC_KEY = JSON.stringify(loadedKeys.publicKey)
    } catch (e) {
        let newKeys = await generateNewKeyPair()
        await saveKeys(newKeys)

        process.env.PRIVATE_KEY = JSON.stringify(newKeys.privateKey)
        process.env.PUBLIC_KEY = JSON.stringify(newKeys.publicKey)
    }

    return {
        //
        namespaceKey,
        publicKey: JSON.parse(process.env.PUBLIC_KEY),
        privateKey: JSON.parse(process.env.PRIVATE_KEY)
    }
}

export const issueJWT = async ({ userID = 'unkownUserID' }) => {
    let keys = await provideKeys()

    const alg = 'RS256'
    const jwk = keys.privateKey
    const privateKey = await jose.importJWK(jwk, alg)

    const jwt = await new jose.SignJWT({ 'urn:timeversation:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setJti(userID)
        .setIssuer('urn:timeversation:issuer')
        .setAudience('urn:timeversation:audience')
        .setExpirationTime('1year')
        .sign(privateKey)

    // console.log(jwt)

    return jwt
}

export const verifyJWT = async ({ jwt = '' }) => {
    let keys = await provideKeys()

    const alg = 'RS256'
    const jwk = keys.publicKey

    const publicKey = await jose.importJWK(jwk, alg)

    const result = await jose.jwtVerify(jwt, publicKey)

    return result
}







