export default function DetailReducer(state, action) {
  let err = ''
  switch (action.type) {
    case 'init':
      return {
        ...state,
        data: action.payload.data
      }
    case 'login':
    return {
      ...state,
      login: action.payload.data
    }
    case 'danhmuc':
      return {
        ...state,
        danhmuc: action.payload.data
      }
    default:
      return state;
  }
}