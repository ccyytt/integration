import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import * as sagaEffects from "redux-saga/effects";
const NAMESPACE_SEPARATOR = "/";
const prefix = (obj, namespace) => {
  return Object.keys(obj).reduce((prev, next) => {
    const key = "".concat(namespace).concat(NAMESPACE_SEPARATOR).concat(next);
    prev[key] = obj[next];
    return prev;
  }, {});
};
const prefixResolve = (model) => {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  if (model.effects) {
    model.effects = prefix(model.effects, model.namespace);
  }
  return model;
};
const getSages = (modals) => {
  const sagas = [];
  for (const m of modals) {
    sagas.push(function* () {
      for (const key in m.effects) {
        const watcher = getWatcher(key, m.effects[key], m);
        yield sagaEffects.fork(watcher);
      }
    });
  }
  return sagas;
};
function prefixType(type, model) {
  if (!type.includes(NAMESPACE_SEPARATOR)) {
    return "".concat(model.namespace).concat(NAMESPACE_SEPARATOR).concat(type);
  }
  return type;
}
const getWatcher = (key, effect, model) => {
  function put(action) {
    return sagaEffects.put({ ...action, type: prefixType(action.type, model) });
  }
  return function* () {
    yield sagaEffects.takeEvery(key, function* (action) {
      yield effect(action, { ...sagaEffects, put });
    });
  };
};

const getReducer = (model) => {
  const reducers = {};
  for (const m of model) {
    reducers[m.namespace] = function (state = m.state, action) {
      const reducerFn = m.reducers;
      const reducer = reducerFn[action.type];
      if (reducer) {
        return reducer(state, action);
      }
      return state;
    };
  }
  return combineReducers(reducers);
};
// eslint-disable-next-line
const initModal = __REDUX_INIT__TARGET.map((v) => prefixResolve(v));
const rootSage = getSages(initModal);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  getReducer(initModal),
  applyMiddleware(sagaMiddleware)
);
rootSage.forEach(sagaMiddleware.run);
export default store;
