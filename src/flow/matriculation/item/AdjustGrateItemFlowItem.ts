class AdjustGrateItemFlowItem {
  adjust(classSkuItem: any) {
    let arrayOfGrateItems = []
    classSkuItem?.product?.grates.forEach(grate => {
      let grateLocal = {
        grate: {
          _id: grate._id,
          description: grate.description
        }
      }
      let grateItemsLocal = grate.items.map(grateItemLocal => {
        return {
          ...grateLocal,
          ...grateItemLocal._doc
        }
      })
      arrayOfGrateItems.push(...grateItemsLocal)
    })

    let newArrayOfGrateItems = []
    
    classSkuItem.gratesItems?.forEach(grateItem => {
      
      newArrayOfGrateItems.push(arrayOfGrateItems.find(grateItemTarget => {
        return grateItem.equals(grateItemTarget._id)
      }))
    });

    return newArrayOfGrateItems
  }
}

export default new AdjustGrateItemFlowItem
