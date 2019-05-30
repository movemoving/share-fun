import { action, observable, computed } from 'mobx'
import { mStore } from '../../../mobx/store'
import { receiversType } from '../interface'

// interface ISomething {

// }

@mStore
export default class ExtraStore {
  @observable
  type = ''

  @observable
  expire = ''

  @observable
  receivers: receiversType = {}

  @observable
  showAuthor = true

  @observable
  secret = false

  @observable
  anonymous = false

  @action
  setType(t: string) {
    this.type = t

    return this
  }

  @action
  setExpire(t: string) {
    this.expire = t

    return this
  }

  @action
  setReceiver(r: receiversType) {
    this.receivers = r

    return this
  }

  @action
  setShowAuthor(s: boolean) {
    this.showAuthor = s

    return this
  }

  @action
  setSecret(s: boolean) {
    this.secret = s

    return this
  }

  @action
  setAnonymous(a: boolean) {
    this.secret = a

    return this
  }
}
