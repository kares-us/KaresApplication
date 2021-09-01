import { dbURI } from '../../../../util/globals'

export default async function (req, res) {
  let { id } = req.query
  let sessionToken = req.cookies['next-auth.session-token']

  let url = `${dbURI}/visitor/county/${id}`
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