import React from 'react';

import withData from '@common/utilities/withData';
import { getAccounts } from '@wallet/utilities/api';
import { getNetworkStatus } from '@network/utilities/api';
import { DEFAULT_LIMIT } from '@views/configuration';

export const WalletListManager = Component => props => <Component {...props} />

export default withData({
  wallets: {
    apiUtil: (network, params) => getAccounts({
      network,
      params: {
        ...params,
        limit: DEFAULT_LIMIT,
        offset: params.offset || 0,
        sort: 'balance:desc',
      },
    }),
    defaultData: [],
    autoload: true,
    transformResponse: (response, accounts, urlSearchParams) => (
      urlSearchParams.offset
        ? [...accounts, ...response.data]
        : response.data
    ),
  },
  networkStatus: {
    apiUtil: network => getNetworkStatus({ network }),
    defaultData: {},
    autoload: true,
    transformResponse: response => response,
  },
},
)(WalletListManager);
