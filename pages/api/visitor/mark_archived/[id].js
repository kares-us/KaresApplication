import { dbURI } from '../../../../util/globals'

export default async function (req, res) {
  let { id } = req.query
  let sessionToken = req.cookies['next-auth.session-token']

  let url = `${dbURI}/visitor/archive_visitor/${id}`
  let options = {
    method: "POST",
    headers: {
      "session": sessionToken
    }
  }

  let response = await fetch(url, options)
  let json = await response.json()

  return res.status(json.code).json(json)
}