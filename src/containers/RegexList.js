import { connect } from 'react-redux';
import { addDescription } from '../actions';
import { RegexInputList } from '../components/regexInputList';

function mapStateToProps(state){
    let { translatingList } = state;
    return { inputs: translatingList.chunks };
}

function mapDispatchToProps(dispatch, ownProps){
    return {
        onListItemChange: () => {
            dispatch(changeDescription(ownProps.id, ownProps.text))
        }
    }
}

export const RegexList = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegexInputList);