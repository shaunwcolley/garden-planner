import React, { Component } from 'react';
import { connect } from 'react-redux'

class Planner extends Component {
  constructor (props) {
    super (props)

    this.state = {
      plantsToChoose: [
        {name: "Tomato", bgcolor: "red"},
        {name: "Corn", bgcolor: "yellow"},
        {name: "Lettuce", bgcolor: "green"}
      ],
      plantsInPlan: this.props.cells
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
          [category]: this.state.plantsInPlan[category].concat(newPlant)
        }
      })
    }
  }

  categoryLoop = (array) => {
    let a = Object.keys(this.state.plantsInPlan)
    for(let i = 1; i < (a.length + 1) ; i++) {
      let category = "t" + i
      this.state.plantsInPlan[category].forEach ((plant, index) => {
        array.inPlan[category] =
          <div key={index}
              onDragStart = {(e) => this.onDragStart(e, plant.name)}
              draggable
              className="draggable"
              style= {{backgroundColor: plant.bgcolor}}
          >
            {plant.name}
          </div>
      })
    }
  }

  render() {
    if (this.props.height === 0 || this.props.width === 0) {
      this.props.history.push('/plan-size')
    }

    let plants = {
      toChoose: [],
      inPlan: this.props.cells
    }

    this.state.plantsToChoose.forEach ((plant) => {
      plants.toChoose.push(
        <tr key={plant.name}><td key={plant.name}
            onDragStart = {(e) => this.onDragStart(e, plant.name)}
            draggable
            className="draggable"
            style= {{backgroundColor: plant.bgcolor}}
        >
          {plant.name}
        </td></tr>
      )
    })

    this.categoryLoop(plants)
    console.log(plants)


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
          <div className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "t1")}>
            <span className="section-header">Planted</span>
            {plants.inPlan.t1}
          </div>
          <div className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "t2")}>
            <span className="section-header">Planted</span>
            {plants.inPlan.t2}
          </div>
          <div className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "t3")}>
            <span className="section-header">Planted</span>
            {plants.inPlan.t3}
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
    cells: state.cells
  }
}

export default connect(mapStateToProps)(Planner)
