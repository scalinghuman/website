#!/usr/bin/env bash
# Store Cloudflare Web Analytics beacon token in Keychain + GitHub Actions secret.
# Hosting remains GitHub Pages; this only enables privacy-friendly visit stats.
set -euo pipefail

SERVICE="scalinghuman-cf-web-analytics"
ACCOUNT="beacon-token"
REPO="scalinghuman/website"

echo "== Cloudflare Web Analytics setup =="
echo
echo "1) Create a free Cloudflare account (if needed): https://dash.cloudflare.com/sign-up"
echo "2) Open Web Analytics: https://dash.cloudflare.com/?to=/:account/web-analytics"
echo "3) Add a site → hostname: scalinghuman.ai"
echo "4) Choose the JavaScript snippet option (not automatic DNS)."
echo "5) Copy only the token value from the snippet, e.g."
echo "     data-cf-beacon='{\"token\":\"THIS_PART\"}'"
echo

read -r -s -p "Paste PUBLIC_CF_BEACON_TOKEN (input hidden): " TOKEN
echo
if [[ -z "${TOKEN}" ]]; then
  echo "No token provided; exiting."
  exit 1
fi

# Save to macOS Keychain (update if exists)
if security find-generic-password -s "${SERVICE}" -a "${ACCOUNT}" >/dev/null 2>&1; then
  security delete-generic-password -s "${SERVICE}" -a "${ACCOUNT}" >/dev/null 2>&1 || true
fi
security add-generic-password -s "${SERVICE}" -a "${ACCOUNT}" -w "${TOKEN}" -T ""
echo "✓ Stored in Keychain (service: ${SERVICE})"

# Local .env for preview builds (gitignored)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
printf 'PUBLIC_CF_BEACON_TOKEN=%s\n' "${TOKEN}" > "${ROOT}/.env"
echo "✓ Wrote ${ROOT}/.env (gitignored)"

# GitHub Actions secret for production builds
if command -v gh >/dev/null 2>&1; then
  printf '%s' "${TOKEN}" | gh secret set PUBLIC_CF_BEACON_TOKEN --repo "${REPO}"
  echo "✓ Set GitHub secret PUBLIC_CF_BEACON_TOKEN on ${REPO}"
else
  echo "! gh not found — set the secret manually:"
  echo "  gh secret set PUBLIC_CF_BEACON_TOKEN --repo ${REPO}"
fi

echo
echo "Next: commit/push the analytics code (if not already), or re-run the deploy workflow:"
echo "  gh workflow run deploy.yml --repo ${REPO}"
echo
echo "Dashboard: https://dash.cloudflare.com/?to=/:account/web-analytics"
echo "Done. GitHub Pages hosting is unchanged."
