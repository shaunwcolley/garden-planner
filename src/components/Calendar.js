import React, { Component } from 'react';

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
    let display = []
    const { plans } = this.state
    if(plans) {
      plans[0].cells.forEach(cell => {
        const {plant: { name }, updatedAt} = cell
        console.log(cell)
        display.push(name)
      })
    }
    return <div>
            Calendar
            {display}
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
                    Harvest Soon
                  </th>
                  <th>
                    Plant Soon
                  </th>
                </tr>
                <tr>
                  <td>K's Garden</td>
                  <td>Onion</td>
                  <td>July 8th</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
           </div>
  }
}



export default Calendar;
