var React = require('react');
var _ = require('lodash');

var Cell = React.createClass( {

  render: function () {
    var content = this.props.cellMap[this.props.cellId];

    return (
      <td className={content === 1 ? 'success' : 'danger'}>{content}</td>
    );
  }
});

module.exports = Cell;
