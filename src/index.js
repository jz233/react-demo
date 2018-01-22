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

// ReactDOM.render(
//   <Clock />,
//   document.getElementById('root')
// );

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
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isToggleOn: true,
    };
    // This binding is necessary to make `this` work in the callback
    // 会报错 Cannot read property 'setState' of undefined
    // Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(preState => ({
      isToggleOn: !preState.isToggleOn
    }));
  }

  render(){
    return(
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class LoggingButton extends React.Component {
  handleClick = () => {
    console.log('this is: ' + this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        click
      </button>
    );
  }

/*
  The problem with this syntax is that a different callback is created each time the LoggingButton renders. In most cases, this is fine.
  However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering.
  We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.
*/
  // handleClick() {
  //   console.log('this is: ' + this);
  // };
  //
  // render() {
  //   return (
  //     <button onClick={(e) => this.handleClick(e)}>
  //       click
  //     </button>
  //   );
  // }
}

// ReactDOM.render(
//   <LoggingButton />,
//   document.getElementById('root')
// );

/*
  ################################################
      Conditional Rendering
  ################################################
*/
function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
    return <UserGreeting />;
  }else{
    return <GuestGreeting />;
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

// ReactDOM.render(
//   <Greeting isLoggedIn={true} />,
//   document.getElementById('root')
// );

function LoginButton(props){
  return(
    <button onClick={props.onClick}>Log in</button>
  );
}

function LogoutButton(props){
  return(
    <button onClick={props.onClick}>Log out</button>
  );
}

class LoginControl extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false,
    };
  }
  handleLoginClick(){
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick(){
    this.setState({isLoggedIn: false});
  }

  render(){
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;

    // if(isLoggedIn){
    //   button = <LogoutButton onClick={this.handleLogoutClick} />;
    // }else{
    //   button = <LoginButton onClick={this.handleLoginClick} />;
    // }
    button = isLoggedIn ?
        (<LogoutButton onClick={this.handleLogoutClick} />):
        (<LoginButton onClick={this.handleLoginClick} />);

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }

}

// ReactDOM.render(
//   <LoginControl />,
//   document.getElementById('root')
// );

function MailBox(props){
  const unReadMessages = props.unReadMessages;
  return (
    <div>
      <h1>Hello</h1>
      {unReadMessages.length>0 &&
        <h2>You have {unReadMessages.length} unread message(s).</h2>
      }
    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];

// ReactDOM.render(
//   <MailBox unReadMessages = {messages} />,
//   document.getElementById('root')
// );

function WarningBanner(props){
  //Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods.
  //For instance, componentWillUpdate and componentDidUpdate will still be called.
  if(!props.warn){
    return null;
  }
  return(
    <div className="warning">
      Warning
    </div>
  );
}

class Page extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showWarning: true
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick(){
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render(){
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning? 'Hide' : 'Show'}
        </button>
      </div>

    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);








// #################################################################################################
