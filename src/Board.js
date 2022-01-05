import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


// Restart button
// set board size (look at versions of the game for how to change)
// create a count down?
// style changes
// set up without CRA?


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.3
	};
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard()
		};
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */

	createBoard() {
		let board = [];
		// TODO: create array-of-arrays of true/false values
		for (let x = 0; x < this.props.nrows; x++) {

			let row = [];

			for (let y = 0; y < this.props.ncols; y++) {
				row.push(Math.random() <= this.props.chanceLightStartsOn);
			}
			board.push(row);
		}
		return board
	}

	/** handle changing a cell: update board & determine if winner */

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		// mapping the split array- into 2 numbers
		let [x, y] = coord.split("-").map(Number);

		function flipCell(x, y) {
			// if this coord is actually on board, flip it
			if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
				// changing the true or false value of the array
				// which corresponds with the lights
				board[x][y] = !board[x][y];
			}
		}
		// flip cell and surrounding cells
		flipCell(x, y);
		flipCell(x + 1, y);
		flipCell(x - 1, y);
		flipCell(x, y + 1);
		flipCell(x, y - 1);

		// win when every cell is turned off
		// Cleaner solution
		let hasWon = board.every(row => row.every(cell => !cell));

		// My solution to win, using for loops
		// let hasWon = this.winGame(board);

		// below same as board:board hasWon:hasWon
		this.setState({ board, hasWon });
	}

	// winGame(board){
	// 	let hasWon;

	// 	for(let x = 0; x < this.props.nrows; x++){
	// 		for(let y = 0; y< this.props.ncols; y++){
	// 			// console.log(this.state.board[x][y]);
	// 			if(board[x][y]){
	// 				 return hasWon = false;

	// 			}
	// 		}
	// 		 return hasWon = true;
	// 	}

	// }

	makeBoard() {
		let tableBoard = [];
		for (let x = 0; x < this.props.nrows; x++) {
			let row = [];
			for (let y = 0; y < this.props.ncols; y++) {
				let coord = x + '-' + y;
				row.push(<Cell key={coord}
					coord={coord}
					isLit={this.state.board[x][y]}

					//  note the inline binding, in order to pass along the param
					//  flipCellsAroundMe = {() => this.flipCellsAround(coord)} />)

					// alt inline bining and passing syntax
					//  flipCellsAroundMe = {this.flipCellsAround.bind(this, coord)} />)

					// Not inline passing/ binding- see notes
					flipCellsAroundMe={this.flipCellsAround} />)
			}
			tableBoard.push(<tr key={x}>{row}</tr>);
		}
		return tableBoard;
	}

	/** Render game board or winning message. */

	render() {
		return (
			<div>
				{this.state.hasWon ? (
					<div>
						<h1 className="winner"><span className="neon-orange">You</span> <span className="neon-blue">Win!</span></h1>
					</div>
				) : (

					<div>
						<div className="Board-title">
							<div className="neon-orange">Lights</div>
							<div className="neon-blue">Out</div>
						</div>
						<table className="Board">
							<tbody>
								{this.makeBoard()}
							</tbody>
						</table>
					</div>
				)}
			</div>
		)

		// if the game is won, just show a winning msg & render nothing else

		// TODO

		// make table board

		// TODO
	}
}


export default Board;
