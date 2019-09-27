import React from 'react';
import { withTranslation } from 'react-i18next';
import grid from './node_modules/flexboxgrid/dist/flexboxgrid.css';
import TableRow from '../../../toolbox/table/tableRow';

const TransactionsHeader = ({
  t, isSmallScreen, columnClassNames,
}) => (
  <TableRow isHeader className={`${grid.row}`} id="transactionsHeader">
    <div className={`${columnClassNames.transaction} transactions-header`}>
      {t('Transaction')}
    </div>
    <div className={`${columnClassNames.date} transactions-header`}>
      {t('Date')}
    </div>
    <div className={`${columnClassNames.fee} transactions-header`}>
      { isSmallScreen ? t('Fee') : t('Transaction fee') }
    </div>
    <div className={`${columnClassNames.details} transactions-header`}>
      {t('Details')}
    </div>
    <div className={`${columnClassNames.amount} transactions-header`}>
      {t('Amount')}
    </div>
  </TableRow>
);

export default withTranslation()(TransactionsHeader);
