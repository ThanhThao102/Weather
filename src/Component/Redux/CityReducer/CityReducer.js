const InitialState = {
  cityInfo: [],
}

const rdc = (state = InitialState, { type, payload }) => {
  switch (type) {
    case "SetCity":
      return {
        ...state,
        cityInfo: payload
      }
    default:
      return state
  }
}

export default rdc;