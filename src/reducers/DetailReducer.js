function GetTimeSpan(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var days = Math.floor(sec_num / (3600 * 24));
  var abc = (sec_num % (3600 * 24))
  var hours = Math.floor(abc / 3600);
  abc = abc % 3600
  var minutes = Math.floor(abc / 60);
  abc = abc % 60
  var seconds = abc;

  if (days < 1) { days = "0" + days; }
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return days + 'd ' + hours + ':' + minutes + ':' + seconds;
}

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
      if (parseInt(action.payload.data) <= parseInt(gia) || parseInt(action.payload.data) <= parseInt(state.data.giakhoidiem)) {
        err = 'Giá đặt cược phải lớn hơn giá hiện tại và giá khởi điểm'
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
    case 'tick':
      return {
        ...state,
        data: {
          ...state.data,
          thoigian: state.data.thoigian - 1,
          thoigianconlai: GetTimeSpan(state.data.thoigian)
        }
      }
    case 'sanphamtuongtu':
      return {
        ...state,
        relatedProduct: action.payload.data
      }
    case 'yeuthich':
      // if (state.yeuthich != undefined)
      // {
      //   state.yeuthich = !!state.yeuthich
      // } else {
      //   state.yeuthich = false
      // }
      return {
        ...state,
        yeuthich: !state.yeuthich
      }
    default:
      return state;
  }
}
