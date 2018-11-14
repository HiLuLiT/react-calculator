import React from 'react';
import { hot } from 'react-hot-loader';

class AutoShrink extends React.Component {
  state ={
    scale: 1
  }
  
  componentDidUpdate() {
    const {scale} = this.state;

    const node = this.node;
    const parentNode = node.parentNode;

    const avilableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = avilableWidth / actualWidth;

    // since setting state in componentDidUpdate, this will prevent looping
    if (scale === actualScale) {
      return;
    }

    if (actualScale < 1) {
      this.setState({
        scale: actualScale
      })
    } else if ( scale < 1) {
      this.setState({
        scale: 1
      }) 
    }

  }

  render() {
    const {scale} =  this.state;
    return (
    <div 
    {...this.props} 
    style={{transform: `scale(${scale},${scale})`}}
    ref={ node=> this.node = node }/>
    )
  }
}
export default hot(module)(AutoShrink);
