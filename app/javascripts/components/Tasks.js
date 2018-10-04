import Task from './Task';

const { h, Component } = window.preact;

export default class Tasks extends Component {
  render(props) {
    const { tasks, ...rest } = props;

    return (
      h('div', null, tasks.map(task =>
        h(Task, { task, ...rest })))
    );
  }
}
