import React, { Component } from 'react';
import * as d3 from 'd3';




const weekDays = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
}
class HabitGraph extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const node = document.getElementById('graph');
    const days = [];
    const scores = [];
    fetch(`metric/habit/week/${this.props.user_id}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        data.forEach((e, i) => {
            scores.push(e.habitsCompleted.reduce((prev,cur) => {
              return prev + cur['weight']
            },0));
            const day = new Date(e.date);
            days.push(weekDays[day.getUTCDay()]);
          }
        )
        console.log(days, scores);
        const barWidth = 50;
        const left = 40;
        const right = 20;
        const bottom = 20;
        const top = 20;
        const chartHeight = 200;
        const chartWidth = left + (scores.length * (barWidth)) + right;
        let yScale = d3.scaleLinear()
                        .domain([0, d3.max(scores)])
                        .range([0,chartHeight]);
        let yAxisScale = d3.scaleLinear()
                        .domain([d3.min(scores), d3.max(scores)])
                        .range([(chartHeight) - yScale(d3.min(scores)), 0])
        const svg = d3.select(node)
          .append('svg')
          .attr('width', chartWidth)
          .attr('height', chartHeight + 200)
          .style('color', '#456990');
        svg.selectAll('rect')
          .data(scores)
          .enter()
          .append('rect')
            .attr('class', 'bar')
            .attr('x', (d,i) => left + (i * barWidth))
            .attr('y', (d) => chartHeight - Math.max(0, yScale(d)))
            .attr('height', d => Math.abs(yScale(d)))
            .attr('width', barWidth)
            .style('fill', (d) => {
              if(d < 0) return '#EF767A';
              else return '#49DCB1';
            });
        svg.selectAll('text')
          .data(days)
          .enter()
          .append('text')
          .attr('fill', '#456990')
          .attr('x', (d, i) => left + ( (i * (barWidth)) + (barWidth/4)))
          .attr('y', (d, i) => chartHeight)
          .text((d, i) => d);
        const yAxis = d3.axisLeft(yAxisScale);
        svg.append('g')
        .attr('transform', function(d) {
          return 'translate(' + left + ', 0)';
        })
        .call(yAxis);
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {        
    return <div id="graph">
      <h2>Your Week</h2>
    </div>
  }
}

export default HabitGraph;