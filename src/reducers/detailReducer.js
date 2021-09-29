export default function DetailReducer(state, action) {
    switch (action.type) {
      case 'init':
        return {
          ...state,
          data: action.payload.data,
        }
  
      case 'change_id':
        return {
          ...state,
          data: {
            ...state.data,
            masanpham: action.payload.id
          }
        }
  
      case 'init_history':
        return {
          ...state,
          history: action.payload.history
        }
  
      case 'complete_task':
        return {
          ...state,
          items: state.items.map(i => i.id === action.payload ? { ...i, complete: true } : i)
        }
  
      default:
        return state;
    }
  }