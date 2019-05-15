import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class Planner extends Component {
  constructor (props) {
    super (props)

    this.state = {
      plantsToChoose: this.props.plants,
      plantsInPlan: this.props.cells,
      table: '',
      plants: {
        inPlan: {}
      }
    }
  }

  onDragStart = (e, id) => {
    //id is key given from plant.name in li
    e.dataTransfer.setData("id", id)
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e, category) => {
    if(category === null){
      console.log('eventually remove drop')
    } else {
      let id = e.dataTransfer.getData("id")
      let plants = this.state.plantsToChoose.filter((plant) => {
        return plant.name === id
      })
      let newPlant = plants[0]
      this.setState({
        plantsInPlan: {
          ...this.state.plantsInPlan,
          [category]: newPlant
        }
      }, () => {
        this.tableGenerate()
      })
    }
  }

  categoryAndTable = () => {

  }


  tableGenerate = () => {
    let rows = []
    let cellNames = Object.keys(this.props.cells)
    let cells = cellNames.map(name => {

      let plant = this.state.plantsInPlan[name]
      if(plant.length === 0){
        return <div key={name} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, name)}>
            </div>
      }
      else{
        return <div key={name} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, name)}><div
                onDragStart = {(e) => this.onDragStart(e, plant.name)}
                draggable
                className="draggable"
                style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '100px 100px'}}
            >
            </div></div>
      }
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
        <div className="customRow"key={index}>
        {row}
        </div>
      )
    })
    this.setState({
      table: table
    })
  }

  componentDidMount(){
    this.props.onPlantsFetched()
    this.tableGenerate()
  }


  render() {
    if (this.props.height === 0 || this.props.width === 0) {
      this.props.history.push('/plan-size')
    }

    let plants = {
      toChoose: []
    }


    this.props.plants.forEach ((plant) => {
      plants.toChoose.push(
        <tr key={plant.name}><td>{plant.name}</td><td key={plant.name}
            onDragStart = {(e) => this.onDragStart(e, plant.name)}
            draggable
            className="draggable"
            style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '100px 100px', backgroundRepeat: 'no-repeat'}}
        >
        </td></tr>
      )
    })

    return(
      <div className="container-drag">
        <h3 className="header-plant">Choose a plant:</h3>
        <div className="drag-body">
          <div className="tbp"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e)=> this.onDrop(e,null)}
              >
              <table><tbody><tr><td className="section-header">Plants</td></tr>{plants.toChoose}</tbody></table>
          </div>
          <div>
            {this.state.table}
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    width: state.width,
    height: state.height,
    cells: state.cells,
    plants: state.plants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlantsFetched: () => dispatch(actionCreators.plantsFetched())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
