import Zjax from '../utils/zjax';
import ActionType from './ActionType';

var zjax = new Zjax();

// -------- User Actions ----------
export const receieveNote = (json) => {
  return {
    type: ActionType.RECEIVE_NOTE,
    isFetchingNote: false,
    isFetchedNote: true,
    info: json,
    receivedAt: Date.now()
  }
}

export const fetchingNote = (option, json) => {
  return {
    type: ActionType.FETCHING_NOTE_PENDING,
    option: option,
    isFetchingNote: true,
    isFetchedNote: false
  }
}

export const fetchingNoteError = (err) => {
  return {
    type: ActionType.FETCHING_NOTE_REJECTED,
    isFetchingNote: false,
    isFetchedNote: true
  }
}


export const fetchNoteInfo = () => {
  return function (dispatch) {
    dispatch(fetchingNote());
    zjax.request({
      url: 'http://localhost:8080/nebula/note/all',
      option: {
        method: 'get'
      },
      successCallback: (response) => {
        dispatch(receieveNote(response.data));
      },
      failureCallback: (err) => {
        dispatch(fetchingNoteError(err));
      }
    });
  }
}