export enum AssetType {
  Laptop = 'laptop',
  Keyboard = 'keyboard',
  Mouse = 'mouse',
  Headset = 'headset',
  Monitor = 'monitor'
}

export class Asset {
  id?: string | number | null;
  brand?: string | null;
  model?: string | null;
  type?: string | null;
  developers?: [] | null;
}
