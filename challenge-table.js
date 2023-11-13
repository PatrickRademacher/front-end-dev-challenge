import {LitElement, html, css} from 'lit';
import {map} from 'lit/directives/map.js';
import './challenge-chart/dist/challenge-chart';
import { ChallengeDataService } from './ChallengeDataService';


export class ChallengeTable extends LitElement {
  static get styles() {
    return css`
      :host {
        height: 100vh;
        font-family: "Lucida Console", "Courier New", monospace;
      }

      h1 {
        text-align: center;
        justify-content: center;
        color: #007377;
        font-size: 45px;
        font-size: 3.6vh;
        height: 5vh;
      }

      table {
        border: 2px solid #fdb730;
        border-collapse: collapse;
        color: #007377;
        width: 95%;
      }

      table.scrolldown { 
        width: 100%; 
        /* border-collapse: collapse; */ 
        border-spacing: 0; 
        border: 2px solid #fdb730; 
        } 
    
      /* To display the block as level element */ 
      table.scrolldown tbody, table.scrolldown thead { 
          display: block; 
      }  
    
      thead tr th { 
          height: 40px;  
          line-height: 40px; 
      } 
    
      table.scrolldown tbody { 
            
          /* Set the height of table body */ 
          height: 50px;  
            
          /* Set vertical scroll */ 
          overflow-y: auto; 
            
          /* Hide the horizontal scroll */ 
          overflow-x: hidden;  
      } 
    
      tbody {  
          border-top: 2px solid #fdb730; 
      } 
    
      tbody td, thead th { 
          border: 2px solid #fdb730; 
      } 
      td { 
          text-align: center; 
          border: 1px solid;
      } 

      th{
        border: 1px solid;
      }

      #buttons-and-sliders{
        border: 1px solid #fdb730; 
        display: flex; 
        align-items: center; 
        width: 100vw;
        background-color: #007377;
        height: 23vh;
        justify-content: center;
      }

      .buttons {
        display: flex;
        flex-direction: row;
        align-self: center;
        justify-content: space-evenly;
        padding: 14px;
        min-width: 300px;
        margin: 5px;
      }

      button {
        background-color: white;
        border: 2px solid #fdb730;
        border-radius: 30px;
        box-shadow: white 2px 2px 0 0;
        color: #007377;
        cursor: pointer;
        display: inline-block;
        font-weight: 600;
        font-size: 12px;
        padding: 8px 8px;
        margin: 9px;
        line-height: 15px;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        font-family: "Lucida Console", "Courier New", monospace;
        width: 210px;
      }
    
      button:hover {
        color: #007377;
        background-color: #fdb730;
        border: 2px solid white;
        box-shadow: #fdb730 2px 2px 0 0;
      }
      
      button:active {
        box-shadow: #422800 2px 2px 0 0;
        transform: translate(2px, 2px);
      }

      #slidecontainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3px;
        width: 100%;
        min-width: 100px;
        max-width: 650px;
      }
    
      #slider {
        -webkit-appearance: none;
        width: 90%;
        height: 15px;
        border-radius: 5px;
        background: #fdb730;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        display: flex;
        justify-self: center;
      
      }
      
      #slider:hover {
        opacity: 1;
      }
      
      #slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
      }
    
      #slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #04AA6D;
        cursor: pointer;
      }

      .disabled {
        pointer-events: none;
        opacity: 0.5; /* You can adjust the opacity or add other styles for the disabled look */
      }
      challenge-chart{
        width: 100%;
        padding: 10px;
      }

      * {
        box-sizing: border-box;
      } 

      #table-and-graph{
        display: flex; 
        flex-wrap: wrap;
        height: 60vh;
        justify-content: space-between;
      }
    
      #dot-graph {
        width: 60%;
        justify-content: center;
        display: flex;
        background-color: white;
        min-width: 550px;
        align-items: center;
      }
      
      #table {
        width: 40%;
        padding: 4px;
        text-align: center;
        overflow-y: auto;
        display: flex;
        justify-content: center; 
        border: 1px solid white;
        height: 67vh;
        min-width: 350px;
        background-color: white;
      }
    
      @media only screen and (max-width: 1000px) {
        /* For mobile phones: */
        #dot-graph, #table{
          width: 100%;
        }
      }
  `;
  }

  
  
