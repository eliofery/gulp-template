import { pxToRem } from '@/utils'

export enum StateClass {
  IsActive = 'is-active',
  IsLock = 'is-lock',
  IsExpanded = 'is-expanded',
  IsSelected = 'is-selected',
  IsCurrent = 'is-current',
  IsOnTheLeftSide = 'is-on-the-left-side',
  IsOnTheRightSide = 'is-on-the-right-side',
}

export const MatchMedia = {
  mobile: window.matchMedia(`(width <= ${pxToRem(767.98)}rem)`),
}
