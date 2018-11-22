import * as React from 'react';
import {SprottyWrapper} from "sprotty-component";
import Collapsible from 'react-collapsible';
import {PackageContentContext} from '../App';

export interface SprottyProps {
  selectedNodeId?: string;
  onSelect?: (ids: string[]) => void;
  allowSelection: boolean;
  open?: boolean,
  showCollapsibleButton?: boolean
}

class Sprotty extends React.Component<SprottyProps & { knownTypes: Set<string> }, { open: boolean }> {

  private readonly sprotty:React.RefObject<SprottyWrapper>;

  constructor(props:any) {
    super(props);
    this.sprotty = React.createRef();
    this.state = {
      open: props.open !== undefined ? props.open : false
    }
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
    const { showCollapsibleButton } = this.props;
    return (
      <Collapsible
        trigger={
          this.state.open ? "Hide diagram" : "Show diagram"
        }
        open={this.state.open}
        onOpening={() => this.setState({ open: true })}
        onClosing={() => this.setState({ open: false })}
        triggerStyle={{
          float: 'right',
          cursor: 'pointer',
          display: 'inline-block',
          lineHeight: 1,
          fontWeight: 700,
          letterSpacing: 'normal',
          border: '2px solid #9b9b9b',
          backgroundColor: '#fff',
          padding: '5px 11px',
          color: '#4c4c4c',
          textDecoration: 'none',
          marginTop: 10,
          visibility: showCollapsibleButton ? 'visible' : 'hidden'
        }}
      >
        <div data-app="class-diagram" className="center content">
          <sprotty-wrapper ref={this.sprotty}></sprotty-wrapper>
        </div>
      </Collapsible>
    );
  }

  private handleSelect =(nodeid:string): void => {
    if (this.sprotty.current) {
      this.sprotty.current.selection = [nodeid];
    }
  }
}

export default React.forwardRef((props: SprottyProps, _ref: any) => (
  <PackageContentContext.Consumer>
    {
      knownTypes => (
        <Sprotty {...props} knownTypes={knownTypes} />
      )
    }
  </PackageContentContext.Consumer>
));
