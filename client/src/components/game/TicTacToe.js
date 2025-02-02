import React from 'react';
import ReactDOM from 'react-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink
} from 'reactstrap';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={() => {this.props.onClick(i)}} />
    }

    render() {
        const boardsize = 3;
        const squares = [];

        for(let i=0; i<boardsize; i++) {
            const row = [];
            for(let j=0; j<boardsize; j++) {
                row.push(this.renderSquare(i * boardsize + j));
            }
            squares.push(<div className="board-row">{row}</div>);
        }
        return (
            <div>
                {squares}
            </div>
        )
    }
  }

  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext});
    }

    jumpTo(step) {
          this.setState({
              stepNumber: step,
              xIsNext: (step % 2) === 0,
          });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button className={move === this.state.stepNumber ? "selected-item" : ""} onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      let ind = 0;

      current.squares.forEach((square) => {
        if(square !== null) {
            ind++;
        }
      });

      if(ind === 9 && !winner) {
        status = 'No winner. Draw';
      } else if(winner) {
        status = 'Winner is: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares = {current.squares}
                onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  class GameModal extends React.Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Play TicTacToe</NavLink>

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                 <ModalHeader toggle={this.toggle}><h4>TicTacToe Game</h4></ModalHeader>
                 <ModalBody>
                     <Game />
                 </ModalBody>
                 </Modal>
            </div>
        );
    }

}

  export default GameModal;