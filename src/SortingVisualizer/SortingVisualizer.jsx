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
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.bars; i++) {
      array.push(randIntFromInterval(MIN_BAR_HEIGHT, MAX_BAR_HEIGHT));
    }
    this.setState({array: array});
  }

  mergeSort() {
    const animations = SortingAlgorithms.getMergeSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * sortingSpeed)
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * sortingSpeed)
      }
    }
  }

  quickSort() {
    const animations = SortingAlgorithms.getQuickSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i % 2 === 0 && swap) {
          const temp = barOneStyle.height;  // swapping heights
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
      }, i * sortingSpeed);
    
    }
  }

  heapSort() {
    const animations = SortingAlgorithms.getHeapSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i % 2 === 0) {
          const temp = barOneStyle.height;  // swapping heights
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
      }, i * sortingSpeed);
    }
  }

  bubbleSort() {
    const animations = SortingAlgorithms.getBubbleSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i % 2 === 0 && swap) {
          const temp = barOneStyle.height;  // swapping heights
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
      }, i * sortingSpeed);
    
    }
  }

  insertionSort() {
    const animations = SortingAlgorithms.getInsertionSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i % 2 === 0 && swap) {
          const temp = barOneStyle.height;  // swapping heights
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
      }, i * sortingSpeed);
    
    }
  }

  selectionSort() {
    const animations = SortingAlgorithms.getSelectionSortAnimations(this.state.array);
    const sortingSpeed = this.state.sortingSpeed;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, swap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        if (i % 2 === 0 && swap) {
          const temp = barOneStyle.height;  // swapping heights
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = temp;
        }
      }, i * sortingSpeed);
    
    }
  }

  updateBars(newValue) {
    this.setState({bars: newValue});
    this.resetArray();
  }

  updateSpeed(newValue) {
    this.setState({sortingSpeed: newValue});
  }

  render() {
    const {array} = this.state;
    const {inSort} = this.state;
    console.log(inSort);
    const maxHeight = Math.max(...array); // find max height in array, later used to offset all bars to align array vertically
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
          <div className="slider">Number of bars: <Slider defaultValue={100} step={5} min={10} max={200} valueLabelDisplay="auto" onChange={(event, value) => this.updateBars(value)}/></div>
          <div className="slider">Sorting speed interval (higher is slower): <Slider defaultValue={5} step={1} min={1} max={20} valueLabelDisplay="auto" onChange={(event, value) => this.updateSpeed(value)}/></div>
        </div>
        <div className="button-list">
            <Button variant="contained" onClick={() => this.resetArray()}>Generate New Array </Button>
            <Button variant="contained" onClick={() => this.mergeSort()}>Merge Sort </Button>
            <Button variant="contained" onClick={() => this.quickSort()}>Quick Sort </Button>
            <Button variant="contained" onClick={() => this.heapSort()}>Heap Sort </Button>
            <Button variant="contained" onClick={() => this.bubbleSort()}>Bubble Sort </Button>
            <Button variant="contained" onClick={() => this.insertionSort()}>Insertion Sort </Button>
            <Button variant="contained" onClick={() => this.selectionSort()}>Selection Sort </Button>
        </div>
      </>
    );
  }
    
}

function randIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}