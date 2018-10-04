import fps from 'frame-interval';
import { DateTime } from 'luxon';

import RemoveTask from './RemoveTask';

const { h, Component } = window.preact;

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'playing',
      hours: null,
      minutes: null,
      seconds: null,
      milliseconds: null,
    };

    this.tick();
  }

  componentDidMount() {
    fps(requestAnimationFrame)(60, this.tick.bind(this))();
  }

  tick() {
    const { mode } = this.state;
    const { task } = this.props;

    if (mode === 'paused') return;

    const diff = DateTime.local()
      .diff(task.start, [
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

  render(props, state) {
    const { task, onRemoveTask } = props;
    const { mode, hours, minutes, seconds, milliseconds } = state;

    return (
      h('div', null,
        h(RemoveTask, { id: task.id, onClick: onRemoveTask }),

        h('a', { onClick: this.toggle.bind(this) }, {
          playing: 'pause',
          paused: 'play',
        }[mode]),

        h('span', null, `
          ${task.name} — ${hours}:${minutes}:${seconds}:${milliseconds}
        `)
      )
    );
  }
}
