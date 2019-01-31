/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import ElkConstructor from 'elkjs/lib/elk.bundled';
import { ContainerModule } from "inversify";
import { ElkFactory, ElkLayoutEngine } from "sprotty-elk/lib";
import { ConsoleLogger, LocalModelSource, LogLevel, TYPES } from "sprotty/lib";
import { MyCommandStack } from "./MyCommandStack";

  const sprottyWrapperModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    unbind(TYPES.ICommandStack);
    bind(MyCommandStack).toSelf().inSingletonScope();
    bind(TYPES.ICommandStack).toService(MyCommandStack);
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);
    
    bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
    const elkFactory: ElkFactory = () => new ElkConstructor({
      algorithms: ['layered'],
      defaultLayoutOptions: {
        'edgeLabels.placement': 'CENTER',
        'edgeLabels.sideSelection': 'ALWAYS_UP'
      }
    });
    bind(TYPES.IModelLayoutEngine).to(ElkLayoutEngine);
    bind(ElkFactory).toConstantValue(elkFactory);
  });

  export default sprottyWrapperModule;

