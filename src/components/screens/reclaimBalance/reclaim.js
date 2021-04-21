import React from 'react';
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Tooltip from '@toolbox/tooltip/tooltip';
import { PrimaryButton } from '@toolbox/buttons';
import DialogLink from '@toolbox/dialog/link';
import AccountMigration from '@shared/accountMigration';
import { getActiveTokenAccount, hasEnoughtBalanceForReclaim } from '@utils/account';
import { fromRawLsk } from '@utils/lsk';
import styles from './index.css';

const Reclaim = ({ t }) => {
  const account = useSelector(state => getActiveTokenAccount(state));
  const hasEnoughtBalance = hasEnoughtBalanceForReclaim(parseInt(account.token?.balance, 10));

  return (
    <div className={`${styles.container} ${styles.reclaim}`}>
      <h4>{t('Update to your new account')}</h4>
      <p>
        {t('Your tokens and passphrase are safe.')}
        <br />
        {t('We kindly ask you to transfer your balance to the new account.')}
      </p>
      <section className={styles.box}>
        <div className={styles.accountMigrationContainer}>
          <AccountMigration account={account} showBalance />
        </div>
        <div>
          <h5 className={styles.listHeading}>{t('You will be able to:')}</h5>
          <ul className={styles.list}>
            <li>{t('Use your old passphrase ')}</li>
            <li>{t('Access your old address and transaction history')}</li>
          </ul>
        </div>
      </section>
      <section className={styles.box}>
        <h5 className={styles.listHeading}>{t('All you need to do:')}</h5>
        <ul className={styles.list}>
          <li className={`${styles.step} ${hasEnoughtBalance ? styles.check : styles.green}`}>
            <p>
              {t('Deposit at least {{amount}} to your new account', { amount: fromRawLsk(Number(account.info.LSK.legacy.balance)) })}
              <Tooltip position="right" size="m">
                <>
                  <p>
                    {t('Since you want to reclaim your LSK on the new blockchain, you need to pay the fee from your new account.')}
                  </p>
                  <br />
                  <p>
                    {t('Hence your LSK in your old account can not be used to pay the fee. Read more')}
                  </p>
                  <br />
                  <p className={styles.link}>
                    {t('Read more')}
                  </p>
                </>
              </Tooltip>
              <br />
              {!hasEnoughtBalance && (
                <>
                  <span>
                    {t('An initial one-time transfer fee will be deducted from the new account.')}
                  </span>
                  <br />
                  <span>
                    {t('Please use ')}
                    <span className={styles.link}>{t('external services')}</span>
                    {t(' to deposit LSK.')}
                  </span>
                </>
              )}
            </p>
          </li>
          <li className={`${styles.step} ${hasEnoughtBalance && styles.green}`}>
            <p>
              {t('Send a reclaim transaction')}
              <br />
              <span>
                {t('Once you have enough tokens on your new account you will be able to send a transaction.')}
              </span>
            </p>
          </li>
        </ul>
      </section>
      <DialogLink component="reclaimBalance">
        <PrimaryButton
          className={styles.button}
          disabled={!hasEnoughtBalance}
        >
          {t('Continue')}
        </PrimaryButton>
      </DialogLink>
    </div>
  );
};

export default withTranslation()(Reclaim);
