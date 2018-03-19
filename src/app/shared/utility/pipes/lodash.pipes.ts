import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'map'})
export class LodashMapPipe implements PipeTransform {
  public transform(collection: any, property: string): any {
    const result: any = _.map(collection, property);
    return result;
  }
}

@Pipe({name: 'get'})
export class LodashGetPipe implements PipeTransform {
  public transform(collection: any, path: string): any {
    return _.get(collection, path);
  }
}

@Pipe({name: 'filter'})
export class LodashFilterPipe implements PipeTransform {
  public transform(collection: any, property: string, value: any): any {
    return _.filter(_.clone(collection), (o: any) => {
      let comparable: any = _.get(o, property);
      if (_.isString(value)) {
        comparable = _.toString(comparable);
      }
      return value ? comparable === value : !!o[property];
    });
  }
}

@Pipe({name: 'find'})
export class LodashFindPipe implements PipeTransform {
  public transform(collection: any, property: string, value: any): any {
    return _.find(_.clone(collection), (o: any) => {
      let comparable: any = _.get(o, property);
      if (_.isString(value)) {
        comparable = _.toString(comparable);
      }
      return value ? comparable === value : !!o[property];
    });
  }
}

@Pipe({name: 'size'})
export class LodashSizePipe implements PipeTransform {
  public transform(collection: any): any {
    return _.size(collection);
  }
}

@Pipe({name: 'groupBy'})
export class LodashGroupByPipe implements PipeTransform {
  public transform(collection: any, value: string): any {
    return _.groupBy(collection, value);
  }
}

@Pipe({name: 'sortBy'})
export class LodashSortByPipe implements PipeTransform {
  public transform(collection: any, value: string): any {
    return _.sortBy(collection, (o: any) => {
      return ('' + o[value]).toLowerCase();
    });
  }
}

@Pipe({name: 'chunk'})
export class LodashChunkPipe implements PipeTransform {
  public transform(collection: any, size: number): any {
    return _.chunk(collection, size);
  }
}

@Pipe({name: 'keys'})
export class LodashKeysPipe implements PipeTransform {
  public transform(object: any): any {
    return _.keys(object);
  }
}
