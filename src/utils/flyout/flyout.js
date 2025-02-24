/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useState, useEffect } from 'react';
import PropsType from 'prop-types';
import './flyout.css';
import { NavigationGQL } from '../../components/navigation';
import { ConfigurationGQL, ScreenGQL } from '../../components/screen';

const Flyout = ({ show, config, screen }) => {
  const [response, setResponse] = useState({});
  const [configResponse, setConfigResponse] = useState({});

  useEffect(() => {
    setResponse(screen);
    setConfigResponse(config);

    let components = {
      Header: screen.component === undefined ? screen._path : screen.component.item._path
    };

    screen.screen && screen.screen.body && screen.screen.body.block && screen.screen.body.block.forEach(e => {
      let title = '';

      if (e._metadata) {
        e._metadata.stringMetadata.forEach(y => {
          if (y.name === 'title')
            title = y.value;
        });
      }
      components[title] = e._path;

      // setBlocks(components);

    });

  }, [screen, config]);

  function hideGQL() {
    document.querySelector('#flyout').setAttribute('aria-expanded', false);
  }

  function showPayload(e) {

    document.querySelectorAll('.selected').forEach(item => {
      item.classList.toggle('selected');
    });
    e.target.classList.toggle('selected');
    document.querySelector('.fly-out-gql .response.content').style.display = 'none';
    document.querySelector('.fly-out-gql .payload.content').style.display = 'unset';
    document.querySelector('.fly-out-gql .sections.content').style.display = 'none';
  }

  function showResponse(e) {

    document.querySelectorAll('.selected').forEach(item => {
      item.classList.toggle('selected');
    });
    e.target.classList.toggle('selected');
    document.querySelector('.fly-out-gql .response.content').style.display = 'unset';
    document.querySelector('.fly-out-gql .payload.content').style.display = 'none';
    document.querySelector('.fly-out-gql .sections.content').style.display = 'none';
  }

  return (
    <div className='fly-out-gql payload' id='flyout' aria-expanded={show}>
      <div className='button-group'>
        <a onClick={(e) => showResponse(e)} className='button tab selected'>Show Response</a>
        <a onClick={(e) => showPayload(e)} className='button tab'>Show Request</a>
 
        <div className='tab' onClick={hideGQL}>
          <div className='flyout-icon'></div>
        </div>
      </div>
      <section id='payload' className='payload content'>
        <fieldset className='code-block'>
          <legend>Screen</legend>
          <pre>{ScreenGQL}</pre>
        </fieldset>
        <fieldset className='code-block'>
          <legend>Navigation</legend>
          <pre>{NavigationGQL}</pre>
        </fieldset>
        <fieldset className='code-block'>
          <legend>Configuration</legend>
          <pre>{ConfigurationGQL}</pre>
        </fieldset>
      </section>
      <section id='response' className='response content'>
        <fieldset className='code-block'>
          <legend>Screen</legend>
          <pre>{JSON.stringify(response, null, 1)}</pre>
        </fieldset>
        <fieldset className='code-block'>
          <legend>Configuration</legend>
          <pre>{JSON.stringify(configResponse, null, 1)}</pre>
        </fieldset>
      </section>
    </div>
  );
};


Flyout.propTypes = {
  show: PropsType.bool,
  config: PropsType.object,
  screen: PropsType.object,
  context: PropsType.object
};

export default Flyout;