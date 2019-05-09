import React, { Component } from 'react';

export class Draggable extends Component {
  state = {
    plantsToChoose: [
      {name: "Tomato", category:'tbp', bgcolor: "red"},
      {name: "Corn", category:'tbp', bgcolor: "yellow"},
      {name: "Lettuce", category:'tbp', bgcolor: "green"}
    ],
    plantsInPlan: []
  }

  onDragStart = (e, id) => {
    //console.log('dragstart:', id)
    //id is key given from plant.name in li
    e.dataTransfer.setData("id", id)
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e, category) => {
    let id = e.dataTransfer.getData("id")

    let plants = this.state.plantsToChoose.filter((plant) => {
      if (plant.name === id) {
        plant.category = category
        return plant
      }
    })
    this.setState({
      ...this.state,
      plantsInPlan: this.state.plantsInPlan.concat(plants)
    })
  }

  render() {
    let plants = {
      toChoose: [],
      inPlan: {
        t1: [],
        t2: [],
        t3: []
      }
    }
    this.state.plantsToChoose.forEach ((plant) => {
      plants.toChoose.push(
        <div key={plant.name}
            onDragStart = {(e) => this.onDragStart(e, plant.name)}
            draggable
            className="draggable"
            style= {{backgroundColor: plant.bgcolor}}
        >
          {plant.name}
        </div>
      )
    })
    this.state.plantsInPlan.forEach ((plant) => {
      if(plant.category === null)
      plants.inPlan[plant.category].push(
        <div key={plant.name}
            onDragStart = {(e) => this.onDragStart(e, plant.name)}
            draggable
            className="draggable"
            style= {{backgroundColor: plant.bgcolor}}
        >
          {plant.name}
        </div>
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
              <span className="section-header">To Be Planted</span>
              {plants.toChoose}
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
