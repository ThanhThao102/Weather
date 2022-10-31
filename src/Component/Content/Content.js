import React, { useState } from 'react'
import './Content.css'
import { connect } from 'react-redux/es/exports'

function Content(props) {
  const [detail, setDetail] = useState(null)
  const [fullDayInfo, setFullDayInfo] = useState('')

  const HandleDetailContent = (index) => {
    setDetail(props.content.contentDetail.lsDayForeCast[index].detail)
    setFullDayInfo(props.content.contentDetail.lsDayForeCast[index].fullDayInfo)
  }

  return (
    props.content.contentDetail &&
    <div className='content-box'> 
    {console.log(props.content.contentDetail)}
      <h1 className="time">{props.content.contentDetail.currentTime}</h1>
      <span className="detailTime">{props.content.contentDetail.detailTime}</span>
      <h2 className="title">{`Welcome to ${props.content.contentDetail.name} City.`}</h2>
      <div className='tem'>
        {props.content.contentDetail.lsDayForeCast.map((n, i) => {
          return (
            <span key={i} className='sun' onClick={() => { HandleDetailContent(i) }}>
              <img src={`https://openweathermap.org/img/wn/${n.imgSrc}@2x.png`} />
              <p>{n.dayInfo}</p>
              <p>{n.temp}°C</p>
            </span>
          )
        })
        }
      </div>
      <div>
        {
          detail && <div>
            <h3 className='dayTitle'>{fullDayInfo}</h3>
            <div className='box'>
            {
              Object.keys(detail).map((n, i) => {
                return (
                  <div key={i} className='boxDetail'>
                    <span>{n}</span>
                    {
                      Object.keys(detail[n]).map((n2, i2) => {
                        return (
                          <p key={i2}>{n2} : {detail[n][n2]}</p>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            </div>
          </div>
        }
      </div>
    </div>

  )
}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    content: reduxState.content,
    city: reduxState.city
  }
}


export default connect(mapStateToProps, null)(Content)
