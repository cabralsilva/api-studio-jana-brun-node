class GetValueOfInstallmenFlowItem {
  get(installment: number, totalInstallment: number, totalValue: number) {
    var value = Number((totalValue / totalInstallment).toFixed(0))

    if (installment == totalInstallment) {
      let sumPrevious = value * (totalInstallment - 1)
      sumPrevious = Number(sumPrevious.toFixed(0))
      value = Number((totalValue - sumPrevious).toFixed(0))
    }
    return value
  }
}

export default new GetValueOfInstallmenFlowItem
