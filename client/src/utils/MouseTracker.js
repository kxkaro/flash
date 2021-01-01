import React, { Component } from "react";
import { Img } from "react-image";

class Cat extends Component {
  render() {
    const mouse = this.props.mouse;
    const size = 100;

    const style = {
      position: "absolute",
      width: size,
      height: size,
      left: mouse.x - size / 2,
      top: mouse.y - size / 2,
    };

    return (
      <Img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPZzuDEGS99qEhuG_nz8SZBv9HTcF-vdfTjq3xWxOS1rRxhHnVPlQcfV7n-Q&amp;s"
        style={style}
      />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove} className={classes.height100vh}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
          The name can be different than 'render'
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}

export default MouseTracker;
