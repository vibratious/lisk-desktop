import React from 'react';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styles from './filterButton.css';

class FilterButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilters: false,
      filters: {
        dateFrom: '',
        dateTo: '',
        amountFrom: '',
        amountTo: '',
        message: '',
      },
      amountToValidity: '',
      amountFromValidity: '',
    };
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  changeFilters(name, value) {
    let errors = {};
    if (name === 'amountTo') {
      errors = { amountToValidity: Number.isNaN(value) ? 'Invalid number' : '' };
    }

    if (name === 'amountFrom') {
      errors = { amountFromValidity: Number.isNaN(value) ? 'Invalid number' : '' };
    }

    this.setState({ filters: { ...this.state.filters, [name]: value }, ...errors });
  }

  saveFilters() {
    this.props.saveFilters(this.state.filters);
    this.setState({ showFilters: false, filters: {} });
  }

  render() {
    return (
      <div>
        <div
          className={styles.filterTransactions}
          onClick={() => this.toggleFilters()}>
            {this.props.t('Filter Transactions')}
        </div>
          {this.state.showFilters ?
            <div className={styles.container}>
              <div className={styles.triangleBorder}></div>
              <div className={styles.triangle}></div>
              <div className={styles.label}>{this.props.t('Date')}</div>
              <div className={styles.row}>
                <Input
                  type='text'
                  id='filter-date-from'
                  name='dateFrom'
                  placeholder='MM-DD-YY'
                  theme={styles}
                  value={this.state.filters.dateFrom}
                  onChange={(val) => { this.changeFilters('dateFrom', val); }}/>
                {/* <DatePicker
                  dateFormat="MM-dd-yy"
                  placeholderText="MM-DD-YY"
                  selected={this.state.filters.dateFrom}
                  onChange={(val) => { this.changeFilters('dateFrom', val); }}
                /> */}
                <div className={styles.dash}>—</div>
                <Input
                  type='text'
                  id='filter-date-to'
                  name='dateTo'
                  placeholder='MM-DD-YY'
                  theme={styles}
                  value={this.state.filters.dateTo}
                  onChange={(val) => { this.changeFilters('dateTo', val); }}/>
              </div>
              <div className={styles.label}>{this.props.t('Amount')}</div>
              <div className={styles.row}>
                <Input
                  type='text'
                  id='filter-amount-from'
                  name='amountFrom'
                  placeholder='Min'
                  theme={styles}
                  error={this.state.amountFromValidity}
                  onChange={(val) => { this.changeFilters('amountFrom', val); }}/>
                <div className={styles.dash}>—</div>
                <Input
                  type='text'
                  id='filter-amount-to'
                  name='amountTo'
                  placeholder='Max'
                  error={this.state.amountToValidity}
                  theme={styles}
                  value={this.state.filters.amountTo}
                  onChange={(val) => { this.changeFilters('amountTo', val); }}/>
              </div>
              <div className={styles.label}>{this.props.t('Message')}</div>
              <div className={styles.row}>
                <Input
                  type='text'
                  id='filter-message'
                  name='message'
                  placeholder='Message'
                  theme={styles}
                  value={this.state.filters.message}
                  onChange={(val) => { this.changeFilters('message', val); }}/>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  tooltip='tooltip here'
                  className={styles.saveButton}
                  onClick={this.saveFilters.bind(this)}>{this.props.t('Apply Filters')}</Button>
              </div>
            </div>
            : null}
      </div>);
  }
}

export default FilterButton;
