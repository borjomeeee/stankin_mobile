import {combineReducers, applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer, createTransform} from 'redux-persist';

import AppReducer from '../reducers/App.reducer';
import UserReducer from '../reducers/User.reducer';
import SheduleReducer from '../reducers/Shedule.reducer';
import NotesReducer from '../reducers/Notes.reducer';

import RootSaga from '../saga/Root.saga';

import User from '../models/User.model';
import {INote} from '../models/Note.model';
import {ILesson} from '../models/Lesson.model';

import {AppErrorTypes} from '../enums/App.enums';

// Initial state
export const initialState = {
  app: {
    version: '1.0.0',
    lastUpdateSchedule: new Date().getDate(),

    isLoading: false,
    error: {
      type: AppErrorTypes.NONE,
      text: '',
    },
  },

  user: new User(),
  schedule: new Map<number, ILesson[]>(),
  notes: new Map<number, INote[]>(),
};

export type IInitialState = typeof initialState;
export type IAppInitialState = typeof initialState.app;
export type IUserInitialState = typeof initialState.user;
export type IScheduleInitialState = typeof initialState.schedule;
export type INotesInitialState = typeof initialState.notes;

export type IAppError = typeof initialState.app.error;

const transformMapsState = createTransform(
  (state: Map<number, any[]>) => {
    return JSON.stringify(Array.from(state || new Map<number, any[]>()));
  },
  (state: string) =>
    new Map<number, any[]>(JSON.parse(state.length > 0 ? state : '[]')),
  {whitelist: ['schedule', 'notes']},
);

const storePersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [transformMapsState],
};

const AppPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['version', 'lastUpdateSchedule'],
};

export const reducers = combineReducers({
  app: persistReducer(AppPersistConfig, AppReducer),
  user: UserReducer,
  schedule: SheduleReducer,
  notes: NotesReducer,
});

const persistedReducer = persistReducer(storePersistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export default {store, persistor: persistStore(store)};

sagaMiddleware.run(RootSaga);
