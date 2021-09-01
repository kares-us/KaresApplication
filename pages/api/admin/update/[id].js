import { dbURI } from '../../../../util/globals'

export default async function (req, res) {
  let { id } = req.query
  let sessionToken = req.cookies['next-auth.session-token']


  let url = `${dbURI}/admin/update/${id}`
  let options = {
    method: "PATCH",
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