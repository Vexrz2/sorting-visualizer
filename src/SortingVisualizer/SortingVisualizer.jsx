import React from "react";
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// Max, min bar height
const MAX_BAR_HEIGHT = 500
const MIN_BAR_HEIGHT = 5

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      bars: 100,
      sortingSpeed: 5,
      timeouts: [],
      inSort: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  clearTimeouts() {
    const timeouts = this.state.timeouts;
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);    
    }
    this.setState({timeouts: []})   // clear timeouts array
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  }

  resetArray() {
    const array = [];
    this.clearTimeouts();
    for (let i = 0; i < this.state.bars; i++) {
      array.push(randIntFromInterval(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
    }
    this.setState({inSort: false});
    this.setState({array: array});
  }

  mergeSort() {
    const animations = SortingAlgorithms.getMergeSortAnimations(this.state.array);
    this.mergeSortAnimationsRun(animations);
  }

  mergeSortAnimationsRun(animations) {
    this.setState({inSort: true});
    const {sortingSpeed, timeouts, array} = this.state;
    for (let i = 0; i < animations.length-1; i++) {
      let timeout = setTimeout(() => {
        this.mergeSortAnimationRun(animations, i);
      }, i * sortingSpeed);
      timeouts.push(timeout);
    }
    const last = animations.length-1;
    let promise = new Promise((resolve) => {timeouts.push(setTimeout(() =>          // handle last animation timeout as timer for end of sort 
      {
        this.mergeSortAnimationRun(animations, last);
        resolve();
      }, last * sortingSpeed))});
    promise.then(() => {
      this.setState({inSort: false});
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        array[i] = parseInt(arrayBars[i].style.height);
      }
    });
  }

  mergeSortAnimationRun(animations, i) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      barOneStyle.backgroundColor = color;
      barTwoStyle.backgroundColor = color;
    } 
    else {
      const [barOneIdx, newHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      barOneStyle.height = `${newHeight}px`;
    }
  }

  quickSort() {
    const animations = SortingAlgorithms.getQuickSortAnimations(this.state.array);
    this.animationsRun(animations);
  }

  heapSort() {
    const animations = SortingAlgorithms.getHeapSortAnimations(this.state.array);
    this.animationsRun(animations);
  }

  bubbleSort() {
    const animations = SortingAlgorithms.getBubbleSortAnimations(this.state.array);
    this.animationsRun(animations);
  }

  insertionSort() {
    const animations = SortingAlgorithms.getInsertionSortAnimations(this.state.array);
    this.animationsRun(animations);
  }

  selectionSort() {
    const animations = SortingAlgorithms.getSelectionSortAnimations(this.state.array);
    this.animationsRun(animations);
  }

  animationsRun(animations) {
    this.setState({inSort: true});
    const {sortingSpeed, timeouts, array} = this.state;
    for (let i = 0; i < animations.length-1; i++) {
      let timeout = setTimeout(() => {
        this.animationRun(animations, i);
      }, i * sortingSpeed);
      timeouts.push(timeout);
    }
    const last = animations.length-1;
    let promise = new Promise((resolve) => {timeouts.push(setTimeout(() =>          // handle last animation timeout as timer for end of sort 
      {
        this.animationRun(animations, last);
        resolve();
      }, last * sortingSpeed))});
    promise.then(() => {
      this.setState({inSort: false});
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        array[i] = parseInt(arrayBars[i].style.height);
      }
    });
  }

  animationRun(animations, i) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const [barOneIdx, barTwoIdx, swap] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;
    const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    barOneStyle.backgroundColor = color;
    barTwoStyle.backgroundColor = color;
    if (i % 2 === 0 && swap) {
      const temp = barOneStyle.height;  // swapping heights
      barOneStyle.height = barTwoStyle.height;
      barTwoStyle.height = temp;
    }
  }

  updateBars = (event, newValue) => {
    this.setState({bars: newValue});
  };
  
  updateSpeed = (event, newValue) => {
    this.setState({sortingSpeed: newValue});
  };

  render() {
    const {array, inSort} = this.state;
    const arrayBars = document.getElementsByClassName('array-bar');
    const maxHeight = Math.max(...array); // find max height in array, later used to offset all bars to align array vertically
    if (inSort) {
      for (let i = 0; i < arrayBars.length; i++) {
        array[i] = parseInt(arrayBars[i].style.height);
      }
    }
    return (
      <>
        <h1>Sorting Visualizer</h1>
        <div className="array-container">
            {array.map((value,index) => (
                <div className="array-bar" 
                key={index}
                style={{height: `${value}px`, width: "5px",top: `${MAX_BAR_HEIGHT - maxHeight}px`}}>  
                </div>
            ))} 
            
        </div>
        <div className="slider-list">
          <div className="slider">Number of bars (Reset array for effect):<Slider defaultValue={100} step={5} min={10} max={200} valueLabelDisplay="auto" onChange={this.updateBars} /></div>
          <div className="slider">Sorting speed interval (higher is slower): <Slider defaultValue={5} step={1} min={1} max={20} valueLabelDisplay="auto" onChange={this.updateSpeed}/></div>
        </div>
        <div className="button-list">
            <Button variant="contained" onClick={() => this.resetArray()}>Generate New Array (Stop sort)</Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.mergeSort()}>Merge Sort </Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.quickSort()}>Quick Sort </Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.heapSort()}>Heap Sort </Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.bubbleSort()}>Bubble Sort </Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.insertionSort()}>Insertion Sort </Button>
            <Button disabled={inSort} variant="contained" onClick={() => this.selectionSort()}>Selection Sort </Button>
        </div>
      </>
    );
  }
    
}

function randIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}