import React, { Component } from 'react';
import AppBar from './appBar.js';
import AppLanding from './landing.js';
import _ from 'lodash';
class Home extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		filter: {},
  		styleList: []
  	};
  }

  setStyleList (styleList) {
  	this.setState({
  		styleList: styleList
  	});
  }

  filter(type, data) {
  	let filter = _.cloneDeep(this.state.filter);
  	if (type !== 'style' && type !== 'search') {
  		filter.sort = type;
  	} else if (type === 'style') {
  		filter.style = data;
  	} else if (type === 'search') {
  		filter.search = data;
  	}
  	this.setState({
  		filter: filter
  	});
  }

  render() {
    return (
     <div> 
       <AppBar filter={this.filter.bind(this)} styleList={this.state.styleList} />
       <AppLanding filterData={this.state.filter} setStyleList={this.setStyleList.bind(this)}/>
     </div>
    );
  }
}

export default Home;