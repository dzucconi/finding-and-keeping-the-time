const { h, Component } = window.preact;

export default class RemoveTask extends Component {
  handleClick(e) {
    e.preventDefault();

    this.props.onClick(this.props.id);
  }

  render() {
    return h('a', { onClick: this.handleClick.bind(this) }, '×');
  }
}
