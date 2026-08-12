/**
 * Content for the support page. Every claim here is checked against the
 * app's actual behaviour (Sources/ in the Reclaim repository) — if the
 * app changes, this file is what needs updating.
 */

import { SITE } from './site';

/** A way to reach support, rendered as a card in the channels grid. */
export interface Channel {
  title: string;
  detail: string;
  action: string;
  href: string;
}

/** One disclosure in the FAQ accordion. */
export interface Faq {
  question: string;
  answer: string;
  /** Optional command or snippet shown after the answer. */
  code?: string;
}

/** One "if something went wrong" recovery note. */
export interface Recovery {
  title: string;
  text: string;
}

export const channels: Channel[] = [
  {
    title: 'GitHub issues',
    detail: 'For bugs, feature requests and new tools to cover.',
    action: 'Open an issue',
    href: SITE.issues,
  },
  {
    title: 'Release notes',
    detail: 'What changed in each version, including catalogue additions.',
    action: 'Read the changelog',
    href: SITE.releases,
  },
  {
    title: 'Catalogue',
    detail: 'Every location Reclaim knows about, with its safety rating — one reviewed Swift file.',
    action: 'Browse the list',
    href: SITE.catalogue,
  },
];

export const faqs: Faq[] = [
  {
    question: 'Is it safe to remove derived data?',
    answer:
      'Yes. Xcode rebuilds it on the next build, which will be slower than usual and then back to normal. It is the single largest recoverable item on most developer Macs.',
  },
  {
    question: 'Where do deleted items go?',
    answer:
      'To the Trash, by default. Nothing is permanently removed until you empty it, so a clean can be undone from the Trash. Permanent deletion is available in the confirmation sheet, but it has to be chosen again for every clean.',
  },
  {
    question: 'Why won’t Reclaim delete my Docker disk?',
    answer:
      'The VM disk is one sparse image holding every image, container and volume, and it does not shrink when you remove things from inside it. Deleting the file destroys all of them at once. Reclaim measures it and hands the job to Docker, which prunes from the inside and lets Docker Desktop compact the disk. Add --volumes to remove volumes too.',
    code: 'docker system prune -a',
  },
  {
    question: 'Why is the Go module cache handled differently?',
    answer:
      'Go stores module files read-only on purpose, so a plain delete fails partway through and leaves the cache in a broken state. The Go toolchain clears it correctly.',
    code: 'go clean -modcache',
  },
  {
    question: 'Will it touch my Claude Code login or settings?',
    answer:
      'No. Authentication, settings and plugins are not part of the catalogue and cannot be selected, and a unit test enforces that on every build. Only caches, logs and, if you explicitly choose them, session transcripts are ever offered.',
  },
  {
    question: 'What happens if I delete session transcripts?',
    answer:
      'You lose the ability to resume or rewind those conversations. Nothing else in Claude Code is affected, which is why transcripts are rated Caution rather than Safe. If they keep growing back, set a retention period in ~/.claude/settings.json and Claude Code prunes them on its own.',
    code: '"cleanupPeriodDays": 30',
  },
  {
    question: 'Does removing an Android system image break my emulators?',
    answer:
      'Any emulator built on that image stops booting until the image is downloaded again from the SDK Manager. Nothing is lost for good, but it is why system images are rated Caution.',
  },
  {
    question: 'Can it clean up inside my own projects?',
    answer:
      'Yes, if you add your development folders from the welcome screen or in Settings. Reclaim looks inside each project for artifacts a tool can rebuild, like node_modules, build outputs and virtualenvs. A folder is only offered when a marker file proves which tool generates it, the way package.json vouches for node_modules, so your source files are never touched. Cleaned artifacts go to the Trash like everything else.',
  },
  {
    question: 'Can I run it on a schedule?',
    answer:
      'Yes. Settings has a weekly background scan, and with “Open at login” enabled it keeps running without opening the app yourself. An optional notification fires when more than 25 GB is reclaimable. The scan never cleans anything on its own.',
  },
  {
    question: 'Does it need Full Disk Access?',
    answer:
      'Only for a few locations inside ~/Library that macOS protects. Reclaim works without it and shows a banner instead of failing — protected locations can simply measure as empty until access is granted in System Settings → Privacy & Security.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Nothing. Reclaim is free and open source under the MIT license, with no paid tier, no license keys and no account. If it saves you a weekend of disk archaeology, an issue or a pull request is the only thanks the project needs.',
  },
];

export const recovery: Recovery[] = [
  {
    title: 'A clean removed too much',
    text: 'Open the Trash and use Put Back — macOS remembers where every item came from. History records exactly what was moved, when, and how much space it freed.',
  },
  {
    title: 'Xcode is behaving strangely after a clean',
    text: 'Quit and reopen it. Derived data and module caches rebuild on the next build; a stale Xcode session sometimes keeps pointing at folders that are gone.',
  },
  {
    title: 'The scan reports less than expected',
    text: 'Locations that need Full Disk Access can measure as empty until it is granted. Grant it in System Settings → Privacy & Security, then rescan.',
  },
  {
    title: 'Sizes look wrong on an APFS volume',
    text: 'APFS clones and snapshots can share blocks, so freeing a folder may release less than its reported size. Reclaim reports the on-disk size of the files themselves.',
  },
];
