import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { activePeerSet } from '../../actions/peers';
import NewsFeed from './newsFeed';

const mapDispatchToProps = dispatch => ({
  activePeerSet: data => dispatch(activePeerSet(data)),
});

const mapStateToProps = state => ({
  account: state.account,
  newsFeed: [
    {
      title: 'Nowe Hity z Niemiec',
      description: 'Norway introduces native cryptocurrency',
      timestamp: new Date(),
      tag: 'Twitter',
    },
    {
      title: 'Www lato z radiem',
      description: 'Lisk jest super, TOP 5 najlepszych krypto na swiecie MOON HODL ROLF WOW',
      timestamp: new Date(),
      tag: 'Reddit',
    },
    {
      title: 'Www lato z radiem',
      description: 'Very very very happpppy $10000000 for 1 LSK MOON HODL ROLF WOW',
      timestamp: new Date(),
      tag: 'Twitter',
    },
    {
      title: 'Www lato z radiem',
      description: 'Very very very happpppy $10000000 for 1 LSK MOON HODL ROLF WOW',
      timestamp: new Date(),
      tag: 'Academy',
    },
  ],
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate()(NewsFeed));
