
class GetValueTotalPaidFlowItem {
  get(financial, _payment) {
    var _totalPaid = financial.payments.reduce((acc, payment) => { return acc + payment.valuePaid }, 0)
    return _totalPaid + _payment?.valuePaid
  }
}

export default new GetValueTotalPaidFlowItem