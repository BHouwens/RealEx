import { connect } from 'react-redux';
import { OutputRegex } from '../components/OutputRegex/outputRegex';

function mapStateToProps(state){
    let { regexList } = state;
    return { inputs: regexList.chunks };
}

export const TranslatedRegex = connect(mapStateToProps)(OutputRegex);