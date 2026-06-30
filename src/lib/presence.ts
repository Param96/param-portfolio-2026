export type AvailabilityStatus = 'Asleep' | 'Available' | 'Deep Work' | 'Winding Down';

export interface FounderPresence {
  istTime: string;
  status: AvailabilityStatus;
  isNight: boolean;
}

export function getFounderPresence(): FounderPresence {
  // Get current time in IST (Indian Standard Time, UTC+5:30)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  const istDate = new Date(utc + istOffset);

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();

  // Format time (e.g., "09:42 AM IST")
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  const istTime = `${displayHours}:${displayMinutes} ${ampm} IST`;

  let status: AvailabilityStatus = 'Available';
  let isNight = false;

  if (hours >= 0 && hours < 7) {
    status = 'Asleep';
    isNight = true;
  } else if (hours >= 7 && hours < 9) {
    status = 'Available';
    isNight = false;
  } else if (hours >= 9 && hours < 18) {
    status = 'Deep Work';
    isNight = false;
  } else if (hours >= 18 && hours < 22) {
    status = 'Available';
    isNight = true; // Gets dark in IST
  } else if (hours >= 22 && hours <= 23) {
    status = 'Winding Down';
    isNight = true;
  }

  return {
    istTime,
    status,
    isNight,
  };
}

export function getVisitorTimeTheme(): 'day' | 'dawn' | 'dusk' | 'night' {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 12) return 'dawn';
  if (hours >= 12 && hours < 18) return 'day';
  if (hours >= 18 && hours < 20) return 'dusk';
  return 'night';
}
