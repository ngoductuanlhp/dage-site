#!/usr/bin/env python3
"""Serve the DAGE site, ignoring BrokenPipeError when clients disconnect early."""
import http.server
import socketserver
import sys
from pathlib import Path

# Run from this script's directory
ROOT = Path(__file__).resolve().parent

class QuietHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except BrokenPipeError:
            pass  # Client disconnected before transfer completed

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    with socketserver.TCPServer(("", port), QuietHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{port}")
        httpd.serve_forever()
