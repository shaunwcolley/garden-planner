import React, { Component } from 'react';

class Draggable extends Component {
  state = {
    plantsToChoose: [
      {name: "Tomato", bgcolor: "red"},
      {name: "Corn", bgcolor: "yellow"},
      {name: "Lettuce", bgcolor: "green"}
    ],
    plantsInPlan: {
      t1: [],
      t2: [],
      t3: []
    }
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

  categoryLoop = (category, array) => {
    this.state.plantsInPlan[category].forEach ((plant, index) => {
        array.inPlan[category].push(
          <div key={index}
              onDragStart = {(e) => this.onDragStart(e, plant.name)}
              draggable
              className="draggable"
              style= {{backgroundColor: plant.bgcolor}}
          >
            {plant.name}
          </div>
        )
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

    this.categoryLoop('t1',plants)
    this.categoryLoop('t2',plants)
    this.categoryLoop('t3',plants)

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

export default Draggable
