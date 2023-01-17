"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdjustGrateItemFlowItem {
    adjust(classSkuItem) {
        var _a;
        let arrayOfGrateItems = [];
        (_a = classSkuItem === null || classSkuItem === void 0 ? void 0 : classSkuItem.product) === null || _a === void 0 ? void 0 : _a.grates.forEach(grate => {
            let grateLocal = {
                grate: {
                    _id: grate._id,
                    description: grate.description
                }
            };
            let grateItemsLocal = grate.items.map(grateItemLocal => {
                return Object.assign(Object.assign({}, grateLocal), grateItemLocal._doc);
            });
            arrayOfGrateItems.push(...grateItemsLocal);
        });
        let newArrayOfGrateItems = [];
        classSkuItem.grateItemList.forEach(grateItem => {
            newArrayOfGrateItems.push(arrayOfGrateItems.find(grateItemTarget => {
                return grateItem.equals(grateItemTarget._id);
            }));
        });
        return newArrayOfGrateItems;
    }
}
exports.default = new AdjustGrateItemFlowItem;
