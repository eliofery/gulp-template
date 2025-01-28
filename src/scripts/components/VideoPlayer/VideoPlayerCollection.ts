import { rootSelector } from '@/components/VideoPlayer/consts'
import { $ } from '@/utils/JQuery'
import VideoPlayer from '@/components/VideoPlayer/index'

export default class VideoPlayerCollection {
  private readonly rootSelector = rootSelector

  constructor() {
    document.querySelectorAll(this.rootSelector).forEach((element: Element) => {
      new VideoPlayer($(element))
    })
  }
}
