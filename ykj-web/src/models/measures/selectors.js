
export default state => {
  return {
    orderService : state.orderService,
    measures: state.measures,
    codewordTypes: state.codewords.codewordTypes,
    componentDataSource: state.componentDataSource,
    orderServiceAttachment : state.orderServiceAttachment
  }
}
