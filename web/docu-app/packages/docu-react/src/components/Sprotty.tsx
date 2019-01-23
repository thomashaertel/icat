import * as React from 'react';
import {SprottyWrapper} from "sprotty-component";
import Collapsible from 'react-collapsible';
import {DocuAppWindow, PackageContentContext} from '../App';

export interface SprottyProps {
  selectedNodeId?: string;
  onDoubleClick?: (ids: string[]) => void;
  open?: boolean,
  showCollapsibleButton?: boolean,
  ePackage:string
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
    if (this.sprotty.current) {
      // eslint-disable-line
      this.sprotty.current.model = (window as DocuAppWindow).__docu_app_graph__[this.props.ePackage];
      this.sprotty.current.subscribeToDoubleClick(target => {
        const id = target.id.split("_")[0];
        if (this.props.onDoubleClick && this.props.knownTypes.has(id)) {
          this.props.onDoubleClick([id]);
        }
      });

      if (this.sprotty.current && this.props.selectedNodeId) {
        this.sprotty.current.selection = [this.props.selectedNodeId]
      }
    }
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
        <div data-app="class-diagram" className="diagram">
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
