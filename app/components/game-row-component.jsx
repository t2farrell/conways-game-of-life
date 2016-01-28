var React = require('react');
var Cell = require('./cell-component.jsx');

var GameRow = React.createClass( {

  render: function () {
    var cells = [];
    var props = this.props;

    for(let x=1;x <= this.props.gameColumns; x++)  {
      let cellId = this.props.rowNum + '-' + x;
      cells.push(
        <Cell {...props} key={cellId} cellId={cellId}/>
      );
    }

    return (
      <tr>
        {cells}
      </tr>
    );
  }
});

module.exports = GameRow;
