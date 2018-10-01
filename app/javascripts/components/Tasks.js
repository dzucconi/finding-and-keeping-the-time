import Task from './Task';

const { h, Component } = window.preact;

export default class Tasks extends Component {
  render(props) {
    return (
      h('div', null, props.tasks.map(task => h(Task, { task, onRemoveTask: props.onRemoveTask })))
    );
  }
}
