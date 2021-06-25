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

export function createCSV(visitors) {
    let visitorsToCSV = []

    visitors.forEach(vis => {
        visitorsToCSV.push({
            'Request Fulfilled': vis.requestFulfilled ? 'Yes' : 'No',
            'Archived': vis.archived ? 'Yes' : 'No',
            'Name': vis.name,
            'Email': vis.email,
            'Phone': vis.phone,
            'County': vis.countyName,
            'Address': vis.additionalInfo ? vis.additionalInfo.address : '',
            'Social': vis.additionalInfo ? vis.additionalInfo.social : '',
            'State': vis.additionalInfo ? vis.additionalInfo.state : '',
            'City': vis.additionalInfo ? vis.additionalInfo.city : '',
            'Zip Code': vis.additionalInfo ? vis.additionalInfo.zipCode : '',
            'Transportation': vis.additionalInfo ? vis.additionalInfo.transportation : '',
            'Employed': vis.additionalInfo ? vis.additionalInfo.employed : '',
            'Highest Grade': vis.additionalInfo ? vis.additionalInfo.highestGrade : '',
            'Credentials': vis.additionalInfo ? vis.additionalInfo.credentials : '',
            'Student': vis.additionalInfo ? vis.additionalInfo.student : '',
            'Veteran': vis.additionalInfo ? vis.additionalInfo.veteran : '',
            'Spouse of Veteran': vis.additionalInfo ? vis.additionalInfo.spouseOfVeteran : '',
            'Require Care': vis.additionalInfo ? vis.additionalInfo.reqChildCare : '',
            'Housing Needs': vis.additionalInfo ? vis.additionalInfo.housingNeeds : '',
            'English Primary Language': vis.additionalInfo ? vis.additionalInfo.englishPrimLang : '',
            'Criminal History': vis.additionalInfo ? vis.additionalInfo.criminalHis : '',
            'Disability to Disclose': vis.additionalInfo ? vis.additionalInfo.disabilityToDisclose : '',
            'Clothing Needs': vis.additionalInfo ? vis.additionalInfo.clothingNeeds : '',
            'Internet': vis.additionalInfo ? vis.additionalInfo.internet : '',
            'Authorized to work in US': vis.additionalInfo ? vis.additionalInfo.authToWorkInUS : '',
            'TANF or KTAP': vis.additionalInfo ? vis.additionalInfo.tanfOrKtap : '',
        })
    })

    return visitorsToCSV
}