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

  render(_props, state) {
    return (
      h('div', null,
        h('div', null, h(Tasks, { tasks: state.tasks, onRemoveTask: this.removeTask.bind(this) })),
        h('div', null, h(NewTask, { onAddTask: this.addTask.bind(this) }))
      )
    );
  }
}
