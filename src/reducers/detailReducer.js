export default function DetailReducer(state, action) {
    switch (action.type) {
      case 'init':
        return {
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
  
      case 'update_filter':
        return {
          ...state,
          query: action.payload
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