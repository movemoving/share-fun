import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'
import PageModal from 'components/PageModal'
import ListView from 'components/QaListView'
import { IRootStore, IRootAction } from 'typings'
import { IData } from '../Todo/stores/todoStore'

import './index.scss'
import { emptyFn } from 'utils'
import AnswerPage from '../Answer'

@inject(injector)
@observer
class Post extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-post',
  }

  state = {
    search: '',
    answerPageModal: false,
    answerPageKey: '',
    answerPageInfo: {} as IData,
  }

  async componentDidMount() {
    const { action, onBadgeChange = emptyFn } = this.props

    await action!.getListData(false, onBadgeChange)
  }

  handleSearchChange = (val: string) => {
    this.setState({ search: val })
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleListItemClick = (id: string, info: IData, cover: string) => {
    const { history } = this.props
    history.push(`/post?detail=${id}`)

    this.setState({
      answerPageKey: id,
      answerPageModal: true,
      answerPageInfo: Object.assign({ cover }, info),
    })
  }

  handleEndReached = (_event: any) => {
    // load new data
    console.log('reach end')

    const { store, action } = this.props
    const { pageIndex, totalPage } = store!

    if (pageIndex === totalPage) {
      return
    }

    action!.getNextListData(pageIndex)
  }

  handleRefresh = () => {
    const { action, onBadgeChange = emptyFn } = this.props

    action!.getListData(true, onBadgeChange, 1)
  }

  handleBack = () => {
    const { action, onBadgeChange = emptyFn } = this.props

    action!.getListData(true, onBadgeChange, 1)
    this.handleModalClose('answerPageModal')
  }

  render() {
    const { prefixCls, store } = this.props
    const { search, answerPageModal, answerPageKey, answerPageInfo } = this.state

    const { dataList, loading, refreshing, pageSize } = store!

    return (
      <div className={prefixCls}>
        <SearchBar value={search} placeholder="??????..." maxLength={20} onChange={this.handleSearchChange} />
        <ListView
          dataList={dataList}
          loading={loading}
          onEndReached={this.handleEndReached}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onClick={this.handleListItemClick}
          pageSize={pageSize}
        />
        <PageModal visible={answerPageModal}>
          <AnswerPage id={answerPageKey} info={answerPageInfo} poster onCancel={this.handleBack} />
        </PageModal>
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onBadgeChange: (type: string, num: number) => void
  history: any
}

interface IState extends Partial<injectorReturnType> {
  search: string
  answerPageModal: boolean
  answerPageKey: string
  answerPageInfo: IData
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Post.postStore,
    action: rootAction.Post.postAction,
  }
}

export default withRouter(Post)
