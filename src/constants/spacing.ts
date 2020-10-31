/* eslint-disable prettier/prettier */
import type { Writeable, FormatKeywordsValue, FormatMultipliers} from './types'
import variables from './variables';

const keywords = {
  mg: 'margin',
  mgv: 'marginVertical',
  mgh: 'marginHorizontal',
  mgt: 'marginTop',
  mgr: 'marginRight',
  mgb: 'marginBottom',
  mgl: 'marginLeft',
  pg: 'padding',
  pgv: 'paddingVertical',
  pgh: 'paddingHorizontal',
  pgt: 'paddingTop',
  pgr: 'paddingRight',
  pgb: 'paddingBottom',
  pgl: 'paddingLeft',
} as const;

const multipliers = [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2, 2.5, 3, 4, 4.5, 5, 8] as const;

type KeywordType = typeof keywords;
type Keywords = keyof KeywordType;

type MultipliersArray = typeof multipliers;
type MultipliersString = FormatMultipliers<Writeable<MultipliersArray>>[number];

type KeywordsValue = FormatKeywordsValue<KeywordType, MultipliersString>;
type KeywordValueAt<T extends keyof KeywordsValue> = KeywordsValue[T]

type SpacingLabel = `${Keywords}${MultipliersString}`;
type Spacings = {[k1 in SpacingLabel]: {[k2 in KeywordValueAt<k1>] : number}}

const createSpacings = (
  _keywords: { [key in Keywords]: string },
  _multipliers: MultipliersArray,
) : Spacings  => {
  const spacings: any = {};

  Object.entries(_keywords).forEach(([key, keyword]) => {
    _multipliers.forEach((multiplier) => {
      const spacingKey: SpacingLabel = `${key}${multiplier.toString().replace('.', '_')}` as SpacingLabel
      spacings[spacingKey] = {
        [keyword]: variables.baseSpacer * multiplier,
      };
    });
  });
  return spacings as Spacings;
};

const spacing = createSpacings(keywords, multipliers);

export default spacing;
