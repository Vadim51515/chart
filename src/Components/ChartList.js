import React, { Component } from 'react';
class ChartList extends Component {
    cconstructor(props) {
		super(props);
		this.generateDataPoints = this.generateDataPoints.bind(this);
		this.state = {
			date: new Date(),
			xxx: [],
			currentData: [],
			chartsList:[],
			error: null,
      		isLoaded: false,
      		items: []
		};
	}
    render() {
      const greeting = 'Welcome to React';
   
      return <h1>{greeting}</h1>;
    }
  }
   
  export default ChartList;