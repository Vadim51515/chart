import React, { Component } from 'react';
import { render } from 'react-dom';
var checkbox = []
let items =[]
class Checkbox extends Component {
    constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
			xxx: [],
			currentData: [],
			chartsList:[],
			error: null,
      		isLoaded: false,
              items: [],
              hueta: ''
        };
        this.apiUrl = "http://192.168.0.170:8000/";
    }
    componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			100000
		);
		this.fetchDeviceList();

    }
        
    onCbRef(cb) {
		console.log('on cb');
		console.log(cb);
		// this.state.chartsList
		cb.addEventListener('change', function () {
			if (this.checked) {
                console.log(this.checked)
                checkbox = this.value
                
			} 
			else {
				console.log(this.checked)
			}
		});	
    }

	fetchDeviceList = async() => {
       
		if (!this.state.isLoaded) {
		     items = await fetch(this.apiUrl).then(r=>r.json()).catch(error=>{return [];})
			this.setState({isLoaded: true, items})
			 console.log(items);
        }
       for (let i = 0; i< items.length;) {
        i++

       } 
    }
     RandomValue = () => {
         return(
        <div >
          { items }
        </div>
        )
    }
    // generateCheckBox(){
    //     for (let i = 0; i < items.length;) { 
    //         console.log("sasaas");
    //         i++;
    //     }
    // }
    render() 
    {  
      const {items} = this.state;
      return (

        <div>
        {items.map(item => (
          <div key={item}>
        <p>{item}</p>

          </div>
        ))}

      </div>



        // <div>      
        // <p><b>Выбирите нужный датчик</b></p>
        // <p><input name="sensor_1" type="checkbox" value="sensor_1" ref={this.RandomValue} />6</p>
        // <p><input name="sensor_2" type="checkbox" value="sensor_2" ref={this.onCbRef}/> Датчик 2 </p>
        // <p><input name="sensor_3" type="checkbox"  value="sensor_3" ref={this.onCbRef}/> Датчик 3 </p>
       
        // </div>
      );
    }
  }
  export default Checkbox;
