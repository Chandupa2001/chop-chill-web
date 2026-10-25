export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const TIME_ZONE = 'Asia/Colombo';

const toMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

// '22:30' → '10:30 PM', '11:00' → '11 AM'
export function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const suffix = h % 24 < 12 ? 'AM' : 'PM';
  return m ? `${hour12}:${String(m).padStart(2, '0')} ${suffix}` : `${hour12} ${suffix}`;
}

// The current weekday (0 = Sunday) and minutes past midnight in Sri Lanka.
export function colomboNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  return { day: WEEKDAY_INDEX[get('weekday')], minutes: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}

/**
 * Whether the restaurant is open right now, plus a short human label.
 * `hours` is indexed 0 = Sunday … 6 = Saturday; null means closed that day.
 * A close time at or before the open time runs past midnight.
 */
export function getOpenStatus(hours, now = new Date(), soonMinutes = 45) {
  const { day, minutes } = colomboNow(now);
  const open = (closesIn, close) => ({
    isOpen: true,
    closingSoon: closesIn <= soonMinutes,
    today: day,
    label: closesIn <= soonMinutes ? `Closing soon · ${formatTime(close)}` : `Open now · until ${formatTime(close)}`,
  });

  // Still inside last night's after-midnight hours?
  const yesterday = hours[(day + 6) % 7];
  if (yesterday && toMinutes(yesterday.close) <= toMinutes(yesterday.open) && minutes < toMinutes(yesterday.close)) {
    return open(toMinutes(yesterday.close) - minutes, yesterday.close);
  }

  const today = hours[day];
  if (today) {
    const o = toMinutes(today.open);
    const c = toMinutes(today.close);
    const overnight = c <= o;
    if (minutes >= o && (overnight || minutes < c)) {
      return open(overnight ? 1440 - minutes + c : c - minutes, today.close);
    }
    if (minutes < o) {
      return { isOpen: false, closingSoon: false, today: day, label: `Closed · opens ${formatTime(today.open)}` };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (next) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[(day + i) % 7];
      return { isOpen: false, closingSoon: false, today: day, label: `Closed · opens ${when} ${formatTime(next.open)}` };
    }
  }
  return { isOpen: false, closingSoon: false, today: day, label: 'Closed' };
}
