import { dbURI } from '../../../util/globals'

export default async function (req, res) {
  let url = `${dbURI}/visitor/submit_advanced`
  let options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body)
  }

  let response = await fetch(url, options)
  let json = await response.json()

  return res.status(json.code).json(json)
}