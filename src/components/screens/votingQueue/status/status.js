import React from 'react';
import Box from '@toolbox/box';
import TransactionResult from '@shared/transactionResult';
import { getTransactionStatus } from '@shared/transactionResult/statusConfig';
import ToggleIcon from '../toggleIcon';
import statusMessages from './statusMessages';

const Status = ({
  account, transactions, statusInfo, t,
}) => {
  const status = getTransactionStatus(account, transactions);
  const template = statusMessages(t, statusInfo)[status.code];

  return (
    <section>
      <Box>
        <ToggleIcon title={t('Voting confirmation')} />
        <TransactionResult
          title={template.title}
          illustration="vote"
          status={status}
          message={template.message}
        />
      </Box>
    </section>
  );
};

export default Status;
