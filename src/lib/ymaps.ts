import React from 'react';
import ReactDom from 'react-dom';

const [ymaps3React, ymaps3Markers] = await Promise.all([
  ymaps3.import('@yandex/ymaps3-reactify'),
  ymaps3.import('@yandex/ymaps3-markers@0.0.1'),
  ymaps3.ready,
]);

export const reactify = ymaps3React
  ? ymaps3React.reactify.bindTo(React, ReactDom)
  : null;

export const {
  YMap = null,
  YMapDefaultSchemeLayer = null,
  YMapDefaultFeaturesLayer = null,
  YMapMarker = null,
  YMapListener = null,
} = reactify ? reactify.module(ymaps3) : {};

export const { YMapDefaultMarker = null } = reactify
  ? reactify.module(ymaps3Markers)
  : {};
