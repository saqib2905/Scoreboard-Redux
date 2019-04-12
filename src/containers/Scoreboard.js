import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PlayerActionCreators from '../actions/player';

import Header from '../components/Header';
import Player from '../components/Player';
import AddPlayerForm from '../components/AddPlayerForm';


class Scoreboard extends Component {

  static propTypes = {
    players: PropTypes.array.isRequired
  };

  render() {
    const {dispatch, players} = this.props;
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch);
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);

    const playerComponents = players.map( (player, index) => {
      return(

        <Player 
          index = {index}
          key = {index}
          name = {player.name}
          score = {player.score}
          removePlayer = {removePlayer}
          updatePlayerScore = {updatePlayerScore}
          
        />
      );
    });
    return (
      <div className="scoreboard">
        <Header players={players} />
        <div className="players">
          {playerComponents}
        </div>
        <AddPlayerForm addPlayer ={addPlayer} />
      </div>
    );
  }
};
const mapStateToProps = state => {
  return {
    players : state
  };
}

export default connect (mapStateToProps)(Scoreboard);
