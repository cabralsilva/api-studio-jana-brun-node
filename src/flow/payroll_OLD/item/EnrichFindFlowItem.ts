class EnrichFindFlowItem {
  async enrich(payload: any) {
    var response = {
      total: payload.total,
      items: []
    } as any
    for (var item of payload.items) {
      response.items.push({
        ...item._doc,
      })
    }
    return response
  }
}

export default new EnrichFindFlowItem
