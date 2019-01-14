import "@webcomponents/custom-elements/src/native-shim";
import './diagram.css';
import 'sprotty/css/sprotty.css';
import "reflect-metadata";
import {
  ActionHandlerRegistry,
  IActionHandler,
  IModelFactory,
  LocalModelSource,
  SelectAction,
  SelectCommand,
  SModelElement,
  SModelIndex,
  SModelRoot,
  TYPES,
  Selectable,
  isSelectable,
  SModelRootSchema,
  MouseListener,
  IActionDispatcher,
  CenterAction,
  FitToScreenAction
} from "sprotty/lib";
import createContainer from "./di.config"
import { toArray } from "sprotty/lib/utils/iterable";

/**
 * Configuration element that associated a custom element with a selector string.
 */
interface CustomElementConfig {
  selector: string;
}

/**
 * Annotation that registered the given config and class as a custom element
 * @param {CustomElementConfig} config the configuration object for the custom element
 * @constructor
 */
// Usage as decorator
// tslint:disable:variable-name
const CustomElement = (config: CustomElementConfig) => (cls: any) => {
  // tslint:enable:variable-name
  if (customElements.get(config.selector)) {
    return;
  }
  customElements.define(config.selector, cls);
};


@CustomElement({
  selector: 'sprotty-wrapper'
})
export class SprottyWrapper extends HTMLElement {
  private selectionListener: SelectionEventListner;
  private root: SModelRoot;
  private graph: SModelRootSchema;
  private actionDispatcher: IActionDispatcher;
  private _withSelectionSupport: boolean;
  private doubleClickListener: DoubleClickListener;
  /**
   * Called when this element is inserted into a document.
   */
  connectedCallback(): void {
    const div = document.createElement('div');
    div.id = 'sprotty';
    this.appendChild(div);
    this.render();
    window.setTimeout(() =>
      this.actionDispatcher.dispatch(new FitToScreenAction(this.allSelectableElements(), 10, undefined, true)), 500);
  }
  subscribeToSelection(selectionEventListner: SelectionEventListner) {
    this.selectionListener = selectionEventListner;
    this.render();
  }
  subscribeToDoubleClick(doubleClickListener: DoubleClickListener) {
    this.doubleClickListener = doubleClickListener;
    this.render();
  }
  private _selection: SelectableModelElements[] = [];
  get selection(): string[] {
    return this._selection.map(e => e.id);
  }
  set selection(selection: string[]) {
    const isSameSelection =
      this._selection.length === selection.length &&
      this._selection.reduce((acc, el, i) => acc && el.id === selection[i], true);
    if (!isSameSelection) {
      const allSelectableElements = this.allSelectableElements();
      selection.forEach(element => allSelectableElements.splice(allSelectableElements.indexOf(element)));
      this.actionDispatcher.dispatchAll([new CenterAction(selection), new SelectAction(selection, allSelectableElements)]);
      this._selection = getIdsToSModelElement(selection, this.root.index);
    }
  }
  set model(model: any) {
    this.graph = model;
  }
  set supportSelection(supportSelection: boolean) {
    this._withSelectionSupport = supportSelection;
  }
  private render() {
    if (this.graph) {
      const container = createContainer('sprotty', this._withSelectionSupport);

      // Run
      const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
      modelSource.setModel(this.graph);

      const modelFactory = container.get<IModelFactory>(TYPES.IModelFactory);
      this.root = modelFactory.createRoot(this.graph);

      this.actionDispatcher = container.get<IActionDispatcher>(TYPES.IActionDispatcher);

      if (this.root instanceof SModelRoot && this.selectionListener) {
        const actionHandlerRegistry = container.get<ActionHandlerRegistry>(TYPES.ActionHandlerRegistry);
        actionHandlerRegistry.register(SelectCommand.KIND, new SelectionHandler(this.selectionListener, this.root, newSelection => this.selection = newSelection));
      }

      if (this.root instanceof SModelRoot && this.doubleClickListener) {
        container.bind(TYPES.MouseListener).toConstantValue(new DoubleClickHandler(this.doubleClickListener));
      }
    }
  }
  private allSelectableElements(): string[] {
    return toArray(this.root.index.all().filter(e => isSelectable(e)).map(e => e.id));
  }
}
export type SelectableModelElements = SModelElement & Selectable;
export type SelectionEventListner = (selectedElementsIDs: SelectableModelElements[]) => void;
export type DoubleClickListener = (target: SModelElement) => void;
export type SelectionSync = (selectedElementsIDs: string[]) => void;
class SelectionHandler implements IActionHandler {

  constructor(private selectonListener: SelectionEventListner,
              private root: SModelRoot,
              private selectionSync: SelectionSync) {}

  handle(action: SelectAction): void {
    this.selectionSync(action.selectedElementsIDs);
    this.selectonListener(getIdsToSModelElement(action.selectedElementsIDs, this.root.index));
  }
}

class DoubleClickHandler extends MouseListener {

  constructor(private doubleClickListener: DoubleClickListener) {
    super();
  }

  doubleClick(target: SModelElement, event: WheelEvent) {
    this.doubleClickListener(target);
    return [];
  }
}

const getIdsToSModelElement = (ids: string[], modelIndex: SModelIndex<SModelElement>): SelectableModelElements[] => {
  const elements = ids.map(id => modelIndex.getById(id));
  const existing: SelectableModelElements[] = [];
  elements.forEach(v => { if (v !== undefined && isSelectable(v)) existing.push(v) });
  return existing;
}