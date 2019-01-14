import { SEdgeSchema } from "sprotty/lib";
import { ElkLayoutEngine } from "sprotty-elk/lib";
import { ElkEdge } from 'elkjs/lib/elk.bundled';

export class EdgeLabelProcessingLayoutEngine extends ElkLayoutEngine {
  protected applyEdge(sedge: SEdgeSchema, elkEdge: ElkEdge): void {
    super.applyEdge(sedge, elkEdge);
    if (elkEdge.labels && sedge.children) {
      for (let i = 0; i < elkEdge.labels.length; i++) {
        const elkLabel = elkEdge.labels[i];
        const sLabel = sedge.children[i];
        this.applyShape(sLabel, elkLabel);
      }
    }
  }
}