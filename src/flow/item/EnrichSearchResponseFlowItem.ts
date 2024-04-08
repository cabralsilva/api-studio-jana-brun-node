class EnrichSearchResponseFlowItem {
  async enrich(payload: any) {
    var response = {
      total: payload.paging.total,
      items: []
    } as any
    for (var item of payload.items) {
      response.items.push({
        ...item._doc,
      })
    }
    return response
  }

  async enrich2(payload: any) {
    var response = {
      total: payload.paging.total,
      items: payload.items
    }
    return response
  }
}

export default new EnrichSearchResponseFlowItem
