let apiURL = 'https://kares-api.herokuapp.com'

export async function fetchCountyVisitors(countyId) {
    let url = `${apiURL}/county/get_visitors/${countyId}`
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

export async function fetchCountyResources(countyId) {
    let url = `${apiURL}/county/get_resources/${countyId}`
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

export async function fetchAdminCounty(session) {
    const url = `${apiURL}/county/get_admin_county/${session.user.email}`
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

export async function markVisitorFulfilled(id) {
    const url = `${apiURL}/visitor/mark_fulfilled/${id}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function markVisitorArchived(id) {
    const url = `${apiURL}/visitor/archive_visitor/${id}`
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function updateResourceInformation(id, newData) {
    const url = `${apiURL}/resource/update/${id}`
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function createResource(data) {
    const url = `${apiURL}/resource/create`
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

export async function deleteResource(id) {
    const url = `${apiURL}/resource/delete/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function createCounty(data) {
    const url = `${apiURL}/county/create`
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

export async function editCounty(data) {
    const url = `${apiURL}/county/update/${data.id}`
    const options = {
        method: 'PATCH',
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

export async function fetchAllAdmins() {
    const url = `${apiURL}/admin/get_all`
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

export async function updateAdmin(data) {
    const url = `${apiURL}/admin/update/${data.email}`
    const options = {
        method: 'PATCH',
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
