export async function fetchCountyVisitors(countyId) {
    let url = `http://localhost:3001/county/get_visitors/${countyId}`
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
    let url = `http://localhost:3001/county/get_resources/${countyId}`
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
    const url = `http://localhost:3001/county/get_admin_county/${session.user.email}`
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
    const url = `http://localhost:3001/county/get_all`
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
    const url = `http://localhost:3001/visitor/mark_fulfilled/${id}`
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
    const url = `http://localhost:3001/visitor/archive_visitor/${id}`
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
    const url = `http://localhost:3001/resource/update/${id}`
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
    const url = `http://localhost:3001/resource/create`
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
    const url = `http://localhost:3001/resource/delete/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }

    const res = await fetch(url, options)
    const json = res.json()

    return json
}

export async function createCounty(data) {
    const url = `http://localhost:3001/county/create`
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
    const url = `http://localhost:3001/county/update/${data.id}`
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
    const url = `http://localhost:3001/admin/get_all`
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
    const url = `http://localhost:3001/admin/update/${data.email}`
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
    const url = `http://localhost:3001/visitor/submit_simple_form`
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
    const url = `http://localhost:3001/visitor/submit_advanced_form`
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
    const url = `http://localhost:3001/resource/get_county_resources/${id}`
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
