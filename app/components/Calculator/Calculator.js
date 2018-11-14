import './Calculator.scss';

import React from 'react';
import { hot } from 'react-hot-loader';

class AutoShirnkingText extends React.Component {
  render() {
    return <div {...this.props}/>
  }
}

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '0',
    waitingForOperaned: false,
    operator: null,
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperaned } = this.state;
    
    if (waitingForOperaned) {
      this.setState({
        displayValue: String(digit),
        waitingForOperaned: false
      })
    } else {
     this.setState({
      displayValue: displayValue === '0' ? String(digit) : displayValue + digit
     })
    }
  }

  inputDot(dot) {
    const { displayValue, waitingForOperaned } = this.state;
    if (waitingForOperaned) {
      this.setState({
        displayValue: String(dot),
        waitingForOperaned: false
      })
    }
    else if (displayValue.indexOf('.') === -1) {
      this.setState({
      displayValue: displayValue + dot
      })
    }
  }

  clearDisplay() {
    const { displayValue } = this.state;

    this.setState({
      displayValue: '0'
    })
  }

  toggleSign() {
    const { displayValue } = this.state;
    
    this.setState({
        displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  inputPercent() {
    const { displayValue } = this.state;
    let value = parseInt(displayValue);

    this.setState({
      displayValue: String(value / 100)
    })
  }

  performOperation(nextOperator) {
    const { displayValue, operator, value } = this.state;
    const nextValue = parseFloat(displayValue);

    const operations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue
    }

    if ( value === null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const prevValue = value || 0
      const computedValue = operations[operator](prevValue, nextValue);
      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }
  this.setState({
      waitingForOperaned: true,
      operator: nextOperator
      })
 
  }
  
  render() {
    const { displayValue } = this.state;
    return (
      
      <div className="calculator">
        <div className="calculator-display auto-scaling-div">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">

            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={()=> this.clearDisplay()}>AC</button>
              <button className="calculator-key key-sign" onClick={()=> this.toggleSign()}>+/-</button>
              <button className="calculator-key key-percent" onClick={()=> this.inputPercent()}>%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={()=> this.inputDigit(0)}>0</button>
              <button className="calculator-key key-dot" onClick={()=> this.inputDot('.')}>.</button>
              <button className="calculator-key key-1" onClick={()=> this.inputDigit(1)}>1</button>
              <button className="calculator-key key-2" onClick={()=> this.inputDigit(2)}>2</button>
              <button className="calculator-key key-3" onClick={()=> this.inputDigit(3)}>3</button>
              <button className="calculator-key key-4" onClick={()=> this.inputDigit(4)}>4</button>
              <button className="calculator-key key-5" onClick={()=> this.inputDigit(5)}>5</button>
              <button className="calculator-key key-6" onClick={()=> this.inputDigit(6)}>6</button>
              <button className="calculator-key key-7" onClick={()=> this.inputDigit(7)}>7</button>
              <button className="calculator-key key-8" onClick={()=> this.inputDigit(8)}>8</button>
              <button className="calculator-key key-9" onClick={()=> this.inputDigit(9)}>9</button>
            </div>
          </div>
          <div className="operator-keys">
              <button className="calculator-key key-divide" onClick={()=> this.performOperation('/')}>/</button>
              <button className="calculator-key key-multiply" onClick={()=> this.performOperation('*')}>X</button>
              <button className="calculator-key key-subtract" onClick={()=> this.performOperation('-')}>-</button>
              <button className="calculator-key key-add" onClick={()=> this.performOperation('+')}>+</button>
              <button className="calculator-key key-equals" onClick={()=> this.performOperation('=')}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(Calculator);
