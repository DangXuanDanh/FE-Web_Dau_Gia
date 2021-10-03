export default function DetailReducer(state, action) {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                data: action.payload.data,
                danhmuc: action.payload.danhmuc
            }
        case 'tensanpham':
            return {
                ...state,
                data: {
                    ...state.data,
                    tensanpham: action.payload.data
                }
            }
        case 'danhmuc':
            return {
                ...state,
                data: {
                    ...state.data,
                    danhmuc: action.payload.data
                }
            }
        case 'giakhoidiem':
            return {
                ...state,
                data: {
                    ...state.data,
                    giakhoidiem: action.payload.data
                }
            }
        case 'giamuangay':
            return {
                ...state,
                data: {
                    ...state.data,
                    giamuangay: action.payload.data
                }
            }
        case 'ngayketthuc':
            return {
                ...state,
                data: {
                    ...state.data,
                    ngayketthuc: action.payload.data
                }
            }
        case 'tudonggiahan':
            return {
                ...state,
                data: {
                    ...state.data,
                    tudonggiahan: action.payload.data
                }
            }
        default:
            console.log("action type: " + action.type)
            return state;
    }
}