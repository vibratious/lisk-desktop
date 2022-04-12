import React from 'react';
import TransactionResult from '@transaction/detail/manager/transactionResult';
import { getTransactionStatus } from '@transaction/detail/info/transactionResult/statusConfig';
import statusMessages from './statusMessages';
import styles from './status.css';

const Status = ({ transactions, account, t }) => {
  const status = getTransactionStatus(account, transactions, account.summary.isMultisignature);
  const template = statusMessages(t)[status.code];

  return (
    <div className={`${styles.wrapper} status-container`}>
      <TransactionResult
        illustration="default"
        status={status}
        title={template.title}
        message={template.message}
        className={styles.content}
      />
    </div>
  );
};

const areEqual = (prev, next) => (
  !next.account.dpos.delegate
  || prev.account.dpos.delegate.username === next.account.dpos.delegate.username
);

export default React.memo(Status, areEqual);
