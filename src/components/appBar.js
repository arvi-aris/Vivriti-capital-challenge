import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.png'
import Grid from '@material-ui/core/Grid';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import Filterlist from '@material-ui/icons/FilterList';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';

class Bar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedStyle: null
    };
  } 

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  filterData(type, data) {
   if(type === 'style') {
    this.setState({
      selectedStyle: data,
      anchorEl: null
    });
   }
   this.props.filter(type, data);
  }

  search(event) {
    let searchtext = event.target.value;
    this.props.filter('search', searchtext);
  }

  render() {
    console.log(logo)
    return(
      <div className="bar">
      <AppBar position="static" color="primary">
        <Toolbar>
        <Grid container spacing={24} className="bar-grid">
          <Grid item xs={1} className="bar-grid">
            <img className="logo" src={logo} /> &nbsp;
          </Grid>
          <Grid item xs={2} className="bar-grid">
            <Typography variant="title" color="inherit">
              <div className="bar-header title">
                Vivriti Crafts Beer
              </div>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <SearchIcon/> <TextField onChange={this.search.bind(this)}/>
          </Grid>
          <Grid item xs={3} className="bar-grid">
            <Tooltip id="up" title="Sort from low to high in alchohol content"><IconButton color="secondary"><ArrowUp className="tool-icon" onClick={this.filterData.bind(this, 'up')}/></IconButton></Tooltip>
            <Tooltip id="down" title="Sort from high to low in alchohol content"><IconButton color="secondary"><ArrowDown className="tool-icon" onClick={this.filterData.bind(this, 'down')} /></IconButton></Tooltip>
            {this.props.styleList && this.props.styleList.length ? <IconButton onClick={this.handleClick} color="secondary"><Filterlist className="tool-icon" /></IconButton> : ''}
            <a href="https://www.linkedin.com/in/aravindh-nagarajan-58b91191/" target="_blank" ><IconButton color="secondary"> <Person /> </IconButton></a>
          </Grid>
          <Grid item xs={2}>
            {this.state.selectedStyle && this.state.selectedStyle !== 'Reset' ?  <Chip
                label={this.state.selectedStyle.length > 15 ? this.state.selectedStyle.slice(0,15)+'...' : this.state.selectedStyle}
                onDelete={this.filterData.bind(this, 'style', 'Reset')}
              /> : ''}
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
      <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.styleList.map((style, index) => <MenuItem key={index} onClick={this.filterData.bind(this, 'style', style)}> {style} </MenuItem> )}
        </Menu>
      </div>
    )
  }
}

export default Bar;