import { call, put, takeEvery} from 'redux-saga/effects'

const ApiKey = '439d4b804bc8187953eb36d2a8c26a02'

async function SearchAPI(key) {

  var res = await fetch(`https://openweathermap.org/data/2.5/find?q=${key}&appid=${ApiKey}`);
  var data = await res.json();
  return data.list
}

function* getData({ type, payload }) {
  var data = yield call(SearchAPI, payload);
  yield put({ type: "SetCity", payload: data })
}

async function SearchForecast(lat, lon, name) {

  var res = await fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${ApiKey}`);
  var data1 = await res.json();
  
  return ({...data1, name})
}


function* getForecast({ type, payload }) {
  var forecast = yield call(SearchForecast, payload.lat, payload.lon, payload.name);
  yield put({ type: "SetCityContent", payload: forecast })
  console.log(payload);
}

function* mySaga() {
  yield takeEvery("search", getData)
  yield takeEvery("searchForecast", getForecast)
}

export default mySaga;