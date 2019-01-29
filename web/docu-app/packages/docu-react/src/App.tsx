import * as React from 'react';
import 'sprotty-component/lib/wrapper';
import {HashRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import {ENamedElement, Resource} from "./types";
import DocPage from "./components/DocPage";
import {getTypes} from "./util";
import IndexPage from "./components/Index";
import JumpTo from './components/JumpTo';
import {UnregisterCallback} from "history";

interface AppState {
  resource?: Resource;
}

export const PackageContentContext = React.createContext(new Set<string>());

const GenerateRoutes = ({ resource }: { resource: Resource }) => {
  const packages = Object.keys(resource).map(key => resource[key]);
  return (
    <PackageContentContext.Provider value={getTypes(packages)}>
      <JumpTo title='All Packages' toc={packages.map(p => p.name)} absoluteLink={true} />
      <Switch>
        <Route path="/" exact render={() => (<IndexPage ePackage={packages[0]}/>)} />
        {
          packages.map(ePackage => (
            <Route key={ePackage.name} path={"/"+ePackage.name} exact render={() => (<IndexPage ePackage={ePackage}/>)} />
          ))
        }
        {
          packages.map(ePackage => (ePackage.classes || []).concat(ePackage.dataTypes || []).concat(ePackage.enums || []).map((el: ENamedElement) => (
            <Route
              key={ePackage.name + "/" + el.name}
              path={"/" + ePackage.name + "/" + el.name + "/"}
              render={() => (
                <DocPage
                  ePackage={ePackage}
                  eClassifier={el}
                />
              )}
            />
            )
          ))
        }
        <Route path={"*"} component={() => <h1>Sorry, but the requested page does not exist!</h1>} />
      </Switch>
    </PackageContentContext.Provider>
  )
}

export interface DocuAppWindow extends Window {
  __docu_app_model__: any;
  __docu_app_graph__: any;
}

class App extends React.Component<any, AppState> {

  private readonly unregisterListener: UnregisterCallback;

  constructor(props: any) {
    super(props);
    this.state = {
      resource: undefined,
    };

    this.unregisterListener = this.props.history.listen((location: any) => {
      if (this.state.resource) {
        const pathname = location.pathname;
        document.title = pathname.split("/").filter((f: string) => f.length > 1).join(" - ");
      }
    })
  }

  componentWillUnmount() {
    this.unregisterListener();
  }

  componentDidMount() {
    const resource = (window as DocuAppWindow).__docu_app_model__;
    this.setState({ resource }, () => {
      // see according index route package value
      document.title = Object.keys(resource)[0]
    });
  }

  public render() {
    if (this.state.resource === undefined) {
      return <div>No package loaded</div>
    }

    return (
      <Router>
        <GenerateRoutes resource={this.state.resource} />
      </Router>
    );
  }
}

export default withRouter(App);
