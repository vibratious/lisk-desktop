import React, { useRef, useEffect } from 'react';
import { isEmpty } from '@utils/helpers';
import Box from '@toolbox/box';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import { routes } from '@constants';
import NotFound from '@shared/notFound';

import styles from './transactionDetails.css';
import LayoutSchema from './layoutSchema';

export const Context = React.createContext({
  transaction: {},
  account: {},
});

const TransactionDetails = ({
  t, activeToken, network, history, schema, title,
  transaction: { error, isLoading, data }, account,
}) => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
      history.push(routes.dashboard.path);
    }
  }, [activeToken]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (!error && isEmpty(data)) {
    return <div />;
  }

  if (error && isEmpty(data)) {
    return <NotFound />;
  }

  const Layout = LayoutSchema[schema ?? data.moduleAssetId] || LayoutSchema.default;

  return (
    <Box isLoading={isLoading} className={styles.container}>
      {title && (
        <BoxHeader>
          <h1>{title}</h1>
        </BoxHeader>
      )}
      <BoxContent className={`${styles.mainContent} ${Layout.className}`}>
        <Context.Provider value={{
          activeToken, network, account, transaction: data,
        }}
        >
          {Layout.components.map((Component, index) => <Component key={index} t={t} />)}
        </Context.Provider>
      </BoxContent>
    </Box>
  );
};

export default TransactionDetails;
