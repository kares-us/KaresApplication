import { dbURI } from '../../../../util/globals'

export default async function (req, res) {
  const { id } = req.query

  let url = `${dbURI}/resource/county/${id}`

  let response = await fetch(url)
  let json = await response.json()

  return res.status(json.code).json(json)
}