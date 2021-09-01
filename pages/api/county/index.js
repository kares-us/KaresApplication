import { dbURI } from '../../../util/globals'

export default async function (req, res) {
  let url = `${dbURI}/county`

  let response = await fetch(url)
  let json = await response.json()

  return res.status(json.code).json(json)
}