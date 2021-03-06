import { compose, withProps } from 'recompose';
import { withCall, withData } from 'spunky';
import { pick } from 'lodash';

import authActions from 'login/actions/authActions';
import withNetworkData from 'shared/hocs/withNetworkData';

import GetBalance from './GetBalance';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapBalancesDataToProps = (balances) => ({ balances });
const CONFIG_KEYS = ['asset', 'address'];

export default function makeGetBalance(balancesActions) {
  return compose(
    // Clean redux store when done
    withClean(balancesActions),

    // Get the current network & account address
    withNetworkData(),

    // Map auth data
    withData(authActions, mapAuthDataToProps),

    // Get the 2nd optional parameter (default = address)
    withProps(({ args, address }) => {
      const { asset, address: fromArgsAddress } = pick(args[0], CONFIG_KEYS);
      return ({
        asset,
        address: fromArgsAddress || address
      });
    }),

    // Get the balance & wait for success or failure
    withCall(balancesActions, ({ net, address }) => ({ net, address })),
    withNullLoader(balancesActions),
    withRejectMessage(balancesActions, 'Your account balance could not be retrieved.'),
    withData(balancesActions, mapBalancesDataToProps)
  )(GetBalance);
}
