import fps from 'frame-interval';
import { DateTime } from 'luxon';

const { h, Component } = window.preact;

export default class Task extends Component {
  constructor(props) {
    super(props);

    const mode = props.task.pause ? 'paused' : 'playing';

    this.state = {
      mode,
      hours: null,
      minutes: null,
      seconds: null,
      milliseconds: null,
    };

    this.set();
  }

  componentDidMount() {
    fps(requestAnimationFrame)(60, this.tick.bind(this))();
  }

  set() {
    const { task } = this.props;
    const target = task.apparent || task.start;

    const diff = DateTime.local()
      .diff(target, [
        'hours',
        'minutes',
        'seconds',
        'milliseconds'
      ]);

    this.setState({
      hours: `${Math.floor(diff.hours)}`.padStart(2, '0'),
      minutes: `${Math.floor(diff.minutes)}`.padStart(2, '0'),
      seconds: `${Math.floor(diff.seconds)}`.padStart(2, '0'),
      milliseconds: `${diff.milliseconds}`.padStart(3, '0'),
    });
  }

  tick() {
    if (this.state.mode === 'paused') return;
    this.set();
  }

  toggle(e) {
    e.preventDefault();

    const { mode } = this.state;
    const { task: { id }, onPauseTask, onPlayTask } = this.props;

    this.setState({
      mode: {
        paused: 'playing',
        playing: 'paused',
      }[mode],
    });

    return {
      playing: onPauseTask,
      paused: onPlayTask,
    }[mode](id);
  }

  remove(e) {
    e.preventDefault();

    const { task: { id }, onRemoveTask } = this.props;

    return onRemoveTask(id);
  }

  render(props, state) {
    const { task } = props;
    const { mode, hours, minutes, seconds, milliseconds } = state;

    return (
      h('div', { className: 'Task' },
        h('div', { className: 'Task__actions' },
          h('a', { className: 'Icon Icon--remove', onClick: this.remove.bind(this) }, ''),
          h('a', { className: `Icon Icon--${{ playing: 'pause', paused: 'play' }[mode]}`, onClick: this.toggle.bind(this) }, ''),
        ),
        h('div', { className: 'Task__display' },
          h('div', { className: `Task__label Task__label--${mode}`}, `${task.name}`),
          h('div', { className: 'Task__timer' }, `${hours}:${minutes}:${seconds}:${milliseconds}`),
        )
      )
    );
  }
}
