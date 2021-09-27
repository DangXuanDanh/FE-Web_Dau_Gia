export default function DetailReducer(state, action) {
    switch (action.type) {
      case 'init':
        return {
          items: action.payload.items,
          query: action.payload.query
        }
  
      case 'add_item':
        return {
          ...state,
          items: [...state.items, action.payload]
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