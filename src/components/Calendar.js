import React, { Component } from 'react';
import Moment from 'react-moment';

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
    const url = 'http://localhost:8080/api/calendar/' + this.props.userId;
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
        })
      })
    }

    return <div>
            Calendar
            <table>
              <tbody>
                <tr>
                  <th>
                    Plan
                  </th>
                  <th>
                    Plant
                  </th>
                  <th>
                    Planted
                  </th>
                  <th>
                    Earliest Expected Harvest
                  </th>
                </tr>
                {display}
              </tbody>
            </table>
           </div>
  }
}



export default Calendar;
