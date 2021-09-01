import { siteURL } from "./globals"

export default async function fetchHelper(url, method, data) {
  let getOptions = {
    method: "GET"
  }
  let deleteOptions = {
    method: "DELETE"
  }
  let patchOptions = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  let postOptions = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  let fetchOptions

  if (method === 'GET') fetchOptions = getOptions
  if (method === 'POST') fetchOptions = postOptions
  if (method === 'PATCH') fetchOptions = patchOptions
  if (method === 'DELETE') fetchOptions = deleteOptions


  let res = await fetch(`${siteURL}${url}`, fetchOptions)

  return res
}