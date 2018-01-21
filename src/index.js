import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Student extends React.Component {

  render() {
    return (
      <div value={this.props.name} onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
}

class Welcome extends React.Component {
  render(){
    return <h1>Hello, {this.props.name}</h1>;
  };
}

//和上面的功能效果相同
// function Welcome(props){
//   return <h1>Hello, {props.name}</h1>;
// }
function formatDate(date){
  return date.toLocaleDateString();
}
function Avatar(props){
  return (
    <img
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
function UserInfo(props){
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props){
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>

  );
}

const comment = {
  author: {
    avatarUrl: 'http://i0.hdslb.com/bfs/archive/52fa2d4bb4e1d47d61653df3392e8b660d8fa309.jpg_320x200.jpg',
    name: '涛兄',
  },
  text: 'I hope you enjoy learning React!',
  date: new Date(),
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      name: "DouJ"
    };
  }

  renderStudent(id) {
    return (<Student name={this.state.name} onClick={() => this.changeName()}/>);
  }

  render() {
    // return (
    //   <div className="container">
    //     <Welcome name="Jason Zhang"/>
    //     {this.renderStudent(1)}
    //   </div>
    // );
    return (
      <Comment
        author={comment.author}
        text={comment.text}
        date={comment.date}
      />
    );
  }

  changeName() {
    this.setState({name: "Jason"});
  }
}

// ReactDOM.render(<Container />, document.getElementById('root'));

/*
  ################################################
      State and Lifecycle
  ################################################
*/

// function Clock(props){
//   return (
//     <div>
//       <h1>Hello, World</h1>
//       <h2>It is {props.date.toLocaleTimeString()}</h2>
//     </div>
//   );
// }

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  // 内置方法，不能改名 invoked immediately after a component is mounted
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
       1000);
  }
  // 内置方法，不能改名 invoked immediately before a component is unmounted and destroyed
  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState(
      {date: new Date()}
    );
  }

  render(){
    return (
        <div>
          <h1>Hello, World</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        </div>
      );
  };
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

// function tick(){
//   ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

/*
  ################################################
      Handling Events
  ################################################
*/