// File: CricketGPT.js
import React, { Component } from "react";
import "./cricketgpt.css";

class CricketGPT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team1: "India",
      team2: "Australia",
      currentInnings: 1,
      team1Score: { runs: 0, wickets: 0 },
      team2Score: { runs: 0, wickets: 0 },
      balls: 0,
      overs: 0,
      maxOvers: 2,
      result: ""
    };
  }

  addBall = () => {
    this.setState((prevState) => {
      let newBalls = prevState.balls + 1;
      let newOvers = prevState.overs;

      if (newBalls === 6) {
        newOvers += 1;
        newBalls = 0;
      }

      const inningsScore =
        prevState.currentInnings === 1
          ? prevState.team1Score
          : prevState.team2Score;

      if (newOvers === prevState.maxOvers || inningsScore.wickets === 10) {
        this.switchInnings();
        return {};
      }

      return {
        balls: newBalls,
        overs: newOvers,
      };
    });
  };

  addRun = (runs) => {
    const key = this.state.currentInnings === 1 ? "team1Score" : "team2Score";
    this.setState((prevState) => ({
      [key]: {
        ...prevState[key],
        runs: prevState[key].runs + runs,
      },
    }));
    this.addBall();
  };

  addExtra = () => {
    const key = this.state.currentInnings === 1 ? "team1Score" : "team2Score";
    this.setState((prevState) => ({
      [key]: {
        ...prevState[key],
        runs: prevState[key].runs + 1,
      },
    }));
  };

  addWicket = () => {
    const key = this.state.currentInnings === 1 ? "team1Score" : "team2Score";
    this.setState((prevState) => {
      const newWickets = prevState[key].wickets + 1;

      if (newWickets === 10) {
        this.switchInnings();
        return {};
      }

      return {
        [key]: {
          ...prevState[key],
          wickets: newWickets,
        },
      };
    });
    this.addBall();
  };

  switchInnings = () => {
    if (this.state.currentInnings === 1) {
      this.setState({
        currentInnings: 2,
        overs: 0,
        balls: 0,
      });
    } else {
      const { team1Score, team2Score, team1, team2 } = this.state;
      let result = "";
      if (team1Score.runs > team2Score.runs) {
        result = `${team1} won by ${team1Score.runs - team2Score.runs} runs`;
      } else if (team2Score.runs > team1Score.runs) {
        result = `${team2} won by ${10 - team2Score.wickets} wickets`;
      } else {
        result = "Match Tied";
      }
      this.setState({ result });
    }
  };

  resetInnings = () => {
    this.setState({
      currentInnings: 1,
      team1Score: { runs: 0, wickets: 0 },
      team2Score: { runs: 0, wickets: 0 },
      balls: 0,
      overs: 0,
      result: " "
    });
  };

  render() {
    const {
      team1, team2, currentInnings, team1Score, team2Score,
      overs, balls, result, maxOvers
    } = this.state;

    const currentTeam = currentInnings === 1 ? team1 : team2;
    const currentScore = currentInnings === 1 ? team1Score : team2Score;

    return (
      <div className="Container">
      

        <div className="Border">
          <h2>{team1} vs {team2}</h2>

          <div className="setup">
            <label>
              <select value={team1} onChange={(e) => this.setState({ team1: e.target.value })}>
                <option value="">India</option>
              </select>
              -VS-
              <select value={team2} onChange={(e) => this.setState({ team2: e.target.value })}>
                <option value="">Australia</option>
              </select>
            </label>
            <label>Match Type:
              <select value={maxOvers} onChange={(e) => this.setState({ maxOvers: parseInt(e.target.value) })}>
                <option value={20}>T20 (20 overs)</option>
                <option value={50}>ODI (50 overs)</option>
                <option value={90}>Test (90 overs)</option>
              </select>
            </label>
          </div>

          <h3>Innings: {currentInnings} ({currentTeam} Batting)</h3>
          <h1>Score: {currentScore.runs} / {currentScore.wickets}</h1>
          <h3>Overs: {overs}.{balls}</h3>

          {result && <h2 className="result">{result}</h2>}

          <div className="buttons">
            <button onClick={() => this.addRun(1)} className="buttonedit">1 run</button>
            <button onClick={() => this.addRun(2)} className="buttonedit">2 runs</button>
            <button onClick={() => this.addRun(3)} className="buttonedit">3 runs</button>
            <button onClick={() => this.addRun(4)} className="buttonedit">4 runs</button>
            <button onClick={() => this.addRun(6)} className="buttonedit">6 runs</button>
            <button onClick={this.addExtra} className="buttonedit">Wide</button>
            <button onClick={this.addExtra} className="buttonedit">No Ball</button>
            <button onClick={this.addWicket} className="buttonedit">Wicket</button>
          </div>

          <button onClick={this.resetInnings} className="reset"><strong>Reset Match</strong></button>
        </div>
      </div>
    );
  }
}

export default CricketGPT;