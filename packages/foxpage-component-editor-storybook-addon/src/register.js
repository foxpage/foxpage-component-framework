import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PANEL_KEY } from './shared';

addons.register(ADDON_ID, api => {
  const title = 'Foxpage Editor';
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    paramKey: PANEL_KEY,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel api={api} key={key} active={active} />
      </AddonPanel>
    ),
  });
});
