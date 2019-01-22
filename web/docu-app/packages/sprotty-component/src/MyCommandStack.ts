import { CommandStack, SModelRoot } from "sprotty/lib";
import { injectable } from "inversify";


export interface ModelLoadedListener {
    ():void;
}

@injectable()
export class MyCommandStack extends CommandStack{

    private listeners:ModelLoadedListener[] = [];
    
    addModelLoadedListener(listener:ModelLoadedListener){
        this.listeners.push(listener);
    }

    async update(model: SModelRoot): Promise<void> {
        if (this.viewer === undefined)
            this.viewer = await this.viewerProvider();
        this.viewer.update(model);
        if(model.children.length>0) {
            this.listeners.forEach(l => l());
            this.listeners = [];
        }
    }
}