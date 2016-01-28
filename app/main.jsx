var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var GameBoard = require('./components/game-board-component.jsx');


var Main = React.createClass( {


  render: function () {

    return (
      <div>
        <h2>Welcome to the Game of Life!</h2>
        <GameBoard gameRows={15} gameColumns={15} />
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('content'));
