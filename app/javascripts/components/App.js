import { DateTime } from 'luxon';
import Store from '../lib/Store';
import NewTask from './NewTask';
import Tasks from './Tasks';

window.Store = Store;

const { h, Component } = window.preact;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: Store.get(),
    };
  }

  withoutTask(id) {
    return this.state.tasks.filter(task => task.id !== id);
  }

  findTask(id) {
    return this.state.tasks.find(task => task.id === id);
  }

  addTask(task) {
    this.setState({
      tasks: [...this.state.tasks, task],
    });

    Store.set(this.state.tasks);
  }

  removeTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id),
    });

    Store.set(this.state.tasks);
  }

  pauseTask(id) {
    const task = this.findTask(id);
    const tasks = this.withoutTask(id);
    const index = this.state.tasks.indexOf(task);

    tasks.splice(index, 0, {
      ...task, pause: DateTime.local(),
    });

    this.setState({ tasks });

    Store.set(this.state.tasks);
  }

  playTask(id) {
    const task = this.findTask(id);
    const tasks = this.withoutTask(id);
    const index = this.state.tasks.indexOf(task);

    tasks.splice(index, 0, {
      ...task,
      start: task.start.plus(DateTime.local().diff(task.pause)),
    });

    this.setState({ tasks });

    Store.set(this.state.tasks);
  }

  render(_props, state) {
    return (
      h('div', null,
        h('div', null, h(Tasks, {
          tasks: state.tasks,
          onRemoveTask: this.removeTask.bind(this),
          onPauseTask: this.pauseTask.bind(this),
          onPlayTask: this.playTask.bind(this),
        })),

        h('div', null, h(NewTask, { onAddTask: this.addTask.bind(this) }))
      )
    );
  }
}
