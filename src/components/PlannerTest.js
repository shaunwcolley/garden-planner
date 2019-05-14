import React, { Component } from 'react';
import { connect } from 'react-redux'

class Planner extends Component {

  constructor(props){
    super(props)

    let rows = []
    let cellNames = Object.keys(this.props.cells)
    let cells = cellNames.map(name => {
      return <td><div>{name}</div></td>
    })

    for (let i = 0; i < this.props.width; i++) {
      rows.push([])
    }
    let count = 0
    for(let i = 0; i < this.props.width; i++) {
      for(let j = 0; j < this.props.height; j++) {
        rows[i].push(cells[count])
        count++
      }
    }

    let table = rows.map((row,index) => {
      return (
        <tr>
        {row}
        </tr>
      )
    })

    this.state = {
      table: table
    }
  }

  render() {
    return (
      <div>
      Howdy
      <table><tbody>{this.state.table}</tbody></table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    width: state.width,
    height: state.height,
    cells: state.cells
  }
}

export default connect(mapStateToProps)(Planner)
