import { describe, expect, it } from 'vitest';
import { colomboNow, formatTime, getOpenStatus } from './hours.js';

// Sri Lanka is UTC+5:30 all year. 2026-10-26 is a Monday.
const at = (iso) => new Date(iso);
const daily = Array.from({ length: 7 }, () => ({ open: '11:00', close: '22:00' }));

describe('colomboNow', () => {
  it('converts UTC to Sri Lanka weekday and minutes', () => {
    expect(colomboNow(at('2026-10-26T04:30:00Z'))).toEqual({ day: 1, minutes: 600 }); // Mon 10:00
  });

  it('rolls the weekday over at Sri Lanka midnight, not UTC midnight', () => {
    expect(colomboNow(at('2026-10-26T18:45:00Z'))).toEqual({ day: 2, minutes: 15 }); // Tue 00:15
  });
});

describe('formatTime', () => {
  it('formats 24h times as 12h', () => {
    expect(formatTime('11:00')).toBe('11 AM');
    expect(formatTime('22:30')).toBe('10:30 PM');
    expect(formatTime('00:30')).toBe('12:30 AM');
    expect(formatTime('12:00')).toBe('12 PM');
  });
});

describe('getOpenStatus', () => {
  it('is open during hours', () => {
    const s = getOpenStatus(daily, at('2026-10-26T09:30:00Z')); // Mon 15:00
    expect(s.isOpen).toBe(true);
    expect(s.closingSoon).toBe(false);
    expect(s.label).toBe('Open now · until 10 PM');
  });

  it('flags closing soon', () => {
    const s = getOpenStatus(daily, at('2026-10-26T16:00:00Z')); // Mon 21:30
    expect(s.isOpen).toBe(true);
    expect(s.closingSoon).toBe(true);
    expect(s.label).toBe('Closing soon · 10 PM');
  });

  it('is closed before opening and says when it opens today', () => {
    const s = getOpenStatus(daily, at('2026-10-26T03:30:00Z')); // Mon 09:00
    expect(s.isOpen).toBe(false);
    expect(s.label).toBe('Closed · opens 11 AM');
  });

  it('is closed at closing time and points to tomorrow', () => {
    const s = getOpenStatus(daily, at('2026-10-26T16:30:00Z')); // Mon 22:00
    expect(s.isOpen).toBe(false);
    expect(s.label).toBe('Closed · opens tomorrow 11 AM');
  });

  it('skips closed days', () => {
    const hours = [...daily];
    hours[2] = null; // closed Tuesday
    const s = getOpenStatus(hours, at('2026-10-26T17:00:00Z')); // Mon 22:30
    expect(s.label).toBe('Closed · opens Wednesday 11 AM');
  });

  it('handles hours that run past midnight', () => {
    const hours = [...daily];
    hours[5] = { open: '11:00', close: '01:00' }; // Friday until 1 AM
    // Sat 00:30 → still Friday's session
    const s = getOpenStatus(hours, at('2026-10-30T19:00:00Z'));
    expect(s.isOpen).toBe(true);
    expect(s.closingSoon).toBe(true);
    expect(s.label).toBe('Closing soon · 1 AM');
    // Fri 23:00 → open, not closing soon
    expect(getOpenStatus(hours, at('2026-10-30T17:30:00Z')).label).toBe('Open now · until 1 AM');
  });

  it('reports closed when there are no hours at all', () => {
    expect(getOpenStatus(Array(7).fill(null), at('2026-10-26T09:30:00Z')).label).toBe('Closed');
  });
});
