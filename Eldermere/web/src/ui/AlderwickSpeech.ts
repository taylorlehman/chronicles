import { ALDERWICK_FULL_TITLE, ALDERWICK_NAME, ALDERWICK_POSES, type AlderwickPose } from './alderwick';
import { renderIcon } from './icons';

/**
 * Alderwick speech-bubble host.
 *
 * Renders the head-to-toe wizard sprite with a comic-style speech bubble beside him.
 * - `stage`   — large scene used for full-screen moments (tutorial intro/outro, resign, victory, defeat).
 * - `compact` — small figure + bubble pinned under the top bar during live tutorial steps; it never
 *               blocks the board (only buttons inside the bubble take pointer events).
 */
export type AlderwickSceneVariant = 'stage' | 'compact';

export interface AlderwickSceneOptions {
  pose: AlderwickPose;
  variant: AlderwickSceneVariant;
  /** Already-escaped HTML for the bubble body. */
  bodyHtml: string;
  /** Optional small header row inside the bubble (e.g. step counter). */
  headerHtml?: string;
  /** Optional footer/actions row inside the bubble. */
  actionsHtml?: string;
  /** Show the "Alderwick" name tag on the bubble. Defaults to true. */
  showName?: boolean;
  /** Extra classes on the scene root. */
  extraClass?: string;
  /** Replays the entrance animation (pop-in) when true. Defaults to true. */
  animate?: boolean;
  /** Bubble pulse for nudges. */
  nudged?: boolean;
}

export function renderAlderwickScene(opts: AlderwickSceneOptions): string {
  const showName = opts.showName ?? true;
  const animate = opts.animate ?? true;
  const classes = [
    'alderwick-scene',
    `is-${opts.variant}`,
    `pose-${opts.pose}`,
    animate ? 'is-entering' : '',
    opts.nudged ? 'is-nudged' : '',
    opts.extraClass ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div class="${classes}">
      <div class="alderwick-figure-wrap" aria-hidden="true">
        <img
          class="alderwick-figure"
          src="${ALDERWICK_POSES[opts.pose]}"
          alt=""
          draggable="false"
        />
        <span class="alderwick-figure-shadow"></span>
      </div>
      <div class="alderwick-bubble" role="group" aria-label="${ALDERWICK_FULL_TITLE} says">
        ${showName ? `<span class="alderwick-bubble-name">${renderIcon('star', 'icon icon-xs')}<span>${ALDERWICK_NAME}</span></span>` : ''}
        ${opts.headerHtml ? `<div class="alderwick-bubble-header">${opts.headerHtml}</div>` : ''}
        <div class="alderwick-bubble-body">${opts.bodyHtml}</div>
        ${opts.actionsHtml ? `<div class="alderwick-bubble-actions">${opts.actionsHtml}</div>` : ''}
      </div>
    </div>
  `;
}

export interface AlderwickDialoguePage {
  pose: AlderwickPose;
  bodyHtml: string;
  headerHtml?: string;
  /** Label for the advance button on this page. */
  actionLabel: string;
}

/**
 * Mounts a multi-page Alderwick conversation into `host` (stage variant). Each button press
 * advances to the next page with a fresh pop-in; the final page calls `onDone`.
 */
export function mountAlderwickDialogue(
  host: HTMLElement,
  pages: readonly AlderwickDialoguePage[],
  onDone: () => void,
  extraClass = '',
): void {
  let index = 0;

  const renderPage = (): void => {
    const page = pages[index];
    if (!page) return;
    const isLast = index === pages.length - 1;
    const dots =
      pages.length > 1
        ? `<span class="alderwick-page-dots" aria-hidden="true">${pages
            .map((_, i) => `<i class="${i === index ? 'is-active' : ''}"></i>`)
            .join('')}</span>`
        : '';
    host.innerHTML = renderAlderwickScene({
      pose: page.pose,
      variant: 'stage',
      bodyHtml: page.bodyHtml,
      headerHtml: page.headerHtml,
      extraClass,
      actionsHtml: `
        ${dots}
        <button type="button" class="btn btn-cta alderwick-bubble-cta" data-alderwick-advance>
          <span>${page.actionLabel}</span>
          ${renderIcon('chevronRight', 'icon icon-sm')}
        </button>
      `,
    });

    const btn = host.querySelector<HTMLButtonElement>('[data-alderwick-advance]');
    btn?.addEventListener('click', () => {
      if (isLast) {
        onDone();
        return;
      }
      index += 1;
      renderPage();
    });
    // Keep keyboard users on the conversation.
    btn?.focus({ preventScroll: true });
  };

  renderPage();
}
