# AirSocket — Resilient P2P File Transfer & Networking Lab
Java 21 (java.base), Raw TCP/UDP Sockets, AES-256-GCM AEAD, PBKDF2, Project Loom, Binary Framing V4
Zero-runtime-dependency peer-to-peer file transfer engine and low-level socket performance tuning laboratory.

## Architectural Highlights
- Zero third-party dependencies: 100% standard library (`java.base`), zero transitive vulnerabilities.
- Zero-configuration LAN discovery using UDP broadcast (42069/UDP) with microsecond RTT ping/pong packets.
- Fixed 28-byte binary framing protocol (V4) with monotonic sequence counters and typed frame headers.
- Deterministic finite state machine (`TransferStateMachine`) enforcing strictly valid protocol lifecycles.
- End-to-end AES-256-GCM AEAD authenticated encryption with PBKDF2WithHmacSHA256 (100k rounds) and tamper detection.
- Deterministic crash recovery with binary disk journals (`.airsocket_journal_*.bin`) and exponential backoff retry.
- 5.41x TCP socket buffer scaling (163 Mbps -> 886 Mbps), saturating Gigabit LAN and achieving 16.3 Gbps loopback.
- Project Loom virtual threads (`Thread.ofVirtual()`) and 101 automated integration, failure, and netem tests.

Repository: https://github.com/amarpratapsingh/AirSocket
