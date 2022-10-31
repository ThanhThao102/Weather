import React from 'react'
import './Search.css'
import { connect } from 'react-redux/es/exports'

function Search(props) {
  const HandleEnter = (event) => {
    if (event.key === 'Enter') {
      props.getCity(event.target.value);
    }
  }

  const HandleLocation = (lat, lon, name) => {
    props.ActionCallForecast(lat, lon, name)
  }

  return (
    <div className='search-box' >
      <div className='input-box'>
        <input placeholder="Search..." onKeyUp={HandleEnter} />
        <p>Enter to search.</p>
      </div>
      {
        props.uRdc.cityInfo.length !== 0 &&
        props.uRdc.cityInfo.map((n, i) => {
          return <div key={i} className="hcm" onClick={() => { HandleLocation(n.coord.lat, n.coord.lon, n.name) }}>
            <span><img src={`https://openweathermap.org/images/flags/${n.sys.country.toLowerCase()}.png`} />
              <p>{n.name}</p>
            </span>
            <p><span>${(n.main.temp - 273.15).toFixed(2)}°С</span> temperature from ${(n.main.temp_min - 273.15).toFixed(2)} to ${(n.main.temp_max - 273.15).toFixed(2)} °С
              wind ${n.wind.speed} m/s. clouds ${n.clouds.all}%
              Geo coords [${n.coord.lat}, ${n.coord.lon}]
            </p>
          </div>
        }
        )
      }
    </div >
  )
}


const mapStateToProps = (reduxState, ownProps) => {
  return {
    uRdc: reduxState.city
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCity: (CityInfo) => {
      dispatch({ type: "search", payload: CityInfo })
    },
    ActionCallForecast: (lat, lon, name) => {
      dispatch({ type: "searchForecast", payload: { lat: lat, lon: lon, name } })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


