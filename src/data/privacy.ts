/**
 * Content for the privacy page. Every claim is checked against the app's
 * actual behaviour in the Reclaim repository.
 */

/** One line in the "in short" summary panel. */
export const shorts: string[] = [
  'No account, no sign-in, no server, and no payment of any kind.',
  'No analytics, telemetry or crash reporting.',
  'File paths and sizes are read locally and never leave the Mac.',
  'The only network request Reclaim makes is a version check, and it can be turned off.',
];

/** One numbered section of the privacy statement. */
export interface PrivacySection {
  title: string;
  paras: string[];
}

export const sections: PrivacySection[] = [
  {
    title: 'What Reclaim reads',
    paras: [
      'To measure reclaimable space, Reclaim reads the file names, sizes and modification dates inside the specific cache locations in its catalogue. It does not read the contents of those files, and it does not scan the rest of your disk.',
      'Some folder names are derived from your project paths, because that is how the tools themselves name their caches. Those names are displayed to you in the app and are never sent anywhere.',
    ],
  },
  {
    title: 'What is excluded',
    paras: [
      'Credentials, settings and plugin data are not part of the catalogue and cannot be selected. That covers authentication tokens, editor and IDE configuration, key bindings, and the equivalent for every tool Reclaim supports. A unit test enforces the exclusion on every build.',
      'Settings lists every one of these exclusions, so you can see exactly what is off-limits without reading the source.',
    ],
  },
  {
    title: 'What leaves your Mac',
    paras: [
      'By default, Reclaim contacts a single endpoint — the project’s GitHub releases — to check whether a newer version is available. That request carries the app version and nothing else: no identifier, no machine details, no usage data. It can be turned off in Settings, and the app works normally without it.',
      'There is no other outbound network activity.',
    ],
  },
  {
    title: 'No payments',
    paras: [
      'Reclaim is free and open source. There is nothing to buy, no license key, no subscription and no payment processor involved, so there is no billing data to collect in the first place.',
      'The full source is published, and you are welcome to read it, build it yourself, or check any claim on this page against it.',
    ],
  },
  {
    title: 'Cleaning and the Trash',
    paras: [
      'Items you select are moved to the Trash by default, which means they remain on your disk and recoverable until you empty it. Permanent deletion is available but must be chosen explicitly for each clean.',
      'Reclaim keeps a local history of what it removed, when, and how much space was freed. That history lives in Reclaim’s application support folder and can be cleared at any time.',
    ],
  },
  {
    title: 'Changes to this statement',
    paras: [
      'If this statement changes in a way that affects what leaves your Mac, the release notes will say so explicitly, and previous versions remain available on request.',
    ],
  },
];
