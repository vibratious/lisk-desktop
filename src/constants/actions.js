const actionTypes = {
  storeCreated: 'STORE_CREATED',
  newBlockCreated: 'NEW_BLOCK_CREATED',
  accountUpdated: 'ACCOUNT_UPDATED',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLoading: 'ACCOUNT_LOADING',
  activePeerSet: 'ACTIVE_PEER_SET',
  activePeerUpdate: 'ACTIVE_PEER_UPDATE',
  activePeerReset: 'ACTIVE_PEER_RESET',
  dialogDisplayed: 'DIALOG_DISPLAYED',
  dialogHidden: 'DIALOG_HIDDEN',
  VotePlaced: 'VOTE_PLACED',
  voteToggled: 'VOTE_TOGGLED',
  votesAdded: 'VOTES_ADDED',
  votesUpdated: 'VOTES_UPDATED',
  voteLookupStatusCleared: 'VOTE_LOOKUP_STATUS_CLEARED',
  voteLookupStatusUpdated: 'VOTE_LOOKUP_STATUS_UPDATED',
  delegatesAdded: 'DELEGATES_ADDED',
  delegatesRetrieved: 'DELEGATES_RETRIEVED',
  delegateRegisteredSuccess: 'DELEGATE_REGISTERED_SUCCESS',
  delegateRegisteredFailure: 'DELEGATE_REGISTERED_FAILURE',
  pendingVotesAdded: 'PENDING_VOTES_ADDED',
  toastDisplayed: 'TOAST_DISPLAYED',
  toastHidden: 'TOAST_HIDDEN',
  loadingStarted: 'LOADING_STARTED',
  loadingFinished: 'LOADING_FINISHED',
  transactionAdded: 'TRANSACTION_ADDED',
  transactionFailed: 'TRANSACTION_FAILED',
  transactionsFailed: 'TRANSACTIONS_FAILED',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
  transactionsLoaded: 'TRANSACTIONS_LOADED',
  transactionsFilterSet: 'TRANSACTIONS_FILTER_SET',
  transactionsFiltered: 'TRANSACTIONS_FILTERED',
  transactionsRequestInit: 'TRANSACTIONS_REQUEST_INIT',
  transactionsInit: 'TRANSACTIONS_INIT',
  transactionLoadRequested: 'TRANSACTION_LOAD_REQUESTED',
  transactionLoaded: 'TRANSACTION_LOADED',
  transactionLoadFailed: 'TRANSACTION_LOAD_FAILED',
  passphraseUsed: 'PASSPHRASE_USED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountSaved: 'ACCOUNT_SAVED',
  activeAccountSaved: 'ACTIVE_ACCOUNT_SAVED',
  accountRemoved: 'ACCOUNT_REMOVED',
  accountSwitched: 'ACCOUNT_SWITCHED',
  removePassphrase: 'REMOVE_PASSPHRASE',
  settingsUpdated: 'SETTINGS_UPDATED',
  settingsReset: 'SETTINGS_RESET',
  removeSavedAccountPassphrase: 'REMOVE_SAVED_ACCOUNT_PASSPHRASE',
};

export default actionTypes;
