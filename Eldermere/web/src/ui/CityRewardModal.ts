import { FACTION_DEFINITIONS, UNIT_DEFINITIONS } from '../game/data';
import type { City, CityRewardChoice, FactionId } from '../game/types';
import { renderAlderwickScene } from './AlderwickSpeech';
import { renderIcon, type IconName } from './icons';

export interface CityRewardModalViewModel {
  city: City;
  levelReached: number;
  faction: FactionId;
  /** When true, Alderwick appears above the reward sheet explaining the choice & recommending Workshop. */
  tutorialMode?: boolean;
}

export interface CityRewardModalCallbacks {
  onChoose: (cityId: string, reward: CityRewardChoice) => void;
}

interface RewardOptionSpec {
  choice: CityRewardChoice;
  icon: IconName;
  name: string;
  highlight: string;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getRewardOptions(levelReached: number, faction: FactionId): [RewardOptionSpec, RewardOptionSpec] {
  if (levelReached === 2) {
    return [
      { choice: 'workshop', icon: 'anvil', name: 'Workshop', highlight: '+1★ / Turn' },
      { choice: 'explorer', icon: 'compass', name: 'Scout', highlight: 'Reveals 10 Fog Tiles' },
    ];
  }

  if (levelReached === 3) {
    return [
      { choice: 'city_wall', icon: 'shield', name: 'City Walls', highlight: '2.0x Defense' },
      { choice: 'resources', icon: 'star', name: 'Coffers', highlight: '+5★ Now' },
    ];
  }

  if (levelReached === 4) {
    return [
      { choice: 'border_growth', icon: 'banner', name: 'Borders', highlight: 'Expand to 5×5' },
      { choice: 'pop_growth', icon: 'wheat', name: 'Harvest', highlight: '+3 Population' },
    ];
  }

  const factionDef = FACTION_DEFINITIONS[faction];
  const uniqueUnit = UNIT_DEFINITIONS[factionDef.uniqueUnit];

  return [
    {
      choice: 'champion',
      icon: 'crown',
      name: `${uniqueUnit.name}`,
      highlight: `Free Veteran (${uniqueUnit.maxHp + 5} HP)`,
    },
    { choice: 'park', icon: 'tree', name: 'Grand Park', highlight: '+250 Glory & +1★/Turn' },
  ];
}

export class CityRewardModal {
  private readonly root: HTMLElement;
  private readonly callbacks: CityRewardModalCallbacks;
  private openState = false;

  constructor(container: HTMLElement, callbacks: CityRewardModalCallbacks) {
    this.callbacks = callbacks;
    this.root = document.createElement('div');
    this.root.className = 'modal-backdrop reward-modal hidden';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.setAttribute('aria-label', 'City Level-Up Decree');
    container.appendChild(this.root);
  }

  public isOpen(): boolean {
    return this.openState;
  }

  public open(vm: CityRewardModalViewModel): void {
    this.openState = true;
    this.root.classList.toggle('has-alderwick', Boolean(vm.tutorialMode));
    this.render(vm);
    this.root.classList.remove('hidden');
  }

  public close(): void {
    this.openState = false;
    this.root.classList.remove('has-alderwick');
    this.root.classList.add('hidden');
  }

  public destroy(): void {
    this.root.remove();
  }

  private render(vm: CityRewardModalViewModel): void {
    const options = getRewardOptions(vm.levelReached, vm.faction);
    const cityId = vm.city.id;
    const isTutorial = Boolean(vm.tutorialMode);

    const cardsHtml = options
      .map((opt) => {
        const isRecommended = isTutorial && opt.choice === 'workshop';
        return `
          <button type="button" class="reward-card${isRecommended ? ' is-tutorial-recommended' : ''}" data-reward="${opt.choice}">
            ${isRecommended ? '<span class="reward-rec-badge">Recommended</span>' : ''}
            <div class="reward-icon" aria-hidden="true">${renderIcon(opt.icon, 'icon icon-xl')}</div>
            <div class="reward-name">${esc(opt.name)}</div>
            <div class="reward-highlight">${esc(opt.highlight)}</div>
          </button>
        `;
      })
      .join('');

    const panelHtml = `
      <div class="modal-panel reward-modal-panel">
        <div class="sheet-handle" aria-hidden="true"></div>
        <div class="reward-level-banner">
          ${renderIcon('crown', 'icon icon-sm')}
          <span>Level ${vm.levelReached}</span>
        </div>
        <h2 class="modal-title" style="justify-content: center;">${esc(vm.city.name)}</h2>

        <div class="reward-choices">
          ${cardsHtml}
        </div>
      </div>
    `;

    if (isTutorial) {
      const alderwickHtml = renderAlderwickScene({
        pose: 'idea',
        variant: 'compact',
        extraClass: 'reward-alderwick-scene',
        headerHtml: `
          <span class="tutorial-icon-badge" aria-hidden="true">${renderIcon('crown', 'icon icon-xs')}</span>
          <strong class="tutorial-title">Level ${vm.levelReached} City Reward!</strong>
        `,
        bodyHtml: `
          <p class="tutorial-body">Your capital leveled up! Pick a bonus: <strong>Workshop</strong> grants +1★ every turn, while <strong>Scout</strong> reveals nearby Fog. Pick <strong>Workshop</strong> to fuel your start!</p>
        `,
      });
      this.root.innerHTML = `
        <div class="reward-modal-stack">
          ${alderwickHtml}
          ${panelHtml}
        </div>
      `;
    } else {
      this.root.innerHTML = panelHtml;
    }

    this.root.querySelectorAll<HTMLButtonElement>('[data-reward]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const choice = btn.dataset.reward as CityRewardChoice;
        if (choice) {
          this.close();
          this.callbacks.onChoose(cityId, choice);
        }
      });
    });
  }
}
