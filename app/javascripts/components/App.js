import NewTask from './NewTask';
import Tasks from './Tasks';

const { h, Component } = window.preact;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  addTask(task) {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  }

  removeTask(id) {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id),
    });
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
