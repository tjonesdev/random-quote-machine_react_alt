import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const quotesArr = [
  {
    quote: "What can men do against such reckless hate?",
    author: "King Theodin (LOTR)",
    color: "rgb(159, 217, 228)"
  },
  {
    quote: "Maybe I'm born with it, or maybe it's Maybelline.",
    author: "Maybelline",
    color: "rgb(188, 159, 228)"
  },
  {
    quote: "Revelry in the dark.",
    author: "Tokoyami (My Hero Acadamia)",
    color: "rgb(103, 103, 103)"
  },
  {
    quote: "I eat a chip.",
    author: "NOT Light Yagami (Death Note)",
    color: "rgb(238, 180, 84)"
  },
  {
    quote: "Worse things have happened. I think we're gonna be fine.",
    author: "Tony Stark (Iron Man)",
    color: "rgb(63, 62, 126)"
  },
  {
    quote: "Just like the astronauts eat!",
    author: "Spongebob",
    color: "rgb(242, 170, 170)"
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium cursus nibh, non accumsan metus ultrices sit amet. Mauris vitae consectetur nisi. Aenean vitae lorem imperdiet, sollicitudin neque accumsan, vehicula tortor.",
    author: "Fake News",
    color: "red"
  }
];

function LandingPage(props) {
  return (
    <div className="landing-page" onClick={props.handleLandingClick}>
      <h1 className="title">
        Random&nbsp; <i class="far fa-comment"></i>uotes
      </h1>
      <div className="landing-btn">
        <p>
          Get
          <br />
          Quotes
        </p>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  );
}

function Quotes(props) {
  return (
    <div id="main" className="main-content">
      <div className="text-container">
        <div className="quote-container">
          <div className="quotation-mark quot-left">“</div>
          <p className="quote">{props.quote}</p>
          <div className="quotation-mark quot-right">”</div>
        </div>
        <div className="author-container">
          <p className="author">― {props.author} ―</p>
        </div>
      </div>
      <div className="new-quote-container">
        <button
          className="new-quote btn"
          onClick={props.onClick}
          style={{ color: props.color }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

function Footer(props) {
  let twitterURL =
    "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
    '"' +
    props.quote.replace(/\s/g, "%20") +
    '"%20' +
    "- " +
    props.author.replace(/\s/g, "%20") +
    "&url=tjonesdev.github.io";

  return (
    <div className="footer-container">
      <a className="tweet-quote btn" href={twitterURL} target="_blank">
        <i className="fab fa-twitter"></i>
        <span>Tweet This Quote</span>
      </a>
      <footer>
        <p>
          Design inspired by{" "}
          <a href="https://codepen.io/alexisreina/full/RrKVxg">Alexis Reina</a>{" "}
          and <a href="https://codepen.io/eevu/full/BoGMJm">Ivana</a>
        </p>
      </footer>
    </div>
  );
}

function Shuffle(array) {
  let i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let randArr;
let index = 0;

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);

    randArr = Shuffle(quotesArr);
    this.state = {
      quote: randArr[0].quote,
      author: randArr[0].author,
      color: randArr[0].color
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleLandingClick = this.handleLandingClick.bind(this);
  }

  handleClick() {
    if (index < randArr.length - 1) {
      index++;
    } else {
      randArr = Shuffle(randArr);
      index = 0;
    }
    this.setState({
      quote: randArr[index].quote,
      author: randArr[index].author,
      color: randArr[index].color
    });
    document.getElementById("main").scrollIntoView();
  }

  handleLandingClick() {
    document.getElementById("main").scrollIntoView();
  }

  handleKeyUp(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      if (index < randArr.length - 1) {
        index++;
      } else {
        randArr = Shuffle(randArr);
        index = 0;
      }
      this.setState({
        quote: randArr[index].quote,
        author: randArr[index].author,
        color: randArr[index].color
      });
    }
    document.getElementById("main").scrollIntoView();
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentDidUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    return (
      <div className="container" style={{ backgroundColor: this.state.color }}>
        <LandingPage handleLandingClick={this.handleLandingClick} />
        <Quotes
          quote={this.state.quote}
          author={this.state.author}
          onClick={this.handleClick}
          color={this.state.color}
        />
        <Footer quote={this.state.quote} author={this.state.author} />
      </div>
    );
  }
}

ReactDOM.render(<QuoteMachine />, document.getElementById("root"));
