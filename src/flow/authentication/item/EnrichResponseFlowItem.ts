class EnrichResponseFlowItem {
  async enrich(response: { access_token: string; employee: any }) {
    response.employee.salt = undefined
    response.employee.password = undefined
    response.employee.salaryValue = undefined
    response.employee.typeOfSalary = undefined
    return response
  }
}

export default new EnrichResponseFlowItem