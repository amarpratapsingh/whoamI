export function ping({ args }) {
  if ((args[0] || '').toLowerCase() !== 'recruiter') {
    return 'ping: unknown host';
  }

  return [
    'PING recruiter.company.com (127.0.0.1): 56 data bytes',
    '64 bytes from recruiter.company.com: icmp_seq=0 ttl=64 time=0.42 ms',
    '64 bytes from recruiter.company.com: icmp_seq=1 ttl=64 time=0.38 ms',
    '--- recruiter ping statistics ---',
    '2 packets transmitted, 2 received, 0% packet loss',
  ].join('\n');
}
