import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Button } from 'antd';
import { BorderOuterOutlined } from '@ant-design/icons';
import './index.less';
export default class SelectElement extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    TargetType: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
  };
  static defaultProps = { title: '选择标签', TargetType: 'TABLE' };
  MouseOverTarget = null
  onLabel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.AntModalRoot.classList.add('ListenModalAppNone')
    this.ListenModalApp.classList.add('ListenModalAppNone')
    this.ListenElementApp.classList.add('ListenElementAppNone')
    document.body.style.cursor = 'crosshair';
    document.addEventListener('mouseover', this.onMouseOver);
    document.addEventListener('click', this.onBodyClick);
    document.addEventListener('keydown', this.onKeyDown);
  }
  onMouseOver = (event) => {
    if (this.FindElements(event)) return;
    if (this.MouseOverTarget) this.MouseOverTarget.style.outline = ''
    this.MouseOverTarget = event.target.closest(this.props.TargetType.toLowerCase())
    this.MouseOverTarget && (this.MouseOverTarget.style.outline = '1px dashed #409EFF')
  };
  onBodyClick = (event) => {
    let target = event.target
    if (this.FindElements(event)) return;
    const TargetElement = target.closest(this.props.TargetType.toLowerCase())
    TargetElement.style.outline = '';
    this.Reduction(event)
    const Table = this.GenerateSelector(TargetElement)
    this.props?.onChange(Table);
  };
  FindElements = (event) => process.env.NODE_ENV !== 'development' && event.target.closest('#GlobalConfig') || event.target.closest('#ListenModalApp') || event.target.closest('#ListenElementApp')
  onKeyDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.key === 'Escape' && this.Reduction(event)
  };
  Reduction = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.MouseOverTarget = null
    document.body.style.cursor = '';
    this.AntModalRoot.classList.remove('ListenModalAppNone')
    this.ListenModalApp.classList.remove('ListenModalAppNone')
    this.ListenElementApp.classList.remove('ListenElementAppNone')
    document.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('click', this.onBodyClick);
    document.removeEventListener('keydown', this.onKeyDown);
  }
  GenerateSelector = (element) => {
    let Table = {
      thead: {
        Path: [],
        Selector: '',
        InnerText: '',
      },
      tbody: {
        Path: [],
        Selector: '',
        InnerText: '',
      },
    }
    let current = element;
    while (current && !(current === document.body)) {
      if (current.id) {
        Table.thead.Path = [`#${current.id}`, ...Table.thead.Path]
        Table.tbody.Path = [`#${current.id}`, ...Table.tbody.Path]
        break;
      }
      let sibling = current;
      let NthIndex = 1;
      while (sibling = sibling.previousElementSibling) {
        if (sibling.tagName === current.tagName) NthIndex++;
      }
      if (current.tagName.toLowerCase() === 'tbody') {
        let SelectorThead = `thead`
        Table.thead.Path = [SelectorThead, ...Table.thead.Path]
      } else if (current.tagName.toLowerCase() === 'tr') {
        let SelectorThead = `${current.tagName.toLowerCase()}:nth-of-type(1)`
        Table.thead.Path = [SelectorThead, ...Table.thead.Path]
      } else if (current.tagName.toLowerCase() === 'td') {
        let SelectorThead = NthIndex > 1 ? `th:nth-of-type(${NthIndex})` : current.tagName.toLowerCase()
        Table.thead.Path = [SelectorThead, ...Table.thead.Path]
      } else {
        let SelectorThead = NthIndex > 1 ? `${current.tagName.toLowerCase()}:nth-of-type(${NthIndex})` : current.tagName.toLowerCase()
        Table.thead.Path = [SelectorThead, ...Table.thead.Path]
      }

      let SelectorTbody = NthIndex > 1 ? `${current.tagName.toLowerCase()}:nth-of-type(${NthIndex})` : current.tagName.toLowerCase()
      current = current.parentElement
      Table.tbody.Path = [SelectorTbody, ...Table.tbody.Path]
    }
    Table.thead.Selector = Table.thead.Path.join(' > ')
    Table.tbody.Selector = Table.tbody.Path.join(' > ')
    Table.thead.InnerText = document.querySelector(Table.thead.Selector)?.innerText
    Table.tbody.InnerText = document.querySelector(Table.tbody.Selector)?.innerText
    console.log('Table', Table)
    return Table;
  }
  componentDidMount() {
    console.log(this.props)
    this.AntModalRoot = document.querySelector('div .ant-modal-root')
    this.ListenModalApp = document.querySelector('#ListenModalApp')
    this.ListenElementApp = document.querySelector('#ListenElementApp')
    const { value } = this.props
    value && (document.querySelector(value?.tbody.Selector).style.outline = '1px dashed #409EFF')
  }
  render() {
    const { title, value } = this.props
    return (
      <Button className='SelectElement' color="primary" variant="link" icon={<BorderOuterOutlined />} onClick={this.onLabel}   >
        {value ? <>{title}：{value?.tbody?.Selector}</> : title}
      </Button>
    )
  }
}
