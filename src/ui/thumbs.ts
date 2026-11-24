import type { FactionId, TechDefinition, UnitType } from '../game/types';
import { getUnitSpriteUrl, renderTechIcon } from '../render';

const UNIT_TYPE_SET: ReadonlySet<string> = new Set<UnitType>([
  'warrior',
  'defender',
  'archer',
  'rider',
  'catapult',
  'rohirrim_knight',
  'uruk_berserker',
  'elven_sentinel',
  'ironbreaker',
]);

function isUnitType(key: string): key is UnitType {
  return UNIT_TYPE_SET.has(key);
}

/**
 * Returns the direct illustrated character sprite URL for a unit + faction.
 */
export function getUnitThumbnail(unitType: UnitType, faction: FactionId): string {
  return getUnitSpriteUrl(unitType, faction);
}

/**
 * Resolves the primary thumbnail icon key for any technology node.
 * Every technology in the 64-tech Codex defines a valid unit sprite or 3D icon key.
 */
export function getTechIconKey(tech: TechDefinition): string {
  return tech.iconKey;
}

/**
 * Renders a thumbnail `<img>`: uses illustrated character sprites directly for units,
 * and falls back to offscreen 3D `renderTechIcon` for terrain/improvement/building keys.
 */
export function render3DThumbImg(
  iconKey: string,
  faction: FactionId,
  className = 'thumb-3d',
  alt = '',
): string {
  const safeAlt = alt.replace(/"/g, '&quot;');
  if (isUnitType(iconKey)) {
    const spriteUrl = getUnitThumbnail(iconKey, faction);
    if (!spriteUrl) return '';
    return `<img class="${className} thumb-sprite" src="${spriteUrl}" alt="${safeAlt}" draggable="false" />`;
  }

  try {
    const dataUrl = renderTechIcon(iconKey, faction);
    if (!dataUrl) return '';
    return `<img class="${className}" src="${dataUrl}" alt="${safeAlt}" draggable="false" />`;
  } catch {
    return '';
  }
}

export function renderUnitThumbOrIcon(
  unitType: UnitType,
  faction: FactionId,
  fallbackHtml: string,
  className = 'thumb-3d thumb-unit',
): string {
  const spriteUrl = getUnitThumbnail(unitType, faction);
  if (!spriteUrl) return fallbackHtml;
  const safeAlt = unitType.replace(/"/g, '&quot;');
  return `<img class="${className} thumb-sprite" src="${spriteUrl}" alt="${safeAlt}" draggable="false" />`;
}
