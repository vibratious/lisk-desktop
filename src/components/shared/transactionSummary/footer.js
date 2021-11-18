// istanbul ignore file
import React, { useEffect, useState } from 'react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from '@toolbox/buttons';
import PassphraseInput from '@toolbox/passphraseInput';
import BoxFooter from '@toolbox/box/footer';
import styles from './transactionSummary.css';

const Actions = ({
  isMultisignature,
  cancelButton,
  confirmButton,
  inputStatus,
  t,
}) => (
  <div className={styles.primaryActions}>
    {cancelButton && (
      <SecondaryButton
        className="cancel-button"
        onClick={cancelButton.onClick}
      >
        {cancelButton.label}
      </SecondaryButton>
    )}
    <PrimaryButton
      className="confirm-button"
      disabled={confirmButton.disabled || inputStatus === 'visible'}
      onClick={confirmButton.onClick}
    >
      {isMultisignature ? t('Sign') : confirmButton.label}
    </PrimaryButton>
  </div>
);

const SecondPassInput = ({
  t, transactionDoubleSigned, inputStatus, setInputStatus,
}) => {
  const [secondPass, set2ndPass] = useState('');

  useEffect(() => {
    if (secondPass) {
      transactionDoubleSigned({ secondPass });
      setInputStatus('valid');
    }
  }, [secondPass]);

  return inputStatus === 'hidden' ? (
    <div className={styles.secondaryActions}>
      <span className={styles.or}>or</span>
      <TertiaryButton
        onClick={() => setInputStatus('visible')}
      >
        {t('Send using second passphrase right away')}
      </TertiaryButton>
    </div>
  ) : (
    <div className={styles.secondPassphrase}>
      <PassphraseInput
        t={t}
        onFill={set2ndPass}
        inputsLength={12}
        maxInputsLength={24}
      />
    </div>
  );
};

const Footer = ({
  confirmButton, cancelButton, footerClassName,
  t, transactionDoubleSigned, account,
}) => {
  const isMultisignature = !!account.keys?.numberOfSignatures;
  const hasSecondPass = account.keys.numberOfSignatures === 2
    && account.keys.mandatoryKeys.length === 2 && account.keys.optionalKeys.length === 0;
  const [inputStatus, setInputStatus] = useState(hasSecondPass ? 'hidden' : 'notRequired');

  return (
    <BoxFooter className={`${footerClassName} summary-footer`} direction="horizontal">
      <Actions
        cancelButton={cancelButton}
        confirmButton={confirmButton}
        hasSecondPass={hasSecondPass}
        inputStatus={inputStatus}
        isMultisignature={isMultisignature}
        t={t}
      />
      {
          hasSecondPass ? (
            <SecondPassInput
              t={t}
              transactionDoubleSigned={transactionDoubleSigned}
              inputStatus={inputStatus}
              setInputStatus={setInputStatus}
            />
          ) : null
        }
    </BoxFooter>
  );
};

export default Footer;
