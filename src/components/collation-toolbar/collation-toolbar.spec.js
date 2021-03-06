import React from 'react';
import { mount } from 'enzyme';

import CollationToolbar from 'components/collation-toolbar';
import styles from './collation-toolbar.less';

describe('CollationToolbar [Component]', () => {
  let component;
  let collationSpy;
  let collationChangedSpy;
  let collationStringSpy;
  let collationStringChangedSpy;
  let openLinkSpy;

  beforeEach(() => {
    collationSpy = sinon.spy();
    collationChangedSpy = sinon.spy();
    collationStringSpy = sinon.spy();
    collationStringChangedSpy = sinon.spy();
    openLinkSpy = sinon.spy();

    component = mount(
      <CollationToolbar
        collation={collationSpy}
        collationChanged={collationChangedSpy}
        collationString={collationStringSpy}
        collationStringChanged={collationStringChangedSpy}
        openLink={openLinkSpy} />
    );
  });

  afterEach(() => {
    component = null;
    collationSpy = null;
    collationChangedSpy = null;
    collationStringSpy = null;
    collationStringChangedSpy = null;
  });

  it('renders the wrapper div', () => {
    expect(component.find(`.${styles['collation-toolbar']}`)).to.be.present();
  });

  it('renders the collation lable', () => {
    expect(component.find(`.${styles['collation-toolbar-input-label']}`)).
      to.be.present();
  });

  it('renders the collation tooltip', () => {
    expect(component.find('.info-sprinkle')).to.be.present();
  });
});
