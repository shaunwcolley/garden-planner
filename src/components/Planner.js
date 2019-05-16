import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import axios from 'axios'

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

  onDrop = (e, category, cellId) => {
    if(category === null){
      console.log('eventually remove drop')
    } else {
      let id = e.dataTransfer.getData("id")
      let newPlant = this.props.plants.find((plant) => {
        return plant.name === id
      })
      newPlant.cellId = cellId
      //loop through state, return new objects where id is same
      console.log("on drop cell id: " + cellId)
      this.setState({
        plantsInPlan: {
          ...this.state.plantsInPlan,
          [category]: newPlant
        }
      }, () => {
        this.tableGenerate()
        console.log(this.state.plantsInPlan)
      })
    }
  }

  tableGenerate = () => {
    let rows = []
    let cellNumbers = Object.keys(this.props.cells)
    let plant = {}
    let cells = cellNumbers.map(num => {
      plant = this.state.plantsInPlan[num]
      try{
        let cellId = plant.cellId
        console.log("cell id from array: " + cellId)
        return <div key={num} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, num, cellId)}>
              <div
              onDragStart = {(e) => this.onDragStart(e, plant.name)}
              draggable
              className="draggable"
              style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '100px 100px'}}
              >
              </div>
            </div>
      } catch {
        return <div key={num} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, num, null)}>
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
      axios.get(url)
      .then(response => {
        this.props.onPlanFetch(response.data)
      }).then(() => {
        if(this.props.plan !== null) {
          let planCells = this.props.plan.cells
          for(let i = planCells.length - 1; i > -1; i--){
            let cellId = planCells[i].id
            let num = planCells[i].cellNum
            let plantInfo = planCells[i].plant
            plantInfo.cellId = cellId
            this.setState({plantsInPlan: {
              ...this.state.plantsInPlan,
              [num]: plantInfo
              }
            })
          }
          this.tableGenerate()
        }
      })
    } else if (this.props.height === 0 || this.props.width === 0) {
      this.props.history.push('/make-garden')
    }
    this.props.onPlantsFetched()
    this.tableGenerate()
  }

  handleSavePlanClick = () => {
    axios.post("http://localhost:8080/api/save-plan", {
      planName: this.props.planName,
      width: this.props.width,
      height: this.props.height,
      userId: 1, //Need to update with userId once registration and login are set up
      plantsInPlan: this.state.plantsInPlan
    })
    .then(response => {
      if(response.data.success){
        console.log(response.data.message)
      } else {
        console.log(response.data.message)
      }
    })
  }

  handleUpdatePlanClick = () => {
    axios.post("http://localhost:8080/api/update-plan", {
      plantsInPlan: this.state.plantsInPlan
    }).then(response => {
      console.log(response.data.message)
    })
  }

  render() {
    let plants = {
      toChoose: []
    }

    this.props.plants.forEach ((plant) => {
      plants.toChoose.push(
        <td key={plant.id}><p>{plant.name}</p><p key={plant.name}
            onDragStart = {(e) => this.onDragStart(e, plant.name)}
            draggable
            className="draggable"
            style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '100px 100px', backgroundRepeat: 'no-repeat'}}
        ></p>
        </td>
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
              <table><tbody><tr>{plants.toChoose}</tr></tbody></table>
          </div>
          <div>
            <h4>{this.props.planName}</h4>
          </div>
          <div>
            {this.state.table}
          </div>
          <div>
            <ul>{displayPlants}</ul>
          </div>
          <div>
            <button onClick={this.props.match.url === "/plan/new" ? () => this.handleSavePlanClick() : () => this.handleUpdatePlanClick()}>{this.props.match.url === "/plan/new" ? "Save" : "Update"}</button>
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
    plan: state.plan,
    planName: state.planName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlantsFetched: () => dispatch(actionCreators.plantsFetched()),
    onPlanFetch: (plan) => dispatch(actionCreators.onePlanFetched(plan))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