  static get properties() {
    return {
      // Feel free to refactor, change type, name, etc
      name: { type: String },
      data: { type: Array },
      columnNames: { type: Array },
      challengeDataService: {type: ChallengeDataService },
      dynamicButton: { type: String },
      active: { type: Boolean},
      samplesPerSecond: { type: Number },
      samplesLoaded: { type: Number }
    };
  }

  constructor(){
    super();
    this.name = '';
    this.columnNames = [];
    this.challengeDataService = new ChallengeDataService;
    this.getData("medium");
    this.active = false;
    this.dynamicButton = "Get Dynamic Data";
    this.samplesPerSecond = 1;
    this.samplesLoaded = 1;
  }

  async getData(dataset) {
    const response = await this.challengeDataService.getDataSet(dataset).then(success => {
      const name = success.name;
      const columnNames = [success.xColumn._name, success.yColumn._name];
      const data = success.xColumn._values.map((x, i) => ({x: x, y: success.yColumn._values[i]}));
      const result = [[name], data, columnNames];
      return result
    }).catch(error => console.log(error));
    
    this.name = response[0];
    this.data = response[1]; 
    this.columnNames = response[2];
    const result = [this.name, this.data, this.columnNames];
    return result;
} 

  getDynamicData(){
    this.active = !this.active;
    this.name = "DataSet-dynamic";
    this.columnNames = ["x", "y"];
    if(this.active){
      this.dynamicButton = "Stop Dynamic Data";
      let dynamicData = [];
      this.challengeDataService.startStreaming(this.samplesPerSecond, (x,y) => {
        dynamicData = dynamicData.concat([{x: x, y: y}])
        dynamicData.length % this.samplesLoaded === 0 ? this.data = dynamicData : null;
      });
    }
    else{
      this.dynamicButton = "Get Dynamic Data";
      this.challengeDataService.stopStreaming();
    }
  }

  handleRateChange(event) {
    this.samplesPerSecond = event.target.value;
  }

  handleLoadChange(event) {
    this.samplesLoaded = event.target.value;
  }

  render() {
    return html`
  
    <h1>${this.name}</h1>
      <div id="buttons-and-sliders">
        <div class="buttons">
          <button @click=${() => this.getData('small')} class="small-data">Get Small Dataset</button>
          <button @click=${() => this.getData("medium")}>Get Medium Dataset</button>
          <button @click=${() => this.getData("large")}>Get Large Dataset</button>
          <button @click=${() => this.getDynamicData()} class="dynamic-data-button">${this.dynamicButton}</button>          
        </div>
        <div id="slidecontainer">
          <p style="font-size: 15px; color: #fdb730; border: 2px solid white; border-radius: 20px; padding: 7px; width: 120px; display: flex; justify-content: center">Samples Per Second: ${this.samplesPerSecond}</p>
          <input
            type="range"
            id="slider"
            min="1"
            max="1000"
            class="${this.active ? 'disabled' : ''}"
            .value="${this.samplesPerSecond}"
            @input="${this.handleRateChange}"
          >
          </input>
          <p style="font-size: 15px; color: #fdb730; border: 2px solid white; border-radius: 20px; padding: 7px; width: 120px; display: flex; justify-content: center;">Samples Per Load: ${this.samplesLoaded}</p>
          <input
            type="range"
            id="slider"
            min="1"
            max="1000"
            class="${this.active ? 'disabled' : ''}"
            .value="${this.samplesLoaded}"
            @input="${this.handleLoadChange}"
          >
          </input>
        </div>
      </div>
      <div id="table-and-graph">
        
        <div id="dot-graph">
          <challenge-chart .data=${this.data}></challenge-chart>
        </div>
        <div id="table">
        <table>
          <thead>
            <tr>
              <th>${this.columnNames[0]}</th>
              <th>${this.columnNames[1]}</th>
            </tr>
          </thead>
          <tbody>
            ${map(
              this.data, 
              (item) => html`
              <tr>
                <td>${item.x}</td>
                <td>${item.y}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    </div>

     
  
    
    `;
  }
}

window.customElements.define("challenge-table", ChallengeTable);




