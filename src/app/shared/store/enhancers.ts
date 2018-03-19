import { Injectable } from '@angular/core';

import { DevToolsExtension } from '@angular-redux/store';
import { navigationEnhancer } from '../navigation/api/state';


@Injectable()
export class Enhancers {
  constructor(
    private devTools: DevToolsExtension,
  ) {}

  public init() {
    const enhancers = [navigationEnhancer];

    if (this.devTools.isEnabled()) {
      enhancers.push(this.devTools.enhancer());
    }

    return enhancers;
  }
}
