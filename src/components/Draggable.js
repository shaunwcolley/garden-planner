import React, { Component } from 'react';

export class Draggable extends Component {
  state = {
    plants: [
      {name: "Tomato", category:'tbp', bgcolor: "red"},
      {name: "Corn", category:'tbp', bgcolor: "yellow"},
      {name: "Lettuce", category:'planted', bgcolor: "green"}
    ]
  }

  onDragStart = (e, id) => {
    console.log('dragstart:', id)
    e.dataTransfer.setData("id", id)
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e, category) => {
    let id = e.dataTransfer.getData("id")

    let plants = this.state.plants.filter((plant) => {
      if (plant.name === id) {
        plant.category = category
      }
      return plant
    })
    this.setState({
      ...this.state,
      plants
    })
  }

  render() {
    let plants = {
      tbp: [],
      planted: []
    }
    this.state.plants.forEach ((plant) => {
      plants[plant.category].push(
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
        <h3 className="header-plant">Choose a plant to plant</h3>
        <div className="drag-body">
          <div className="tbp"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e)=> this.onDrop(e,"tbp")}
              >
              <span className="section-header">To Be Planted</span>
              {plants.tbp}
          </div>
          <div className="droppable"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "planted")}>
            <span className="section-header">Planted</span>
            {plants.planted}
          </div>
        </div>
      </div>
    )
  }

}
