"use client";

import { FormEvent, useState } from "react";

const DOMAINS = [
  "https://local.tiket.com:3000/",
  "https://gatotkaca.tiket.com/",
] as const;

const REFERENCE_IDS = [
  "krom-linkage-success",
  "linkage-success-but-not-registered",
  "linkage-always-pending",
  "linkage-response-not-success",
  "linkage-gateway-404"
] as const;

type NavMethod = "assign" | "replace";

export default function Home() {
  const [domain, setDomain] = useState<(typeof DOMAINS)[number]>(DOMAINS[0]);
  const [referenceId, setReferenceId] = useState<(typeof REFERENCE_IDS)[number]>(
    REFERENCE_IDS[0],
  );
  const [navMethod, setNavMethod] = useState<NavMethod>("assign");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = new URL("smart_pay", domain);
    url.searchParams.set("paymentSource", "KROM");
    url.searchParams.set("referenceId", referenceId);

    window.location[navMethod](url.toString());
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-white px-4 py-8 text-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-900">Domain</span>
          <select
            value={domain}
            onChange={(event) =>
              setDomain(event.target.value as (typeof DOMAINS)[number])
            }
            className="h-10 w-full rounded border border-zinc-300 bg-white px-3 text-sm text-zinc-900"
          >
            {DOMAINS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-900">Reference ID</span>
          <select
            value={referenceId}
            onChange={(event) =>
              setReferenceId(
                event.target.value as (typeof REFERENCE_IDS)[number],
              )
            }
            className="h-10 w-full rounded border border-zinc-300 bg-white px-3 text-sm text-zinc-900"
          >
            {REFERENCE_IDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-zinc-900">Navigate method</span>
          <select
            value={navMethod}
            onChange={(event) =>
              setNavMethod(event.target.value as NavMethod)
            }
            className="h-10 w-full rounded border border-zinc-300 bg-white px-3 text-sm text-zinc-900"
          >
            <option value="assign">assign</option>
            <option value="replace">replace</option>
          </select>
        </label>

        <button
          type="submit"
          className="mt-2 h-10 w-full rounded bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Redirect
        </button>
      </form>
    </div>
  );
}
