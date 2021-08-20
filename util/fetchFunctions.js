let prodURL = 'https://kares-api.herokuapp.com'
let localURL = 'http://localhost:3001'
let apiURL = localURL

export async function fetchCountyVisitors(countyId, session) {
    let url = `${apiURL}/county/get_visitors/${countyId}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function fetchCountyResources(countyId, session) {
    let url = `${apiURL}/county/get_resources/${countyId}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function fetchAdminCounty(session) {
    const url = `${apiURL}/county/get_admin_county/${session.user.email}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function fetchAllCounties() {
    const url = `${apiURL}/county/get_all`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function markVisitorFulfilled(id, session) {
    const url = `${apiURL}/visitor/mark_fulfilled/${id}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function markVisitorArchived(id, session) {
    const url = `${apiURL}/visitor/archive_visitor/${id}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function updateResourceInformation(id, newData, session) {
    const url = `${apiURL}/resource/update/${id}`
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': ['PATCH'],
            'session': session.user.email
        },
        body: JSON.stringify(newData)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function createResource(data, session) {
    console.log(data)

    const url = `${apiURL}/resource/create`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function deleteResource(id, session) {
    const url = `${apiURL}/resource/delete/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function createCounty(data, session) {
    const url = `${apiURL}/county/create`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function editCounty(data) {
    const url = `${apiURL}/county/update/${data.id}`
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function fetchAllAdmins(session) {
    const url = `${apiURL}/admin/get_all`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function updateAdmin(data, session) {
    const url = `${apiURL}/admin/update/${data.email}`
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function submitSimpleForm(data) {
    const url = `${apiURL}/visitor/submit_simple_form`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function submitAdvancedForm(data) {
    const url = `${apiURL}/visitor/submit_advanced_form`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function fetchAllResources(id) {
    const url = `${apiURL}/resource/get_county_resources/${id}`
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}


export async function deleteAdmin(email, session) {
    const url = `${apiURL}/admin/delete/${email}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}


export async function deleteVisitor(id, session) {
    const url = `${apiURL}/visitor/delete/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'session': session.user.email
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}