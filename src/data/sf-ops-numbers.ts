// src/data/sf-ops-numbers.ts
// The SF Ops numbers on /services (positioning P2): two or three, pulled from
// SF Ops by a session, approved by Sonja in the PR, refreshed by hand each
// quarter. Each carries the date it was true on.
//
// `approvedBy` stays null until Sonja says yes to these exact values in a PR.
// While it is null the page does not show the numbers at all, so an
// unapproved number can never reach streichforce.com. Refreshing a number
// means a new value, a new `asOf`, and `approvedBy` back to null until she
// approves it again.
export type SfOpsNumber = { value: string; label: string };

export const SF_OPS_NUMBERS: {
  asOf: string; // YYYY-MM-DD the query ran
  approvedBy: string | null; // e.g. "Sonja, 2026-10-10 (#20)"
  numbers: SfOpsNumber[];
} = {
  asOf: '2026-10-09',
  approvedBy: null,
  numbers: [
    { value: '70+', label: 'Work orders closed on SF Ops since June 2026' },
    { value: '77', label: 'Work summaries sent to customers' },
    { value: '39 of 40', label: 'invoice payments made electronically, by pay link or bank transfer' },
  ],
};
