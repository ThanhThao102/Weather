const InitialState = {
  contentDetail: null
}

const DateTimeConvert = (time, format) => {
  const date = new Date(time * 1000)
  return date.customFormat(format);
}

Date.prototype.customFormat = function (formatString) {
  var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
  YY = ((YYYY = this.getFullYear()) + "").slice(-2);
  MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
  MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
  DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
  DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]).substring(0, 3);
  th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) === 1) ? 'st' : (dMod === 2) ? 'nd' : (dMod === 3) ? 'rd' : 'th';
  formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
  h = (hhh = this.getHours());
  if (h === 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? ('0' + h) : h;
  hhhh = hhh < 10 ? ('0' + hhh) : hhh;
  AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
  mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
  ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
  return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};

const ContentReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
      case 'SetCityContent':
          return {
              ...state,
              contentDetail: {
                  ...state.contentDetail,
                  currentTime: DateTimeConvert(payload.current.dt, '#hh#:#mm# #AMPM#'),
                  detailTime: DateTimeConvert(payload.current.dt, '#DDDD#, #DD# #MMMM#, #YYYY#'),
                  name: payload.name,
                  lsDayForeCast: payload.daily.map(n => {
                      return {
                          imgSrc: n.weather[0].icon,
                          dayInfo: DateTimeConvert(n.dt, "#DDD#"),
                          fullDayInfo: DateTimeConvert(n.dt, "#DDDD#"),
                          temp: n.temp.day,
                          detail: {
                              "Sun and Moon": {
                                  Sunrise: DateTimeConvert(n.sunrise, '#hh#:#mm# #AMPM#'),
                                  Sunset: DateTimeConvert(n.sunset, '#hh#:#mm# #AMPM#'),
                                  Moonrise: DateTimeConvert(n.moonrise, '#hh#:#mm# #AMPM#'),
                                  Moonset: DateTimeConvert(n.moonset, '#hh#:#mm# #AMPM#')
                              },
                              Temperature: {
                                  Day: n.temp.day + "°",
                                  Min: n.temp.min + "°",
                                  Max: n.temp.max + "°",
                                  Night: n.temp.night + "°"
                              },
                              "Feels like": {
                                  Day: n.feels_like.day + "°",
                                  Night: n.feels_like.night + "°",
                                  Evening: n.feels_like.eve + "°",
                                  Morning: n.feels_like.morn + "°",
                              },
                              Other: {
                                  "Wind degrees": n.wind_deg + "°",
                                  "Wind speed": n.wind_speed + "m/s",
                                  Cloud: n.clouds,
                                  UV: n.uvi
                              }
                          }
                      }
                  })
              }
          }
      default:
          return state
  }
}

export default ContentReducer;
