
var GameLogic = function() {
  function getNeighbourCellCoordinates(cellId, maxRows, maxCols) {
    let cellCoords =_.map(_.split(cellId, '-'), _.parseInt);
    let rowNum = cellCoords[0], colNum = cellCoords[1];
    let rows = [];
    let cols = [];
    let tempRow = rowNum - 1;

    if(tempRow === 0) tempRow = maxRows;
    rows.push(tempRow);

    rows.push(rowNum);

    tempRow = rowNum + 1;
    if(tempRow > maxRows) tempRow = 1;

    rows.push(tempRow);


    let tempCol = colNum - 1;

    if(tempCol === 0) tempCol = maxCols;
    cols.push(tempCol);

    cols.push(colNum);

    tempCol = colNum + 1;
    if(tempCol > maxCols) tempCol = 1;

    cols.push(tempCol);

    return {rows: rows, cols: cols};
  }

  function getNeighbourCellKeys(cellId, maxRows, maxCols) {
    let cellCoords = getNeighbourCellCoordinates(cellId, maxRows, maxCols);
    let cellKeys = [];

    for(let x=0; x < 3; x++){
      for(let y=0; y < 3; y++){
        let cellKey = cellCoords.rows[x] + '-' + cellCoords.cols[y];
        if(cellKey !== cellId) {
          cellKeys.push(cellKey);
        }
      }
    }
    return cellKeys;
  }

  function getNewCellCondition(cellMap, cellId, maxRows, maxCols, currentCondition) {
    let cellKeys = getNeighbourCellKeys(cellId, maxRows, maxCols);
    let aliveCellCount = 0;
    let newCondition = currentCondition;
    _.forEach(cellKeys, function(key){
      if(cellMap[key] === 1) {
        aliveCellCount++;
      }
    });

    if(currentCondition === 1) { //currently alive
      if(aliveCellCount < 2 || aliveCellCount > 3) {
        newCondition = 0;
      }
    } else {
      if(aliveCellCount === 3) {
        newCondition = 1;
      }
    }

    return newCondition;
  }


  return {
    getNewCellCondition: getNewCellCondition
  };
}();

module.exports = GameLogic;
