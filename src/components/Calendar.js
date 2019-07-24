import React, { Component } from 'react';
import Moment from 'react-moment';
import '../css/Calendar.css';

import axios from 'axios';

class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      plans: null,
      message: null
    }
  }

  componentDidMount() {
    const url = 'https://garden-planner-api.herokuapp.com/api/calendar/' + this.props.userId;
    axios.get(url)
    .then(response => {
      if(response.data.success){
        this.setState({
          plans: response.data.plans
        })
      }
      else {
        this.setState({
          message: response.data.error
        })
      }
    })
  };

  render() {
    function addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    let display = []
    const { plans } = this.state;
    if(plans) {
      plans.forEach(plan => {
        plan.cells.forEach(cell => {
          if(cell.plant){
            const {id, plant: { name, firstHarvestDate }, updatedAt} = cell
            let plantedDate = new Date(updatedAt);
            const harvestDate = addDays(plantedDate,parseInt(firstHarvestDate));
            const row = (
                        <tr key={id}>
                          <td>{plan.name}</td>
                          <td>{name}</td>
                          <td><Moment format="MMMM DD YYYY">{plantedDate}</Moment></td>
                          <td><Moment format="MMMM DD YYYY">{harvestDate}</Moment></td>
                        </tr>
                      );
            display.push(row);
          }
        })
      })
    }

    return <div className="calendar-container">
            <h2 className="calendar-heading">
              Garden Calendar
            </h2>
            <div className="calendar">
              <table>
                <thead>
                  <tr>
                    <th className="sticky-header">
                      Plan
                    </th>
                    <th className="sticky-header">
                      Plant
                    </th>
                    <th className="sticky-header">
                      Planted
                    </th>
                    <th className="sticky-header">
                      Earliest Expected Harvest
                    </th>
                  </tr>
                  <tr className="sticky-border">
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {display}
                </tbody>
              </table>
            </div>
           </div>
  }
}



export default Calendar;
