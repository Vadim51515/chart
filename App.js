import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasJSReact from './canvasjs.react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import { render } from '@testing-library/react';
import Checkbox from './Components/Checkbox'
	var CanvasJS = CanvasJSReact.CanvasJS;
	var CanvasJSChart = CanvasJSReact.CanvasJSChart;
	var name = ""
	var name1 = ""
	// var box_value = 
	class App extends Component {
		constructor(props) {
			super(props);
			this.generateDataPoints = this.generateDataPoints.bind(this);
			this.generateDataPointss = this.generateDataPointss.bind(this);
			this.state = {
				date: new Date(),
				xxx: [],
				xxxx:[],
				currentData: [],
				currentDataa: [],
				chartsList: [],
				isToggleOn: false      
			};

			this.ws = new WebSocket("ws://192.168.0.170:4444/Sound");
			this.es = new WebSocket("ws://192.168.0.170:4444/Light");
			this.send = this.send.bind(this)
			this.handleClick = this.handleClick.bind(this);
		}
		
		componentWillUnmount() {
			clearInterval(this.timerID);
		}

		tick() {
			this.setState({
				date: new Date()
			});
		}
		send() {
			return fetch('http://192.168.0.170:8000/a', {
			  method: 'POST',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				'state': this.state.isToggleOn
			  })
			}).then((response) => response.json())
			  .then((responseJson) => {
				return responseJson.success;
			  })
			  .catch((error) => {
				console.error(error);
			  });
		  }
	 
	   handleClick() {
	 
		 this.setState(state => ({
		   isToggleOn: !state.isToggleOn
		 }));
			 this.send()
		 
	   }


		generateDataPoints(noOfDps) {
			var xVal = ""
			let yVal = 0
			var dps = [];
			var shifted
			let sins = []
			let times = []
			let num =
				xVal = this.state.xxx;
			xVal.map((tim) => {
				times.push(tim.time)
			})

			// console.log(num);
			// console.log(nuddm);
			yVal = this.state.xxx;
			yVal.map((w)=> {
				if (w.Sound < 0) {

				}
				else {
					sins.push(w.Sound)
				}
			})
			for (var i = 0; i < noOfDps; i++) {
				num = new Date(times[0 + i])
				dps.push({ x: num, y: sins[0 + i] });
				if (this.state.xxx.length > 100) {
					// shifted = this.state.xxx.shift();

				}

			}
			//  console.log(dps)
			return dps;

		}
		generateDataPointss(noOfDps) {
			var xVal = ""
			let yVal = 0
			var dps = [];
			var shiftedd
			let sins = []
			let times = []
			let num =
				xVal = this.state.xxxx;
			xVal.map((tim) => {
				times.push(tim.time)
			})

			// console.log(num);
			yVal = this.state.xxxx;
			yVal.map((w)=> {
				
					sins.push(w.Light)
				
			})
			for (var i = 0; i < noOfDps; i++) {
				num = new Date(times[0 + i])
				dps.push({ x: num, y: sins[0 + i] });
				if (this.state.xxxx.length > 100) {
					// shiftedd = this.state.xxxx.shift();

				}

			}
			//  console.log(dps)
			return dps;

		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		onCbRef(cb) {
			console.log('on cb');
			console.log(cb);
			// this.state.chartsList
			cb.addEventListener('change', function () {
				if (this.checked) {
					console.log(this.value)
				}
				else {
					console.log(this.checked)
				}
			});

		}
		
		componentDidUpdate(prevProps) {
			
		  }

		render() {

			this.ws.onopen = () => {
				console.log('Opened Connection!')
			};
			// this.es.onopen = () => {
			// 	console.log('Opened Connection!')
			// };

			this.ws.onmessage = (event) => {
				const oldData = this.state.currentData;
				const newData = JSON.parse(event.data);
				const currentData = oldData.concat(newData);
				this.setState({xxx:currentData}) 
				console.log(newData);
				this.setState({ currentData }, () => console.log());

			};
			this.ws.onopen = () => {
				console.log('Opened Connection!')
			};
			this.es.onmessage = (event) => {
				const oldDataa = this.state.currentDataa;
				const newDataa = JSON.parse(event.data);
				const currentDataa = oldDataa.concat(newDataa);
				this.setState({xxxx:currentDataa}) 
				// console.log(this.state.xxxx);
				this.setState({ currentDataa }, () => console.log());
			};
			this.es.onclose = () => {
				console.log('Closed Connection!')
			};
			const options = {
				theme: "light2", // "light1", "dark1", "dark2"
				animationEnabled: true,
				zoomEnabled: true,
				title: {
					text: "Sound"
				},
				data: [{
					type: "area",
					dataPoints: this.generateDataPoints(this.state.xxx.length)
				}]
			}
			const options_1 = {
				theme: "light2", // "light1", "dark1", "dark2"
				animationEnabled: true,
				zoomEnabled: true,
				title: {
					text: "Light"
				},
				data: [{
					type: "area",
					dataPoints: this.generateDataPointss(this.state.xxxx.length)
				}]


			}

			return (
				<div>
					<div class="graf_1">
						<CanvasJSChart options={options}			
					    />
						</div>
						<div>
						<CanvasJSChart options={options_1}
						/>
						<Checkbox/>
						<button onClick={()=>{this.handleClick()}}>
        {this.state.isToggleOn ? 'Выключено' : 'Включено'}
      </button>
				</div>
				</div>
			);
		}
	}
	export default App;
