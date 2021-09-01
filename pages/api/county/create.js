import { dbURI } from '../../../util/globals'

export default async function (req, res) {
  let sessionToken = req.cookies['next-auth.session-token']

  let url = `${dbURI}/county/create`
  let options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "session": sessionToken
    },
    body: JSON.stringify(req.body)
  }

  let response = await fetch(url, options)
  let json = await response.json()

  return res.status(json.code).json(json)
}