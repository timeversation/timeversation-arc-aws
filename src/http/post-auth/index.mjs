import arc from '@architect/functions'
import * as Auth from '@architect/shared/authentication.mjs'

// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  let base64 = req.body
  let buff = Buffer.from(base64, 'base64')
  let payload = JSON.parse(`${buff.toString('utf8')}`)

  if (payload.action === 'checkUsernameFreeToUse') {
    let username = payload.username

    let myTables = await arc.tables()

    let hasUserInDB = await myTables.user.get({
      userId: username,
    })
      .then(r => {
        return !!r
      })
      .catch((e) => {
        return false
      })

    let freeToUse = !hasUserInDB

    return {
      cors: true,
      statusCode: 200,
      headers: {
        cors: true,
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'application/json; charset=utf8'
      },
      body: JSON.stringify(freeToUse)
    }
  }

  if (payload.action === 'registerUser') {
    let username = payload.username
    let password = payload.password

    let myTables = await arc.tables()

    let hasUserInDB = await myTables.user.get({
      userId: username,
    })
      .then(r => {
        return !!r
      })
      .catch(e => {
        console.log(e)
        return false
      })

    let freeToUse = !hasUserInDB

    if (!freeToUse) {
      return {
        cors: true,
        statusCode: 406,
        headers: {
          cors: true,
          'access-control-allow-origin': '*',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify({ error: 'username-taken' })
      }
    }

    let hash = await Auth.getHashFromPassword({ password })

    await myTables.user.put({
      userId: username,
      passwordHash: hash
    })

    return {
      cors: true,
      statusCode: 200,
      headers: {
        cors: true,
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'application/json; charset=utf8'
      },
      body: JSON.stringify({
        success: true
      })
    }
  }

  if (payload.action === 'loginUserPassword') {
    let username = payload.username
    let password = payload.password

    let myTables = await arc.tables()

    let { usernameExist, user } = await myTables.user.get({
      userId: username,
    }).then(r => {
      return { usernameExist: !!r, user: r }
    }).catch(e => {
      console.log(e)
      return { usernameExist: false, user: false }
    })

    if (!usernameExist) {
      return {
        cors: true,
        statusCode: 401,
        headers: {
          cors: true,
          'access-control-allow-origin': '*',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify({
          error: 'bad-credentials'
        })
      }
    }

    let result = await Auth.verifyHashFromPassword({ hash: user.passwordHash, password })

    if (!result) {
      return {
        cors: true,
        statusCode: 406,
        headers: {
          cors: true,
          'access-control-allow-origin': '*',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json; charset=utf8'
        },
        body: JSON.stringify({
          error: 'bad-credentials'
        })
      }
    }

    let jwt = await Auth.issueJWT({ userID: user.userId });

    return {
      cors: true,
      statusCode: 200,
      headers: {
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'application/json; charset=utf8'
      },
      body: JSON.stringify({
        success: true,
        jwt
      })
    }
  }

  if (payload.action === 'verifyJWT') {
    try {
      let jwt = payload.jwt
      let verify = await Auth.verifyJWT({ jwt: jwt })

      return {
        cors: true,
        statusCode: 200,
        headers: {
          'access-control-allow-origin': '*',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json charset=utf8'
        },
        body: JSON.stringify({
          data: verify,
        })
      }
    } catch (e) {
      let error = 'jwt-error'

      if (e.message.includes('"exp" claim timestamp')) {
        error = 'jwt-expired'
      }

      return {
        cors: true,
        statusCode: 406,
        headers: {
          'access-control-allow-origin': '*',
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'application/json charset=utf8'
        },
        body: JSON.stringify({
          //
          error: error,
          //
        })
      }
    }
  }

  return {
    cors: true,
    statusCode: 500,
    headers: {
      cors: true,
      'access-control-allow-origin': '*',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify({
      error: 'unknown-action'
    })
  }
}