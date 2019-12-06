import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <div
            className="col-4 square"
            onClick={props.onClick}
        >
            {props.value}
        </div>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        return (
            <div>
                <div className="row">
                    {
                        this.renderSquare(0)
                    }
                    {
                        this.renderSquare(1)
                    }
                    {
                        this.renderSquare(2)
                    }
                </div>
                <div className="row">
                    {
                        this.renderSquare(3)
                    }
                    {
                        this.renderSquare(4)
                    }
                    {
                        this.renderSquare(5)
                    }
                </div>
                <div className="row">
                    {
                        this.renderSquare(6)
                    }
                    {
                        this.renderSquare(7)
                    }
                    {
                        this.renderSquare(8)
                    }
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1),
            current = history[history.length - 1],
            squares = current.squares.slice()

        if (calculateWinner(squares) || squares[i]) {
            return null
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    render() {
        const history = this.state.history,
            current = history[this.state.stepNumber],
            winner = calculateWinner(current.squares),
            moves = history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start'

                return (
                    <div className="form-group">
                        <button
                            className="btn btn-info btn-block"
                            onClick={() => this.jumpTo(move)}
                        >
                            {
                                desc
                            }
                        </button>
                    </div>
                )
            })

        let status = ''

        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className="row game">
                <div className="col-8 row mx-auto">
                    <div
                        className="col-md-6 game-board"
                    >
                        <Board
                            squares={current.squares}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                    <div className="col-md-6 game-info">
                        <h1 className="text-center">
                            {
                                status
                            }
                        </h1>
                        {
                            moves
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; ++i) {
        const [a, b, c] = lines[i]

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }

    return null
}