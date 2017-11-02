import React from 'react';
//import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Yelp from './util/Yelp.js';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        businesses: []
    }
    this.searchYelp = this.searchYelp.bind(this);

    console.log("se inicializa el state de businesses ++++++++++++++++++++ INICIO");
    console.log(this.state.businesses)
    console.log("se inicializa el state de businesses ++++++++++++++++++++ FIN");
  }


  searchYelp(term, location,  sortBy){
    //console.log("Searching Yelp with "+term+", "+location+","+sortBy)
    Yelp.search(term, location, sortBy).then(businesses => this.setState({
        businesses: businesses    
    }));
  }

  render() {
    return (
        <div className="App">
          <h1>ravenous man</h1>
          <SearchBar searchYelp={this.searchYelp} />
          <BusinessList businesses={this.state.businesses} /> 
        </div>
    );//return
  }//render
}

export default App;
