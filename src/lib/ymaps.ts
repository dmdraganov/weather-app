import React from 'react';
import ReactDom from 'react-dom';

const [ymaps3React] = ymaps3
  ? await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready])
  : [null];

export const reactify = ymaps3React
  ? ymaps3React.reactify.bindTo(React, ReactDom)
  : null;

export const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
} = reactify
  ? reactify.module(ymaps3)
  : {
      YMap: null,
      YMapDefaultSchemeLayer: null,
      YMapDefaultFeaturesLayer: null,
      YMapMarker: null,
    };
