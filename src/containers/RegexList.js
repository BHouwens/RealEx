import { connect } from 'react-redux';
import { changeDescription, changeType, changeAmount, addChunk } from '../actions';
import { RegexInputList } from '../components/RegexInputList/regexInputList';

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
        },
        onAmountSelect: (id, amount) => {
            dispatch(changeAmount(id, amount))  
        },
        onAddChunk: () => {
            dispatch(addChunk())
        }
    }
}

export const RegexList = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegexInputList);