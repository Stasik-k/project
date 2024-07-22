export class Calculator {
    incomes(records) {
        return records.filter((record) => {
            return records.type === 'income'
        }).reduce((acc, record) => acc + record.sum, 0)

    }

    expenses(records) {
        return records.filter((record) => {
            return records.type === 'income'
        }).reduce((acc, record) => acc - record.sum, 0)

    }

    balance() {
        return Calculator.incomes(records) - Calculator

    }
}