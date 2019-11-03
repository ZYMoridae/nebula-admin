import ActionType from '../actions/ActionType';

let initState = {
  isFetchingNote: false,
  isFetchedNote: false,
  info: 'null'
}
const noteReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_NOTE_PENDING:
      return Object.assign({}, state, { isFetchedNote: action.isFetchedNote, isFetchingNote: action.isFetchingNote })
    case ActionType.FETCHING_NOTE_REJECTED:
      return Object.assign({}, state, { isFetchedNote: action.isFetchedNote, isFetchingNote: action.isFetchingNote })
    case ActionType.RECEIVE_NOTE:
      return Object.assign({}, state, { isFetchedNote: action.isFetchedNote, isFetchingNote: action.isFetchingNote, info: action.info })
    default:
      return state
  }
}

export default noteReducer;