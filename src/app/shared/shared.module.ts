import { NgModule } from '@angular/core';
import {
  LodashChunkPipe, LodashFilterPipe, LodashFindPipe, LodashGetPipe,
  LodashGroupByPipe, LodashKeysPipe, LodashMapPipe, LodashSizePipe, LodashSortByPipe
} from './utility/pipes/lodash.pipes';


@NgModule({
  imports: [],
  declarations: [
    LodashMapPipe,
    LodashGetPipe,
    LodashFilterPipe,
    LodashFindPipe,
    LodashSizePipe,
    LodashGroupByPipe,
    LodashSortByPipe,
    LodashChunkPipe,
    LodashKeysPipe,
  ],
  exports: [
    LodashMapPipe,
    LodashGetPipe,
    LodashFilterPipe,
    LodashFindPipe,
    LodashSizePipe,
    LodashGroupByPipe,
    LodashSortByPipe,
    LodashChunkPipe,
    LodashKeysPipe,
  ],
  providers: []
})
export class SharedModule { }
