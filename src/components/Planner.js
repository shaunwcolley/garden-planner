import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions/actionCreators'
import axios from 'axios'
import "../css/Planner.css"

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
    } else {
      let id = e.dataTransfer.getData("id")
      let newPlant = this.props.plants.find((plant) => {
        return plant.name === id
      })
      let p = { ...newPlant }
      if(this.props.match.url !== '/plan/new') {
        p['cellId'] = cellId
      }
      this.setState({
        plantsInPlan: {
          ...this.state.plantsInPlan,
        [category]: p
      }
      }, () => {
        this.tableGenerate()
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
        return <div key={cellId} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, num, cellId)}>
              <div key={num}>
              {num}
              </div>
              <div
              className="draggable"
              style= {{backgroundImage: `url(${plant.companion.imageURL})`, backgroundSize: '90px 90px', backgroundRepeat: 'no-repeat'}}
              >
              </div>
            </div>
      } catch {
        return <div key={num} className="droppable"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, num, null)}>
            <div>
            </div>
            {num}
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
        console.log(response.data)
        this.props.onPlanFetch(response.data)
      }).then(() => {
        if(this.props.plan !== null) {
          let planCells = this.props.plan.cells
          for(let i = planCells.length - 1; i > -1; i--){
            let cellId = planCells[i].id
            let num = planCells[i].cellNum
            let plantInfo = planCells[i].plant
            let nullPlant = ''
            let plantStore = ''
            if(plantInfo){
              plantInfo.cellId = cellId
            } else{
              nullPlant = {
                cellId: cellId,
                companion: {
                  imageURL: null
                }
              }
            }
            if (plantInfo) {
              plantStore = { ...plantInfo }
            } else {
              plantStore = { ...nullPlant }
            }
            this.setState({plantsInPlan: {
              ...this.state.plantsInPlan,
              [num]: plantStore
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
      userId: this.props.userId,
      plantsInPlan: this.state.plantsInPlan
    })
    .then(response => {
      if(response.data.success){
        console.log(response.data.message)
        this.props.history.push('/make-garden')
      } else {
        console.log(response.data.message)
        this.props.history.push('/make-garden')
      }
    })
  }

  handleUpdatePlanClick = () => {
    axios.post("http://localhost:8080/api/update-plan", {
      plantsInPlan: this.state.plantsInPlan
    }).then(response => {
      console.log(response.data.message)
      this.props.history.push('/make-garden')
    })
  }

  render() {
    if (this.state.plantsInPlan == null) {
      return null
    }

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
        if(plant.name) {
          let display = (<tr key={index+1}>
            <td>{index + 1}</td>
            <td>{plant.name}</td>
            <td> {plant.firstHarvestDate}</td>
            <td> - </td>
            <td>{plant.lastHarvestDate}</td></tr>)
          displayPlants.push(display)
        }
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
          <div className="plant-table">
            {this.state.table}
          </div>
          <div>
            <table className="plant-info-table"><tbody><tr>
            <th>Plot</th>
            <th>Plant</th>
            <th colSpan="3">Estimated Days Until Harvest</th>
            </tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            {displayPlants}
            </tbody></table>
          </div>
          <div>
            <button className="save-button" onClick={this.props.match.url === "/plan/new" ? () => this.handleSavePlanClick() : () => this.handleUpdatePlanClick()}><h4>{this.props.match.url === "/plan/new" ? "Save Plan" : "Update Plan"}</h4></button>
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
    planName: state.planName,
    userId: state.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlantsFetched: () => dispatch(actionCreators.plantsFetched()),
    onPlanFetch: (plan) => dispatch(actionCreators.onePlanFetched(plan))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner)
