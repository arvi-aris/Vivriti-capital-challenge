import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import DrinkIcon from '@material-ui/icons/LocalDrink';
import AddToCart from '@material-ui/icons/AddShoppingCart';
import Clear from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
class Bar extends Component {

  constructor(props){
    super(props);
    this.state = {
      beerList : [],
      cart: [] 
    }
  }

  componentDidMount() {
    axios.get('http://starlord.hackerearth.com/beercraft')
      .then(response => {
        let beerList = response.data;
        localStorage.setItem('masterData', JSON.stringify(beerList));
        console.log(beerList)
        beerList = beerList.slice(0,100);
        let styleList = ['Reset'];
        beerList.forEach(beer => {
          if(styleList.indexOf(beer.style) === -1) {
            styleList.push(beer.style);
          }
        })
        this.setState({
          beerList: beerList
        });
        this.loadCartData();
        this.props.setStyleList(styleList);
      });
  }

  loadCartData() {
    if(localStorage.getItem('cart')) {
      let cartData = JSON.parse(localStorage.getItem('cart'));
      this.setState({
        cart: cartData
      })
    }
  }

  addtoCart(beer) {
    let cartData = this.state.cart;
    let beerFromCart = cartData.find((addedbeer) => {
      if(addedbeer.id === beer.id) {
        return beer;
      }
    });
    if(!beerFromCart) {
      cartData.push({
        id: beer.id,
        name: beer.name,
        count:1
      });
    } else {
      beerFromCart.count++;
    }
    this.setState({
      cart: cartData
    });
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  removeFromCart(beerid) {
    let cartData = this.state.cart;
    let beerFromCart = cartData.find(addedbeer => {
      return addedbeer.id === beerid;
    });
    beerFromCart.count--;
    if (!beerFromCart.count) {
      cartData = cartData.filter(addedbeer => {
        return addedbeer.id !== beerid;
      });
    }
    this.setState({
      cart: cartData
    });
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  componentDidUpdate(prevProps, newProps) {
    if(!localStorage.getItem('masterData')) 
      return;
    let filteredList = JSON.parse(localStorage.getItem('masterData'));
    filteredList = filteredList.slice(0,100)
    let sort = this.props.filterData.sort;
    let style = this.props.filterData.style;
    let search = this.props.filterData.search;
    if (sort !== prevProps.filterData.sort || style !== prevProps.filterData.style) {
      if (style && style !== 'Reset') {
        filteredList = filteredList.filter(beer => {
          return beer.style === style;
        });
      }
      if (sort === 'up') {
        filteredList.sort((a,b) => {
          return Number(a.abv) - Number(b.abv);
        });
      } else if (sort === 'down') {
        filteredList.sort((a,b) => {
          return Number(b.abv) - Number(a.abv);
        });
      }
      this.setState({
        beerList: filteredList
      });
    } 
    else if (search !== prevProps.filterData.search) {
      search = search.trim();
      if(style && style !== 'Reset') {
        filteredList = filteredList.filter(beer => {
          return beer.style === style;
        });
      }
      if(search) {
        filteredList = filteredList.filter(beer => {
          return (new RegExp(search, 'gi').test(beer.name));
        });
      }
      this.setState({
        beerList: filteredList
      });
    }
  }

  render() {
    return(
      <div className="landing">
        <Grid container spacing={24}>
          <Grid item xs={9}>
            <Grid container spacing={24}>
            {this.state.beerList.map((beer, index) => {
              return (<Grid item xs={6} sm={4} key={beer.id}>
                        <Card className="beer-card">
                          <CardContent>
                            <List component="beer-info">
                              <ListItem>
                                <ListItemText className="beer-item" primary="Name" secondary={beer.name}/>
                              </ListItem>
                              <ListItem>
                                <ListItemText className="beer-item" primary="Style" secondary={beer.style}/>
                              </ListItem>
                              <ListItem>
                                <ListItemText className="beer-item" primary="ABV" secondary={beer.abv ? beer.abv : "NA"}/>
                              </ListItem>
                             <ListItem>
                                <ListItemText className="beer-item" primary="IBU" secondary={beer.ibu ? beer.ibu : "NA"}/>
                              </ListItem>
                             <ListItem>
                                <ListItemText className="beer-item" primary="Ounces" secondary={beer.ounces}/>
                              </ListItem>
                            </List>
                          </CardContent>
                          <CardActions>
                            <AddToCart size="small" className="add-to-cart" onClick={this.addtoCart.bind(this, beer)} />
                          </CardActions>
                        </Card>
                      </Grid>);
            })}
            </Grid>
          </Grid>
          <Grid item xs={3} className="cart-area">
            <Card className="cart-card">
              <CardContent>
                <List component="beer-info" subheader={<ListSubheader component='div' className='cart-header'>Cart</ListSubheader>}>
                  {this.state.cart.map((beer) => {
                    return( <ListItem key={beer.id}>
                      <ListItemText className="beer-item" primary={beer.name + ' (' + beer.count + ')'}/>
                      <ListItemIcon className="add-to-cart">
                        <Clear onClick={this.removeFromCart.bind(this, beer.id)}/>
                      </ListItemIcon>
                    </ListItem> ) })}
                  {!this.state.cart.length ? <div className="empty-cart"> Cart is empty. </div> : ''}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Bar;