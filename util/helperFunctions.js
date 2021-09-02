export function formatMonth(index) {
  switch (index) {
    case 0: return 'January'
    case 1: return 'February'
    case 2: return 'March'
    case 3: return 'April'
    case 4: return 'May'
    case 5: return 'June'
    case 6: return 'July'
    case 7: return 'August'
    case 8: return 'September'
    case 9: return 'October'
    case 10: return 'November'
    case 11: return 'December'
  }
}

export function createCSV(visitors, filterMonth) {
  let visitorsToCSV = []

  visitors.forEach(vis => {
    const visDate = new Date(vis.createdAt)
    if (visDate.getMonth() === filterMonth) visitorsToCSV.push({
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