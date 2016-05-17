import { connect } from 'react-redux';
import { changeDescription, changeType } from '../actions';
import { RegexInputList } from '../components/regexInputList';

function mapStateToProps(state){
    let { regexList } = state;
    return { inputs: regexList.chunks };
}

function mapDispatchToProps(dispatch){
    return {
        onListItemChange: (id, text) => {
            dispatch(changeDescription(id, text))
        },
        onListTypeSelect: (id, type) => {
            dispatch(changeType(id, type))
        }
    }
}

export const RegexList = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegexInputList);