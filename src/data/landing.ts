/**
 * Content for the landing page. Like support.ts, every product claim is
 * checked against the app's actual behaviour in the Reclaim repository.
 */

/** One category card in the coverage grid. */
export interface Coverage {
  name: string;
  detail: string;
}

/** One safety rating row. */
export interface Rating {
  label: string;
  tone: 'safe' | 'caution' | 'destructive';
  text: string;
}

/** One "what Reclaim will not do" guarantee. */
export interface Guarantee {
  title: string;
  text: string;
}

/** One tile in the illustrative app-window mock; share is the bar width in %. */
export interface MockTile {
  name: string;
  size: string;
  share: number;
}

export const coverage: Coverage[] = [
  {
    name: 'Build systems',
    detail:
      'Derived data, intermediate objects and build outputs that every compile rewrites anyway, usually the largest single thing on a developer machine.',
  },
  {
    name: 'IDEs and editors',
    detail:
      'Project indexes, language server data, preview and snapshot caches, and the logs that editors keep long after you have stopped reading them.',
  },
  {
    name: 'Package managers',
    detail:
      'Download caches and registries across ecosystems, including versions of packages nothing on your machine still depends on.',
  },
  {
    name: 'Runtimes and SDKs',
    detail:
      'Downloaded toolchains, device support files, system images, simulators and emulators, including the ones tied to versions you no longer target.',
  },
  {
    name: 'AI tools and models',
    detail:
      'Local model weights, session transcripts and agent caches, which grow quietly and are easy to lose track of.',
  },
  {
    name: 'Containers and VMs',
    detail:
      'Virtual disks that only ever grow. Reclaim measures them and hands you the tool’s own prune command rather than reaching inside.',
  },
];

export const ratings: Rating[] = [
  {
    label: 'Safe',
    tone: 'safe',
    text: 'Regenerated automatically. Build caches, indexes and logs. The first build afterwards is slower, and nothing else changes.',
  },
  {
    label: 'Caution',
    tone: 'caution',
    text: 'Restorable, but it costs something. Large downloads have to be fetched again, and some history, like old crash symbols and past sessions, does not come back.',
  },
  {
    label: 'Destructive',
    tone: 'destructive',
    text: 'Removes things you created, like virtual devices and their saved state. Never preselected, and always flagged again at confirmation.',
  },
];

export const guarantees: Guarantee[] = [
  {
    title: 'Touch credentials or settings',
    text: 'Auth tokens, configuration and plugins are structurally excluded from the catalogue. A unit test enforces it on every build.',
  },
  {
    title: 'Reach inside another tool’s store',
    text: 'Where a tool owns its own storage, Reclaim measures it and hands you that tool’s own cleanup command instead of deleting files underneath it.',
  },
  {
    title: 'Guess',
    text: 'Every location in the catalogue is one someone identified, described and rated by hand. Nothing is removed on a pattern match.',
  },
  {
    title: 'Phone home',
    text: 'No accounts, no analytics, no crash reporting, no payment. Beyond an optional update check, nothing leaves your Mac — and you can read the code to confirm it.',
  },
];

export const mockTiles: MockTile[] = [
  { name: 'derived-data', size: '34.2 GB', share: 100 },
  { name: 'vm-disk', size: '31.4 GB', share: 92 },
  { name: 'device-support', size: '18.6 GB', share: 54 },
  { name: 'build-caches', size: '16.3 GB', share: 48 },
  { name: 'model-weights', size: '14.7 GB', share: 43 },
  { name: 'system-images', size: '12.8 GB', share: 37 },
];
