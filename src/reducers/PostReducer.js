export default function DetailReducer(state, action) {
    let err = ''
    switch (action.type) {
        case 'init':
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            return {
                ...state,
                data: {
                    ...state.data,
                    ngayketthuc: tomorrow,
                    tudonggiahan: true
                },
                danhmuc: action.payload.danhmuc,
                error: {
                    ...state.error,
                    minDate: tomorrow
                }
            }
        case 'danhmuccon':
            return {
                ...state,
                danhmuccon: action.payload.data,
            }
        case 'tensanpham':
            if (action.payload.data == undefined || action.payload.data == '') {
                err = 'Không được bỏ trống'
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    tensanpham: action.payload.data
                },
                error: {
                    ...state.error,
                    tensanpham: err
                }
            }
        case 'madanhmuc':
            if (action.payload.data == undefined || action.payload.data == '') {
                err = 'Không được bỏ trống'
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    madanhmuc: action.payload.data
                },
                error: {
                    ...state.error,
                    madanhmuc: err
                }
            }
        case 'giakhoidiem':
            if (action.payload.data == undefined || parseInt(action.payload.data) % 50 > 0 || parseInt(action.payload.data) < 50) {
                err = 'Phải là bội của 50'
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    giakhoidiem: action.payload.data
                },
                error: {
                    ...state.error,
                    giakhoidiem: err
                }
            }
        case 'giamuangay':
            if (action.payload.data == undefined || parseInt(action.payload.data) % 50 > 0 || parseInt(action.payload.data) < 50) {
                err = 'Phải là bội của 50'
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    giamuangay: action.payload.data
                },
                error: {
                    ...state.error,
                    giamuangay: err
                }
            }
        case 'buocgia':
            if (action.payload.data == undefined || parseInt(action.payload.data) % 50 > 0 || parseInt(action.payload.data) < 50) {
                err = 'Phải là bội của 50'
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    buocgia: action.payload.data
                },
                error: {
                    ...state.error,
                    buocgia: err
                }
            }
        case 'ngayketthuc':
            // if (action.payload.data == undefined || new Date(action.payload.data) <= new Date()) {
            //     err = 'Phải là ngày giờ lớn hơn hiện tại'
            // }
            return {
                ...state,
                data: {
                    ...state.data,
                    ngayketthuc: action.payload.data
                },
                // error: {
                //     ...state.error,
                //     ngayketthuc: err
                // }
            }
        case 'tudonggiahan':
            return {
                ...state,
                data: {
                    ...state.data,
                    tudonggiahan: action.payload.data
                }
            }
        case 'mota':
            return {
                ...state,
                data: {
                    ...state.data,
                    mota: action.payload.data
                }
            }
        case 'anhdaidien':
            return {
                ...state,
                data: {
                    ...state.data,
                    anhdaidien: action.payload.data
                }
            }
        default:
            console.log("action type: " + action.type)
            return state;
    }
}