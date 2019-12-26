const moment = require('moment')

const getMonthTransactionsModel = (transactions, year, month) => {
    let transactionsModel = {
        summary: getTransactionsSummary(transactions, year, month),
        transactionGroups: getTransactionsGroups(transactions)
    }
    return transactionsModel
}

const getTransactionsSummary = (transactions, year, month) => {
    const [inflow, outflow, total] = getTransactionsTotals(transactions)
    const tabsConfig = getTabsConfig(year, month)
    return {tabsConfig, inflow, outflow, total}
}

const getTransactionsTotals = (transactions) => {
    let inflow = 0, outflow = 0, total = 0
    transactions.forEach((tx) => {
        tx.amount > 0 ? inflow += tx.amount : outflow += Math.abs(tx.amount)
    })
    total = inflow - outflow
    return [inflow, outflow, total];
}

const getTabsConfig = (year, month) => {
    let tabsConfig = { 
        tabs: [], 
        value: 0 
    }

    if (isCurrentMonth(year, month)) {
        tabsConfig.tabs = [ 
            { label:'LAST MONTH', value: -1 },
            { label:'CURRENT MONTH', value: 0 },
            { label:'FUTURE', value: 1 }
        ]
    } else if (isFutureMonth(year, month)) {
        tabsConfig.tabs = [ 
            { label: 'LAST MONTH', value: -1 },
            { label: 'CURRENT MONTH', value: 0 },
            { label: 'FUTURE', value: 1 }
        ]
        tabsConfig.value = 1
    } else if (isMonthsBeforeCurrent(year, month, 1)) {
        tabsConfig.tabs = [ 
            { label: getTabLabel(year, month, -1), value: -1 },
            { label: 'LAST MONTH', value: 0 },
            { label: 'CURRENT MONTH', value: 1 }
        ]
    } else if (isMonthsBeforeCurrent(year, month, 2)) {
        tabsConfig.tabs = [ 
            { label: getTabLabel(year, month, -1), value: -1 },
            { label: getTabLabel(year, month, 0), value: 0 },
            { label: 'LAST MONTH', value: 1 }
        ]
    } else {
        tabsConfig.tabs = [ 
            { label: getTabLabel(year, month, -1), value: -1 },
            { label: getTabLabel(year, month, 0), value: 0 },
            { label: getTabLabel(year, month, 1), value: 1 }
        ]
    }

    return tabsConfig;
}

const isCurrentMonth = (year, month) => {
    var requested = new moment({ years: year, months: month })
    var current = new moment()
    return current.year() === requested.year() && current.month() === requested.month()
}

const isMonthsBeforeCurrent = (year, month, months) => {
    var requestedWithOffset = new moment({ years: year, months: month }).add(months, 'M')
    var current = new moment()
    return current.year() === requestedWithOffset.year() && current.month() === requestedWithOffset.month()
}

const isFutureMonth = (year, month) => {
    var requested = new moment({ years: year, months: month })
    return requested.isAfter(new moment())
}

const getTabLabel = (year, month, monthsOffset) => {
    let requested = new moment({ years: year, months: month }).add(monthsOffset, 'M')
    return `${requested.month()+1}/${requested.year()}`
}

const getTransactionsGroups = (transactions) => {
    let groupsArray = []
    let groups = new Map()

    transactions.forEach((tx) => {
        let groupKey = moment(tx.date).format('YYYY-MM-DD')
        groups.has(groupKey) ? groups.set(groupKey, groups.get(groupKey).concat(tx)) : groups.set(groupKey, [tx])
    })

    groups.forEach((transactions, groupKey) => {
        let groupDate = moment(groupKey)
        groupsArray.push({
            dayName: groupDate.format('dddd'),
            day: groupDate.format('D'),
            monthName: groupDate.format('MMMM'),
            year: groupDate.format('YYYY'),
            transactions: transactions,
            total: getTransactionsTotals(transactions)[2]
        })
    })

    return groupsArray
}

module.exports = {
    getMonthTransactionsModel
}