# ThreadTrace — High-Throughput CLI Log Analyzer
Java 21+, GraalVM Native Image (AOT), Virtual Threads, Memory-Mapped I/O, Zero-Allocation Scanning
Multi-threaded CLI log parser achieving 1.34 GB/s throughput (2.18M lines in 148ms) with <8ms native startup.

## Architectural Highlights
- Parallel chunk partitioning with newline boundary alignment across multi-core systems.
- Zero-allocation positional scanner (`tryFastParseDefault`) bypassing regex NFA backtracking.
- Signature-guided timestamp parser eliminating exception allocations.
- Allocation-free O(1) accumulation using reusable static flyweights (`ONE_ERROR`, `ONE_WARN`).
- Auto-detecting multi-format sniffer: JSON (Bunyan), Docker, Log4j, Apache/Nginx, Syslog, HDFS.
- Integrated Web Visualizer dashboard and multi-format exporters (JSON, CSV, Markdown, HTML).

Repository: https://github.com/amarpratapsingh/ThreadTrace
