export default function DetailReducer(state, action) {
  let err = ''
  switch (action.type) {
    case 'init':
      return {
        ...state,
        data: action.payload.data
      }
    case 'init_history':
      return {
        ...state,
        history: action.payload.history
      }
    case 'giacuoc':
      if (action.payload.data == undefined || parseInt(action.payload.data) % state.data.buocgia > 0 || parseInt(action.payload.data) < state.data.buocgia) {
        err = 'Phải là bội của ' + state.data.buocgia
      }
      const gia = state.history.length > 0 ? state.history[0].gia : state.data.giakhoidiem
      if (parseInt(action.payload.data) <= parseInt(gia)) {
        err = 'Giá đặt cược phải lớn hơn giá hiện tại'
      }
      return {
        ...state,
        data: {
          ...state.data,
          giacuoc: action.payload.data
        },
        error: {
          ...state.error,
          giacuoc: err
        }
      }
    case 'reset':
      // delete state.data.giacuoc
      return {
        ...state,
        error: {
          ...state.error,
          giacuoc: ''
        }
      }
    case 'popup':
      // delete state.data.giacuoc
      // console.log(action.payload.data)
      return {
        ...state,
        popup: action.payload.data
      }
    default:
      return state;
  }
}