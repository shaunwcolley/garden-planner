import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'

class Planner extends Component {
  constructor (props) {
    super (props)

    this.state = {
      plantsInPlan: this.props.cells,
      cells: this.props.cells,
      table: '',
      oldPlan: this.props.plan
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
      let plants = this.props.plants.filter((plant) => {
        console.log(plant.name)
        return plant.name === id
      })
      let newPlant = plants[0]
      this.setState({
        plantsInPlan: {
          ...this.state.plantsInPlan,
          [category]: newPlant
        }
      }, () => {
        console.log(this.state.plantsInPlan)
        this.tableGenerate()
      })
    }
  }

  tableGenerate = () => {
    let rows = []
    let cellNumbers = Object.keys(this.props.cells)
    //console.log(cellNumbers)
    let plant = {}
    let cells = []

        cells = cellNumbers.map(num => {
          plant = this.state.plantsInPlan[num]
          try{
            // if(this.props.plan === null)
            return <div key={num} className="droppable"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, num)}><div
                    onDragStart = {(e) => this.onDragStart(e, plant.name)}
                    draggable
                    className="draggable"
                    style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '100px 100px'}}
                >
                </div></div>
          } catch {
            return <div key={num} className="droppable"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, num)}>
                </div>
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
    if(this.props.match.url !== '/plan/new') {
      let url = 'http://localhost:8080/api' + this.props.match.url
      fetch(url)
      .then(response => response.json())
      .then(json => {
        this.props.onPlanFetch(json)
      }).then(() => {
        if(this.props.plan !== null) {
          let planCells = this.props.plan.cells
          for(let i = planCells.length - 1; i > -1; i--){
            let num = planCells[i].cellNum
            let plantInfo = planCells[i].plant
            this.setState({plantsInPlan: {
              ...this.state.plantsInPlan,
              [num]: plantInfo
              }
            },() => this.tableGenerate())
          }
        }
      })
    } else if (this.props.height === 0 || this.props.width === 0) {
      this.props.history.push('/make-garden')
    }
    this.props.onPlantsFetched()
    this.tableGenerate()
  }

  render() {
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
      if(Array.isArray(plant) || plant === undefined){
        console.log('nothing planted')
      } else {
        let display = (<li key={index+1}>{index + 1} - {plant.name}</li>)
        displayPlants.push(display)
      }
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
    plants: state.plants,
    plan: state.plan
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlantsFetched: () => dispatch(actionCreators.plantsFetched()),
    onPlanFetch: (plan) => dispatch(actionCreators.onePlanFetched(plan))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
