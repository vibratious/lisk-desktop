import React from 'react';
import { useSelector } from 'react-redux';

import { tokenMap } from '@constants';
import { fromRawLsk } from '@utils/lsk';
import DialogLink from '@toolbox/dialog/link';
import {
  calculateBalanceLockedInUnvotes,
  calculateBalanceLockedInVotes,
  getActiveTokenAccount,
} from '@utils/account';
import Icon from '@toolbox/icon';
import styles from './balanceInfo.css';

const Link = ({
  sum, style, icon, isWalletRoute,
}) => (
  isWalletRoute ? (
    <DialogLink
      className={`${styles.lockedBalance} ${styles.pointer} ${style} open-unlock-balance-dialog unlock-amount-value`}
      component="lockedBalance"
    >
      <Icon name={icon || 'lock'} />
      {`${fromRawLsk(sum)} ${tokenMap.LSK.key}`}
      <Icon name="arrowRightCircle" />
    </DialogLink>
  )
    : (
      <div className={`${styles.lockedBalance} ${styles.pointer} ${style}`}>
        <Icon name={icon || 'lock'} />
        {`${fromRawLsk(sum)} ${tokenMap.LSK.key}`}
      </div>
    )
);

// eslint-disable-next-line max-statements
const LockedBalanceLink = ({
  account, isWalletRoute, style, icon,
}) => {
  const host = useSelector(state => getActiveTokenAccount(state));
  let lockedInVotes = 0;
  let lockedInUnvotes = 0;

  if (isWalletRoute && host) {
    lockedInVotes = useSelector(state => calculateBalanceLockedInVotes(state.voting));
  } else {
    lockedInVotes = calculateBalanceLockedInUnvotes(account.dpos?.sentVotes);
  }

  lockedInUnvotes = isWalletRoute && host
    ? (calculateBalanceLockedInUnvotes(host.dpos?.unlocking))
    : (
      calculateBalanceLockedInUnvotes(account.dpos?.unlocking)
    );

  if (lockedInUnvotes + lockedInVotes > 0) {
    return (
      <Link
        sum={lockedInUnvotes + lockedInVotes}
        style={style}
        icon={icon}
        isWalletRoute={isWalletRoute}
      />
    );
  }
  return null;
};

export default LockedBalanceLink;
