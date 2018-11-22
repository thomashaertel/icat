import * as React from 'react';
import 'sprotty-component/lib/wrapper';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {EPackage, ENamedElement} from "./types";
import DocPage from "./components/DocPage";
import {getTypes} from "./util";
import IndexPage from "./components/Index";

interface AppState {
  ePackage?: EPackage;
}

export const PackageContentContext = React.createContext(new Set<string>());

const GenerateRoutes = ({ ePackage }: { ePackage: EPackage }) => {
  const allFeatures = (ePackage.classes || []).concat(ePackage.dataTypes || []).concat(ePackage.enums || []);
  return (
    <PackageContentContext.Provider value={getTypes(ePackage)}>
      <Switch>
        <Route path="/" exact render={() => (<IndexPage ePackage={ePackage}/>)} />
        {
          allFeatures.map((el: ENamedElement) => (
            <Route
              path={"/" + el.name + "/"}
              render={() => (
                <DocPage
                  ePackage={ePackage}
                  eClassifier={el}
                />
              )}
            />
            )
          )
        }
        <Route path={"*"} component={() => <h1>Sorry, but the requested page does not exist!</h1>} />
      </Switch>
    </PackageContentContext.Provider>
  )
}


class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      ePackage: undefined,
    };
  }

  componentDidMount() {
    // TODO: hard-coded file name
    fetch('docu.json')
      .then(resp => resp.json())
      .then(json => this.setState({ ePackage: json as EPackage }))
  }

  public render() {
    if (this.state.ePackage === undefined) {
      return <div>No package loaded</div>
    }

    return (
      <Router>
        <GenerateRoutes ePackage={this.state.ePackage} />
      </Router>
    );
  }
}

export default App;
