const moment = require('moment')
const generalHelpers = require('../../common/utils/generalHelpers')

const getBudgetsOverviewModel = (budgets, transactions) => {
    return {
        tabs: getTabsConfig(),
        budgetTypes: [getRunningBudgetsModel(budgets, transactions), getFinishedBudgetsModel(budgets, transactions)]
    }
}

const getTabsConfig = () => {
    return [
        { value: 0, label: 'Running' },
        { value: 1, label: 'Finished' }
    ]
}

const getFinishedBudgetsModel = (budgets, transactions) => {
    return {
        tabValue: 1,
        budgets: getBudgetModels(getFinishedBudgets(budgets), transactions)
    }
}

const getRunningBudgetsModel = (budgets, transactions) => {
    return {
        tabValue: 0,
        budgets: getBudgetModels(getRunningBudgets(budgets), transactions)
    }
}

const getFinishedBudgets = (budgets) => {
    return budgets.filter((budget) => {
        return new moment(budget.endDate).isBefore(new moment(), 'day')
    })
}

const getRunningBudgets = (budgets) => {
    return budgets.filter((budget) => {
        return new moment(budget.endDate).isSameOrAfter(new moment(), 'day')
    })
}

const getBudgetDaysLeft = (currentDate, endDate) => {
    let daysLeft = endDate.diff(currentDate, 'days')
    return daysLeft > 0 ? daysLeft : 0
}

const getBudgetAmountSpent = (budget, transactions) => {
    return transactions.reduce((totalAmount, tx) => {
        if (tx.wallet.equals(budget.wallet)) {
            return totalAmount += tx.amount
        } else {
            return totalAmount
        }
    }, 0)
}

const getBudgetModels = (budgets, transactions) => {
    const currentDate = new moment()
    return budgets.map((budget) => {
        let budgetAmountSpent = getBudgetAmountSpent(budget, transactions)
        let budgetModel = {
            ...budget,
            category: budget.category.name,
            amountLeft: budget.amount - budgetAmountSpent,
            amountPercentageSpent: (budgetAmountSpent / budget.amount) * 100 ,
            daysLeft: getBudgetDaysLeft(currentDate, new moment(budget.endDate))
        }
        return generalHelpers.deleteSystemFields(budgetModel)
    })
}

module.exports = {
    getBudgetsOverviewModel
}