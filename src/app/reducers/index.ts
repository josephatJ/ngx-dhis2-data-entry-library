import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface State {
  test: any;
}

export const reducers: ActionReducerMap<State> = {
  test: null
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
