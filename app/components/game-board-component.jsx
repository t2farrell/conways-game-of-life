var React = require('react');
var Table = require('react-bootstrap/lib/Table');
var GameRow = require('./game-row-component.jsx');
var GameLogic = require('../../lib/game-logic.js');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var timer;

var GameBoard = React.createClass( {

  getInitialState: function() {
    let value = this.initCellMap();
    return value;
  },

  initCellMap() {
    let value = {};
    let userSeeds;
    let returnState;
    if(this.refs.input) {
      userSeeds = _.split(this.refs.input.getValue(), ',');
    }

    let seedCells =  userSeeds ? userSeeds : _.split('1-2,1-3,1-4,2-2,2-3,4-4,4-5,4-6,7-8,7-9,8-1,10-1,10-2,15-15,15-14,14-15,13-12', ',');

    for(let row=1; row <= this.props.gameRows; row++){
      for(let col=1; col <= this.props.gameColumns; col++){
        let key = row + '-' + col;
        let isSeedCell = _.includes(seedCells, key);
        value[key] = isSeedCell ? 1 : 0;
      }
    }

    returnState = {
      cellMap: value,
      seedCells: seedCells
    };

    if(this.state) {
      this.setState(returnState);
    }

    return returnState;
  },

  toggleRun: function() {
    if(!this.state.running) {
      this.initCellMap();
      timer = setInterval(this.updateCellMap, 500);
    } else {
      clearInterval(timer);
      this.setState({running: false});
    }
  },

  handleChange() {
      this.setState({
        userSeeds: this.refs.input.getValue()
      });
    },

  updateCellMap: function() {
    let self = this;
    let newMap = {};
    _.forIn(this.state.cellMap, function(value, key, obj){
      let test = GameLogic.getNewCellCondition(self.state.cellMap, key, self.props.gameRows, self.props.gameColumns, value);
      newMap[key] = test;
    });

    this.setState({cellMap: newMap, running: true});
  },


  render: function () {
    var rows = [];
    var props = this.props;

    for(let x=1;x <= this.props.gameRows; x++)  {
      let rowKey = x;
      rows.push(
        <GameRow {...props} key={rowKey} rowNum={x} updateCellMap={this.updateCellMap} cellMap={this.state.cellMap}/>
      );
    }

    return (
      <div>
        <form>
          <Button bsStyle='default' onClick={this.toggleRun} >{this.state.running ? 'Stop' : 'Start'}</Button>
          <Input
            type="text"
            value={this.state.userSeeds || '1-2,1-3,1-4,2-2,2-3,4-4,4-5,4-6,7-8,7-9,8-1,10-1,10-2,15-15,15-14,14-15,13-12'}
            onChange={this.handleChange}
            label="Enter Seeds"
            ref="input"/>
        </form>
        <div>
          <Table bordered>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </div>
      </div>

    );
  }
});

module.exports = GameBoard;
