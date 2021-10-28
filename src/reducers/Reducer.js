export default function DetailReducer(state, action) {
  let err = ''
  switch (action.type) {
    case 'init':
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state;
  }
}