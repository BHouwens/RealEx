import { connect } from 'react-redux';
import { OutputRegex } from '../components/outputRegex';

function mapStateToProps(state){
    let { translatingList } = state;
    return { inputs: translatingList.chunks };
}

export const TranslatedRegex = connect(mapStateToProps)(OutputRegex);