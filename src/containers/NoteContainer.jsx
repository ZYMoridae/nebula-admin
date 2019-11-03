import { connect } from 'react-redux';
import {
  fetchNoteInfo
} from '../actions';
import User from '../components/Note';

const mapStateToProps = state => {
  return {
    info: state.info,
    isFetchingNote: state.isFetchingNote,
    isFetchedNote: state.isFetchedNote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchNoteInfo: () => {
      dispatch(fetchNoteInfo());
    }
  }
}

const NoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default NoteContainer;