import React from 'react';
import { geoPath, geoOrthographic } from "d3-geo"
import { feature } from "topojson-client"
import Typography from '@material-ui/core/Typography';
import * as md3 from 'd3';
import d3Tip from "d3-tip";

export default class WorldMapCities extends React.Component {
    constructor(props){
        super(props)
        this.state={renderCounter:0}
    }

    componentDidMount() {
        this.svg = md3.select('#globalcities').style('background-color', '#222');
        this.path = md3.select('#globalcities').append('path').attr('stroke', '#324567').attr('fill','white').attr('id','countryLines');
        this.cities = '';
        this.citiesG = this.svg.append('g');
        this.projection = geoOrthographic();
        this.initialScale = this.projection.scale();
        this.geoPath = geoPath().projection(this.projection);
        this.moving = false;
        this.rValue = d => d.population;
        this.rScale = md3.scaleSqrt().range([0, 20]);

        this.commaFormat = md3.format(',');
        this.tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(d => `${d.name}: ${this.commaFormat(d.population)}`);
        this.svg.call(this.tip);

        this.countries110mPromise=fetch("/110m.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return false
                }
                return response.json()
            }).then(world110m => {
                this.countries110m = feature(world110m, world110m.objects.countries)
            });

        this.countries50mPromise=fetch("/50m.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return false
                }
                return response.json()
            }).then(world50m => {
                this.countries50m = feature(world50m, world50m.objects.countries)
            });

        this.citiesPromise=fetch("/geonames_cities100000.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return false
                }
                return response.json()
            }).then(cities => {
                this.cities = cities;
                this.cities.forEach(d => {
                    d.latitude = +d.latitude;
                    d.longitude = +d.longitude;
                    d.population = +d.population;
                });
                this.rScale.domain([0, md3.max(this.cities, this.rValue)]);

                const point = {
                    type: 'Point',
                    coordinates: [0, 0]
                };

                this.cities.forEach(d => {
                    d.radius = this.rScale(this.rValue(d));
                    point.coordinates[0] = d.longitude;
                    point.coordinates[1] = d.latitude;
                    d.projected = geoPath(point) ? this.projection(point.coordinates) : null;
                });
                Promise.all([this.countries110mPromise, this.countries50mPromise,this.citiesPromise]).then(values=>{
                    this.rendersvg();
                })
                
            });

            this.rotate0=[];this.coords0=[];
    
            this.svg
              .call(md3.drag()
                .on('start', () => {
                  this.rotate0 = this.projection.rotate();
                  this.coords0 = this.coords();
                  this.moving = true;
                })
                .on('drag', () => {
                  this.coords1 = this.coords();
                  this.projection.rotate([this.rotate0[0] + this.coords1[0] - this.coords0[0], this.rotate0[1] + this.coords1[1] - this.coords0[1]])
                  this.rendersvg();
                })
                .on('end', () => {
                  this.moving = false;
                  this.rendersvg();
                })
                // Goal: let zoom handle pinch gestures (not working correctly).
                .filter(() => !(md3.event.touches && md3.event.touches.length === 2))
              )
              .call(md3.zoom()
                .on('zoom', () => {
                  this.projection.scale(this.initialScale * md3.event.transform.k);
                  this.rendersvg();
                })
                .on('start', () => {
                  this.moving = true;
                })
                .on('end', () => {
                  this.moving = false;
                  this.rendersvg();
                })
              )
    }

    rendersvg(){

        const point = {
            type: 'Point',
            coordinates: [0, 0]
        };

        this.cities.forEach(d => {
            d.radius = this.rScale(this.rValue(d));
            point.coordinates[0] = d.longitude;
            point.coordinates[1] = d.latitude;
            d.projected = geoPath(point) ? this.projection(point.coordinates) : null;
        });

        // Render low resolution boundaries when moving,
        // render high resolution boundaries when stopped.
        console.log(this.moving, this.countries110m , this.countries50m);
        md3.select("#countryLines").datum(this.moving ? this.countries110m : this.countries50m).attr('d', geoPath(this.projection));
        const k = Math.sqrt(this.projection.scale() / 200);
        const circles = this.citiesG.selectAll('circle')
            .data(this.cities.filter(d => d.projected));
        circles.enter().append('circle')
            .merge(circles)
            .attr('cx', d => d.projected[0])
            .attr('cy', d => d.projected[1])
            .attr('fill', 'steelblue')
            .attr('fill-opacity', 0.4)
            .attr('r', d => d.radius * k)
            .on('mouseover', this.tip.show)
            .on('mouseout', this.tip.hide);
        circles.exit().remove();
    }

    coords() { 
        return this.projection.rotate(this.rotate0).invert([md3.event.x, md3.event.y]);
    }

    render() {
        return (<div >
            <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          style={{paddingBottom:'15px'}}>
            Showing world map of most populated cities using D3, GeoJSON and SVG with spherical projection including rotate and zoom feature
          </Typography>
            <svg id='globalcities' ref={node => this.node = node} width="100%" height="450"></svg>
        </div>)
    }
}