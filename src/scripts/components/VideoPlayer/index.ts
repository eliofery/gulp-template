import Base from '@/components/Base'
import type { JQuery } from '@/utils/JQuery'
import type { Selectors } from '@/components/VideoPlayer/types'
import { rootSelector } from '@/components/VideoPlayer/consts'
import { StateClass } from '@/constants'

export default class VideoPlayer extends Base {
  private videoElement!: JQuery
  private panelElement!: JQuery
  private playButtonElement!: JQuery

  private readonly selectors: Selectors = {
    root: rootSelector,
    video: '[data-js-video-player-video]',
    panel: '[data-js-video-player-panel]',
    playButton: '[data-js-video-player-play-button]',
  }

  constructor(private rootElement: JQuery) {
    super()

    this.init()
    this.bindEvents()
  }

  protected init(): void {
    this.videoElement = this.rootElement.find(this.selectors.video)
    this.panelElement = this.rootElement.find(this.selectors.panel)
    this.playButtonElement = this.rootElement.find(this.selectors.playButton)
  }

  protected bindEvents(): void {
    this.playButtonElement.on('click', this.onPlayButtonClick.bind(this))
    this.videoElement.on('pause', this.onVideoPause.bind(this))
  }

  private onPlayButtonClick() {
    this.videoElement.play()
    this.panelElement.classRemove(StateClass.IsActive)
  }

  private onVideoPause() {
    this.videoElement.pause()
    this.panelElement.classAdd(StateClass.IsActive)
  }
}
