import GetSequenceFlowItem from "./GetSequenceFlowItem";

class PrepareMatricularionFlowItem {
  async prepare(matriculationBase: any): Promise<any[]> {
    return {
      ...matriculationBase,
      sequence: await GetSequenceFlowItem.get()
    }
  }
}

export default new PrepareMatricularionFlowItem
