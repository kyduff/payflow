export function formatMessage(currency: string, amount: string, iban: string, time: Date) {
  const _currency = currency.toUpperCase();
  const _iban = iban.replaceAll(" ", "");
  const _timestamp = time.toISOString();
  return `Send ${_currency} ${amount} to ${_iban} at ${_timestamp}`
}