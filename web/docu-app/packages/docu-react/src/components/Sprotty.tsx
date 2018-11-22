import * as React from 'react';
import {SprottyWrapper} from "sprotty-component";
import {PackageContentContext} from '../App';

export interface SprottyProps {
  selectedNodeId?: string;
  onSelect?: (ids: string[]) => void;
  allowSelection: boolean;
}

class Sprotty extends React.Component<SprottyProps & { knownTypes: Set<string> }, any> {

  private readonly sprotty:React.RefObject<SprottyWrapper>;

  constructor(props:any) {
    super(props);
    this.sprotty = React.createRef();
  }

  componentDidMount() {
    // TODO hard coded file name
    fetch('graph.json')
      .then(resp => resp.json())
      .then(graph => {
        if (this.sprotty.current) {
          this.sprotty.current.model = graph;
          this.sprotty.current.supportSelection = this.props.allowSelection;
          this.sprotty.current.subscribeToSelection(selectedElements => {
            if (selectedElements.length > 0 && this.props.knownTypes.has(selectedElements[0].id)) {
              this.setState({selectedElements});
              if (this.props.onSelect) {
                this.props.onSelect(selectedElements.map(el => el.id));
              }
            }
          });
          setTimeout(() => {
            if (this.sprotty.current && this.props.selectedNodeId) {
              this.sprotty.current.selection = [this.props.selectedNodeId]
            }
          }, 1000);
        }
      });
  }


  componentDidUpdate(prevProps: SprottyProps) {
    if (prevProps.selectedNodeId !== this.props.selectedNodeId && this.props.selectedNodeId) {
      this.handleSelect(this.props.selectedNodeId);
    }
  }

  render() {
    return (
      <div data-app="class-diagram" className="center content">
        <sprotty-wrapper ref={this.sprotty}></sprotty-wrapper>
      </div>
    );
  }

  private handleSelect =(nodeid:string): void => {
    if (this.sprotty.current) {
      this.sprotty.current.selection = [nodeid];
    }
  }
}

export default React.forwardRef((props: SprottyProps) => (
  <PackageContentContext.Consumer>
    {
      knownTypes => (
        <Sprotty {...props} knownTypes={knownTypes} />
      )
    }
  </PackageContentContext.Consumer>
));
