import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class Planner extends Component {
  constructor (props) {
    super (props)

    this.state = {
      plantsToChoose: this.props.plants,
      plantsInPlan: this.props.cells,
      table: ''
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

  tableGenerate = () => {
    let rows = []
    let cellNumbers = Object.keys(this.props.cells)
    try {
      let cells = cellNumbers.map(num => {
        let plant = this.state.plantsInPlan[num]
        if(Array.isArray(plant)){
          return <div key={num} className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, num)}>
              </div>
        }
        else {
          return <div key={num} className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, num)}><div
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
    } catch {
      alert('Error in loading page, please go back to make a plan.')
      this.props.history.push('/make-garden')
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
    let plantedPlants = Object.values(this.state.plantsInPlan)
    let displayPlants = []
    plantedPlants.forEach((plant,index) => {
      if(Array.isArray(plant)){
        console.log('nothing planted')
      } else {
        let display = (<li>{index + 1} - {plant.name}</li>)
        displayPlants.push(display)
      }
    })
    console.log(this.state.plantsInPlan)
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
          <div>
            <ul>{displayPlants}</ul>
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
