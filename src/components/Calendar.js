import React, { Component } from 'react';

class Calendar extends Component {
  render() {
    return <div>
            Calendar
            <table>
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
            </table>
           </div>
  }
}

export default Calendar;
