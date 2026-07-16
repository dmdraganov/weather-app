/** @vitest-environment jsdom */

import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestGeolocation } from './geolocation.api';
import { useGeolocation } from './useGeolocation';

vi.mock('./geolocation.api', () => ({
  requestGeolocation: vi.fn(),
}));

const mockedRequestGeolocation = vi.mocked(requestGeolocation);

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('useGeolocation', () => {
  it('does not request a position until the user triggers it', () => {
    const { result } = renderHook(() => useGeolocation());

    expect(mockedRequestGeolocation).not.toHaveBeenCalled();
    expect(result.current).toMatchObject({
      geolocationPos: null,
      isLoading: false,
      error: null,
    });
  });

  it('stores coordinates after a successful request', async () => {
    const coordinates = { latitude: 55.75583, longitude: 37.61778 };
    mockedRequestGeolocation.mockResolvedValue(coordinates);
    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.requestPosition();
    });

    expect(result.current.geolocationPos).toEqual(coordinates);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('exposes a geolocation error without throwing', async () => {
    mockedRequestGeolocation.mockRejectedValue(new Error('Permission denied'));
    const { result } = renderHook(() => useGeolocation());

    await act(async () => {
      await result.current.requestPosition();
    });

    expect(result.current.geolocationPos).toBeNull();
    expect(result.current.error).toBe('Permission denied');
    expect(result.current.isLoading).toBe(false);
  });
});
