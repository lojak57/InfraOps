export function formatDateTime(dateString: string | null): string {
  if (!dateString) return 'Not recorded';
  return new Date(dateString).toLocaleString();
}

export function formatVolume(volume: number | null): string {
  if (volume === null) return 'Not recorded';
  return `${volume.toFixed(1)} units`;
}

export function formatTemperature(temp: number | null): string {
  if (temp === null) return 'Not recorded';
  return `${temp.toFixed(1)}°F`;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
} 