import React, { Component } from 'react';

import axios from 'axios';

class Calendar extends Component {

  componentDidMount() {
    const url = 'http://localhost:8080/api/calendar/' + this.props.userId;
    axios.get(url)
    .then(response => console.log(response.data))
  };

  render() {
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
