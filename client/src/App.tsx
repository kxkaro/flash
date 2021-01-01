import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import Logout from "./pages/Logout";
import Landing from "./pages/Landing";
import Flash from "./pages/Flash";
import Flash2 from "./pages/Flash2";
import ScrollToTop from "./utils/ScrollToTop";
import { INITIAL_STATE, PATHS } from "./constants/data";
import { createStateData } from "./StateData";
import { Mode, State, User } from "./logic/types";
import { getRandom } from "./utils/numbers";
import { NEED_FOR_SPEED } from './constants/nfsData';

/*
  App routes are handled by react router. 
  Make sure the app uses the 'Link' or 'HashLink' components from ./utils/Link based on react-router-dom for all in-app paths.
  DO NOT USE THE ONE FROM MATERIAL-UI for in-app links!
  The one from router handles correctly all redirects from protected or guest pages. 
  The Link from material-ui does not handle client site routing.
*/
class App extends Component<{}, State> {
  timerID: any;
  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // Appearance
  setMode = (mode: Mode) => {
    this.setState({ mode });
  };

  // State and data methods
  setAppId = (appId: string) => {
    this.setState({ appId });
  };

  // Current background picture index
  setBackgroundIndex = (index: number) => {
    this.setState({ bgIndex: index });
  };

  // Update state data
  getData = async () => {
    const data = createStateData();
    this.setState({ data });
  };

  componentDidMount() {
    this.setBackgroundIndex(getRandom(6));
  }

  render() {
    const { root } = PATHS;

    return (
      <Router>
        <ScrollToTop>
          <Switch>
            {/*
                A Switch will iterate through all routes and return
                on the first match.
                The order matters - the most generic paths should
                be at the very end.
              */}
            <Route path={`/1/:id`}>
              <Flash
                mode={this.state.mode}
                setMode={this.setMode}
                data={this.state.data}
                getData={this.getData}
                bgIndex={this.state.bgIndex}
                setBgIndex={this.setBackgroundIndex}
              />
            </Route>
            <Route path={`/2/:id`}>
              <Flash2
                mode={this.state.mode}
                setMode={this.setMode}
                data={NEED_FOR_SPEED}
                // getData={this.getData}
              />
            </Route>
            <Route path={root}>
              <Landing mode={this.state.mode} setMode={this.setMode} />
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
