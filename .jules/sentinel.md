## 2024-05-18 - Client-Side DoS via FileReader Memory Exhaustion
**Vulnerability:** Missing input length limits on file uploads allowed arbitrarily large files to be read entirely into memory as Base64 strings via `FileReader.readAsDataURL()`, potentially crashing the user's browser or exhausting API rate limits/quotas.
**Learning:** Client-only applications are particularly susceptible to local DoS if large file handling isn't bounded before memory allocation.
**Prevention:** Always validate file sizes against a strict maximum (e.g., 10MB) immediately upon selection in the `onChange` handler before passing to `FileReader` or network requests.
