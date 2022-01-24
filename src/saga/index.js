import { fork } from 'redux-saga/effects';
import getUniListSaga from './UniListSaga';

function* sagas() {
  yield fork(getUniListSaga);
}

export default sagas;
