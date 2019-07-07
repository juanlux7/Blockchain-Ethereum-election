import React, { Component } from "react";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./utils/getWeb3";
import { Image, Reveal, Button, Modal, Header, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import NewCandidate from "./components/newCandidate.js";
import Results from "./components/Results.js";
import HelpComponent from "./components/Help.js";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    candidatesCount: 0,
    manager: "",
    totalVoters: 36800000,
    candidates: [],
    totalVotes: 0,
    blankVotes: 0,
    candidateVotes: 0,
    showingCandidateVotes: {}
  };

  constructor(props) {
    super(props);
    this.addCandidate = this.addCandidate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getCandidates = this.getCandidates.bind(this);
    this.onVote = this.onVote.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address
      );

      const candidatesCount = await instance.methods.candidatesCount().call();

      //hardcoded manager address of the contract
      const managerAddress = "0x49C11e6A67d79b3dFb9319d35c99C0D01395Ea0d";

      const candidatesList = await instance.methods.getCandidates().call();

      const totalVotes = await instance.methods.totalVotes().call();

      const blankVotes = await instance.methods.blankVotes().call();

      this.setState({
        web3,
        accounts,
        contract: instance,
        candidatesCount: candidatesCount,
        manager: managerAddress,
        candidates: candidatesList,
        totalVotes: totalVotes,
        blankVotes: blankVotes
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  addCandidate = async (name, party, photo, description) => {
    const { accounts, contract } = this.state;

    await contract.methods
      .addCandidate(name, party, photo, description)
      .send({ from: accounts[0] });

    window.location.href = "/";
  };

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getCandidates() {
    const { contract } = this.state;

    contract.methods
      .getCandidates()
      .call()
      .then(candidates => {
        this.setState({
          candidates: candidates
        });
      });
  }

  async onVote(id) {
    await this.state.contract.methods
      .vote(id)
      .send({ from: this.state.accounts[0] });

      window.location.href = "/";
  }

  async seeVotes(id) {
    // with this method i am just accessing the mapping to see the number of votes, not voting
    const countOfVotes = await this.state.contract.methods.voteCandidate(id).call();
    this.setState({
      candidateVotes: countOfVotes,
      showingCandidateVotes: {
        id: id
      }
    })

  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const RevealExampleMoveRight = photo => (
      <Reveal animated="move right">
        <Reveal.Content visible>
          <Image src={photo} size="medium" />
        </Reveal.Content>
        <Reveal.Content hidden>
          <Image src={photo} size="medium" />
        </Reveal.Content>
      </Reveal>
    );

    const ModalModalExample = (name, photo, description) => (
      <Modal trigger={<Button>Show more info</Button>}>
        <Modal.Header>Candidate's info</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={photo} />
          <Modal.Description>
            <Header>{name}</Header>
            <p />
            <p>{description}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );

    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <div className="App ui stackable container">
                <div className="vote-image">
                  <img
                    style={{ width: "100%", height: "250px" }}
                    src="https://s3.ca-central-1.amazonaws.com/ehq-production-canada/projects/images/2353fb6a4b9d1ab984f530ba5f596c2e062140ca/000/004/944/original/Election-sign-bylaw-CO-Banner.jpg?1517505929"
                    alt=""
                  />
                </div>
                <Divider horizontal>Live Statistics</Divider>
                <div class="ui small statistics">
                  <div class="ui statistic">
                    <div class="value">{this.state.candidatesCount}</div>
                    <div class="label">Number of candidates</div>
                  </div>
                  <div class="ui statistic">
                    <div class="value">{this.state.totalVoters}</div>
                    <div class="label">Number of voters</div>
                  </div>
                  <div class="ui statistic">
                    <div class="value">{this.state.totalVotes}</div>
                    <div>{(this.state.totalVotes / this.state.totalVoters) * 100} %</div>
                    <div class="label">Total Number of registered voters</div>
                  </div>
                  <div class="ui statistic">
                    <div class="value">{this.state.totalVoters - this.state.totalVotes}</div>
                    <div>
                      {((this.state.totalVoters - this.state.totalVotes) / this.state.totalVoters) * 100} %
                    </div>
                    <div class="label">Total Abstentions</div>
                  </div>
                  <div class="ui statistic">
                    <div class="value">{this.state.blankVotes}</div>
                    <div>{ (this.state.blankVotes / this.state.totalVotes) * 100 } %</div>
                    <div class="label">Number of blank votes</div>
                  </div>
                </div>
                <br/>
                <Divider horizontal>List of Candidates</Divider>
                <br/>

                <div style={{ textAlign: "center " }} className="ui grid">
                  {this.state.candidates.length > 0
                    ? this.state.candidates.map(cand => {
                        return (
                          <React.Fragment>
                            <div className="three wide column">
                              <div className="ui link card">
                                <div className="image">
                                  {RevealExampleMoveRight(cand.photo)}
                                </div>
                                {ModalModalExample(
                                  cand.name,
                                  cand.photo,
                                  cand.description
                                )}
                                <h2>{cand.name}</h2>
                                <button onClick={() => this.seeVotes(cand.id)} className="ui button">Check number of votes of this candidate</button>
                                {this.state.showingCandidateVotes.id === cand.id ? this.state.candidateVotes : ""}
                                <h3>{cand.party}</h3>
                                <button
                                  onClick={() => this.onVote(cand.id)}
                                  className="ui blue button"
                                >
                                  Vote
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })
                    : "click the button to show the candidates"}
                </div>
              </div>
            </Route>
          </Switch>
          <Route
            path="/add"
            exact
            component={() => <NewCandidate formData={this.addCandidate} />}
          />

          <Route
            path="/results"
            exact
            component={() => (
              <Results candidatesCount={this.state.candidatesCount} />
            )}
          />

          <Route path="/help" exact component={HelpComponent} />
        </Router>
      </div>
    );
  }
}

export default App;
