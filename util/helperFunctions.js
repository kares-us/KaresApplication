export function checkAuth(session) {
    if (session) {
        const isAdmin = session.user.roles.includes('Admin')
        const isCountyManager = session.user.roles.includes('County Manager')
        if (isAdmin || isCountyManager) return true
        else return false
    } else return false
}

export function checkAdmin(session) {
    if (session) {
        const isAdmin = session.user.roles.includes('Admin')
        if (isAdmin) return true
        else return false
    } else return false
}