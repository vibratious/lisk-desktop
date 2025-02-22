import React, { useEffect } from 'react';
import { isEmpty } from '@utils/helpers';
import { txStatusTypes } from '@constants';
import { PrimaryButton } from '@toolbox/buttons';
import TransactionResult from '@shared/transactionResult';
import { getTransactionStatus, statusMessages } from '@shared/transactionResult/statusConfig';
import DialogLink from '@toolbox/dialog/link';
import styles from './status.css';

const shouldShowBookmark = (bookmarks, account, rawTransaction, token) => {
  if (account.summary.address === rawTransaction.recipientAddress) {
    return false;
  }
  return !bookmarks[token].find(bookmark => bookmark.address === rawTransaction.recipientAddress);
};

const getMessagesDetails = (transactions, status, t, isHardwareWalletError) => {
  const messages = statusMessages(t);
  const code = isHardwareWalletError ? txStatusTypes.hwRejected : status.code;
  const messageDetails = messages[code];

  if (status.code === txStatusTypes.broadcastError
      && transactions.txBroadcastError?.error?.message) {
    messageDetails.message = transactions.txBroadcastError.error.message;
  }

  return messageDetails;
};

const TransactionStatus = ({
  recipientAccount,
  transactions,
  rawTransaction,
  bookmarks,
  account,
  token,
  t,
}) => {
  useEffect(() => {
    if (!isEmpty(transactions.signedTransaction) && !transactions.txSignatureError) {
      /**
       * Retrieve recipient info to use for bookmarking
       */
      recipientAccount.loadData({ address: rawTransaction.recipientAddress });
    }
  }, []);

  const showBookmark = shouldShowBookmark(bookmarks, account, rawTransaction, token);
  const status = getTransactionStatus(account, transactions, account.summary.isMultisignature);
  const template = getMessagesDetails(
    transactions, status, t,
    false,
  );

  return (
    <div className={`${styles.wrapper} transaction-status`}>
      <TransactionResult
        title={template.title}
        illustration="default"
        message={template.message}
        status={status}
      >
        {
          showBookmark ? (
            <div className={`${styles.bookmarkBtn} bookmark-container`}>
              <DialogLink
                component="addBookmark"
                data={{
                  formAddress: rawTransaction.recipientAddress,
                  label: recipientAccount.data.dpos?.delegate?.username ?? '',
                  isDelegate: !!recipientAccount.data.summary?.isDelegate,
                }}
              >
                <PrimaryButton className={`${styles.btn} bookmark-btn`}>
                  {t('Add address to bookmarks')}
                </PrimaryButton>
              </DialogLink>
            </div>
          ) : null
        }
      </TransactionResult>
    </div>
  );
};

export default TransactionStatus;
