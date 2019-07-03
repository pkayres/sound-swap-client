import React, { Component } from 'react';
import {Redirect} from 'react-router'
import { Card, Image, Button, Grid, Divider, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class ShowPage extends Component {

  rentClick = (listing_id) => {
    this.props.rentInstrument(listing_id)
    this.props.history.push(`/users/${this.props.currentUser.id}`)
  }

  render() {

    return (
      <div>
        {
          this.props.listings.map(listing => {
            if(listing.id === parseInt(this.props.match.params.id)){
            return <Grid columns={1} stackable className="fill-content">
              <Grid.Row stretched>
              <Grid.Column >
                <div class="ui card">
                  <div class="content">
                    <a class="header">{listing.instrument_name}</a>
                  </div>
                  <div class="image">
                    <img src={listing.image}/>
                  </div>
                </div>
                 <Card >
                   <Card.Content>
                     <Card.Description>
                       <h3>Price/per day: ${listing.price}</h3>
                       <h3>Description</h3>
                       <p>{listing.description}</p>
                       <h3>Owner Notes:</h3>
                       <p>{listing.user_notes}</p>
                       </Card.Description>
                     </Card.Content>
                   </Card>
              </Grid.Column>
              <Divider vertical/>
              <Grid.Column>
                {
                  listing.rented
                  ?
                  <Button color="red">Not Available</Button>
                  :
                  <Button color="yellow" onClick={() => this.rentClick(listing.id)}>Rent!</Button>
                }
              </Grid.Column>
            </Grid.Row>
           </Grid>


          }

        })
      }
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
    ratings: state.ratings
  }
}

function mapDispatchToProps(dispatch){
  return {
    rentInstrument:(id) => {
      dispatch({ type: "RENT_INSTRUMENT", payload: id})
    },
    addToRentals:(rentObj) => {
      dispatch({ type: "ADD_TO_RENTALS", payload: rentObj })
    }


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)
