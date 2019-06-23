import React, { Component } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import Typography from '@material-ui/core/Typography';

class WorldMapD3 extends Component {
  constructor() {
    super()
    this.state = {
      worldData: [],
    }
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  componentDidMount() {
    fetch("/110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return false
        }
        return response.json()
      }).then(worldData => {
        this.setState({
          worldData: feature(worldData, worldData.objects.countries).features,
        })
      })
  }
  render() {
    return (
      <div>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          style={{paddingBottom:'15px'}}>
            Showing world map using SVG
          </Typography>
      <svg viewBox="0 0 850 400">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="country"
                fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
              />
            ))
          }
        </g>
        <g className="markers">
          <circle
            cx={ this.projection()([8,48])[0] }
            cy={ this.projection()([8,48])[1] }
            r={ 10 }
            fill="#E91E63"
            className="marker"
          />
        </g>
      </svg>
      </div>
    )
  }
}

export default WorldMapD3