import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { Action, AnyAction } from 'redux';
import { featureId } from '../index';

@Injectable()
export class ToDoActions {
  static readonly OVERVIEW_ACTIVATED = featureId + '/OVERVIEW_ACTIVATED';
  static readonly OVERVIEW_DEACTIVATED = featureId + '/OVERVIEW_DEACTIVATED';
  static readonly DETAIL_VIEW_ACTIVATED = featureId + '/DETAIL_VIEW_ACTIVATED';
  static readonly DETAIL_VIEW_DEACTIVATED = featureId +
    '/DETAIL_VIEW_DEACTIVATED';
  static readonly DETAIL_DATA_RECEIVED = featureId + '/DETAIL_DATA_RECEIVED';
  static readonly COLLECTION_DATA_RECEIVED = featureId +
    '/COLLECTION_DATA_RECEIVED';
  static readonly ADD_TAG = featureId + '/ADD_TAG';
  static readonly REMOVE_TAG = featureId + '/REMOVE_TAG';
  static readonly RESET_TAGS = featureId + '/RESET_TAGS';
  static readonly CREATE_TODO = `${featureId}/CREATE_TODO`;
  static readonly UPDATE_TODO = `${featureId}/UPDATE_TODO`;

  @dispatch()
  public overviewActivated = (): Action => ({
    type: ToDoActions.OVERVIEW_ACTIVATED
  })

  @dispatch()
  public overviewDeactivated = (): Action => ({
    type: ToDoActions.OVERVIEW_DEACTIVATED
  })

  @dispatch()
  public detailViewActivated = (payload: any): any => ({
    type: ToDoActions.DETAIL_VIEW_ACTIVATED,
    payload: payload
  })

  @dispatch()
  public detailViewDeactivated = (): any => ({
    type: ToDoActions.DETAIL_VIEW_DEACTIVATED
  })

  @dispatch()
  public collectionDataReceived = (payload: any): any => ({
    type: ToDoActions.COLLECTION_DATA_RECEIVED,
    payload: payload
  })

  @dispatch()
  public detailDataReceived = (payload: any): any => ({
    type: ToDoActions.DETAIL_DATA_RECEIVED,
    payload: payload
  })

  @dispatch()
  public addTag = (payload: string): any => ({
    type: ToDoActions.ADD_TAG,
    payload: payload
  })

  @dispatch()
  public removeTag = (payload: string): any => ({
    type: ToDoActions.REMOVE_TAG,
    payload: payload
  })

  @dispatch()
  public resetTags = (): any => ({
    type: ToDoActions.RESET_TAGS
  })

  @dispatch()
  public createToDo = (values): AnyAction => ({
    type: ToDoActions.CREATE_TODO,
    payload: values
  })

  @dispatch()
  public updateToDo = (id, values): AnyAction => ({
    type: ToDoActions.UPDATE_TODO,
    payload: {
      id,
      values
    }
  })
}
