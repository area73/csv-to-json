
const combineWithHeader = head => data => data.reduce((acc,cur,idx) => ({ ...acc, [head[idx]] : cur  }),{});

const array2Json = head => dataArray => dataArray.map(combineWithHeader(head))

module.exports = {array2Json}
