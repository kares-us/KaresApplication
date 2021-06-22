export function formatVisitorGraphData(dataset) {
    let lastFiveDays = []

    for (let i = 4; i >= 0; i -= 1) {
        let date = new Date()
        date.setDate(date.getDate() - i)
        let formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
        lastFiveDays.push({ formattedDate, counter: 0 })
    }

    for (let visitor in dataset) {
        let visitorDate = new Date(dataset[visitor].createdAt)
        let formattedVisitorDate = `${visitorDate.getMonth() + 1}/${visitorDate.getDate()}`
        for (let date in lastFiveDays) {
            let formattedDate = lastFiveDays[date].formattedDate
            let dateMatch = formattedVisitorDate === formattedDate
            if (dateMatch) lastFiveDays[date].counter = lastFiveDays[date].counter + 1
        }
    }

    let labels = []
    let data = []

    for (let info in lastFiveDays) {
        labels.push(lastFiveDays[info].formattedDate)
        data.push(lastFiveDays[info].counter)
    }

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

}