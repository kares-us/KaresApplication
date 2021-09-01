import { siteURL } from "./globals"

export default async function fetchHelper(url, method, data) {
  let getOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  }
  let deleteOptions = {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }
  }
  let patchOptions = {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    },
    body: JSON.stringify(data)
  }

  let postOptions = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
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