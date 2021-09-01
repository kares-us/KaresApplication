import { dbURI } from '../../../util/globals'

export default async function (req, res) {
  let sessionToken = req.cookies['next-auth.session-token']

  let url = `${dbURI}/admin`
  let options = {
    method: "GET",
    headers: {
      "session": sessionToken
    }
  }

  let response = await fetch(url, options)
  let json = await response.json()

  return res.status(json.code).json(json)
}