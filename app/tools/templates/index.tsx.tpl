import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { IRootStore, IRootAction } from '${relDir}$typings'

import './index.scss'

@inject(injector)
@observer
export default class ${uppercaseName}$ extends React.Component<Props, {}> {
  static defaultProps = {
    prefixCls: '${type}$-${splitDashName}$'
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const { prefixCls } = this.props
    return (
      <div className={prefixCls}>

      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface Props extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction
}) {
  return {}
}