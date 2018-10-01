import uuid from 'uuid/v4';
import { DateTime } from 'luxon';

const { h, Component } = window.preact;

export default class NewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
    };
  }

  addTask(e) {
    e.preventDefault();

    const { name } = this.state;

    this.props.onAddTask({
      id: uuid(),
      name,
      start: DateTime.local(),
    });
  }

  handleInput({ target: { value: name }}) {
    this.setState({ name });
  }

  render() {
    return (
      h('form', { onSubmit: this.addTask.bind(this) },
        h('input', {
          name: 'Name',
          placeholder: 'Add task',
          autofocus: true,
          required: true,
          autocomplete: 'off',
          onInput: this.handleInput.bind(this),
        })
      )
    );
  }
}
