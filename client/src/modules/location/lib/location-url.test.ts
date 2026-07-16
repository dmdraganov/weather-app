import { describe, expect, it } from 'vitest';
import {
  canonicalizeLocationSearchParams,
  getWeatherNavigationTarget,
  mapCoordinatesToSearch,
  parseLocationSearchParams,
} from './location-url';

describe('location URL contract', () => {
  it('parses a valid shareable weather URL', () => {
    expect(
      parseLocationSearchParams(
        new URLSearchParams('lat=55.75583&lon=37.61778')
      )
    ).toEqual({
      status: 'valid',
      coordinates: { latitude: 55.75583, longitude: 37.61778 },
    });
  });

  it('distinguishes a URL without location from invalid location parameters', () => {
    expect(parseLocationSearchParams(new URLSearchParams('foo=bar'))).toEqual({
      status: 'missing',
    });
    expect(parseLocationSearchParams(new URLSearchParams('lat=55.75'))).toEqual({
      status: 'invalid',
    });
    expect(
      parseLocationSearchParams(new URLSearchParams('lat=NaN&lon=37.61'))
    ).toEqual({ status: 'invalid' });
    expect(
      parseLocationSearchParams(new URLSearchParams('lat=Infinity&lon=37.61'))
    ).toEqual({ status: 'invalid' });
    expect(
      parseLocationSearchParams(new URLSearchParams('lat=91&lon=37.61'))
    ).toEqual({ status: 'invalid' });
    expect(
      parseLocationSearchParams(new URLSearchParams('lat=55.75&lon=-181'))
    ).toEqual({ status: 'invalid' });
  });

  it('writes canonical five-decimal coordinates for location changes', () => {
    expect(
      mapCoordinatesToSearch({ latitude: 55.7558319, longitude: 37.6177791 })
    ).toBe('?lat=55.75583&lon=37.61778');
  });

  it('normalizes a direct link without dropping unrelated parameters', () => {
    const searchParams = canonicalizeLocationSearchParams(
      new URLSearchParams('lat=55.7558319&lon=37.6177791&source=shared'),
      { latitude: 55.7558319, longitude: 37.6177791 }
    );

    expect(searchParams.toString()).toBe(
      'lat=55.75583&lon=37.61778&source=shared'
    );
  });

  it('links the weather navigation item to the selected location only', () => {
    expect(
      getWeatherNavigationTarget({ latitude: 55.75583, longitude: 37.61778 })
    ).toBe('/?lat=55.75583&lon=37.61778');
    expect(getWeatherNavigationTarget(null)).toBe('/location');
  });
});
