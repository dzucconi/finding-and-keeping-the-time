import fps from 'frame-interval';
import { DateTime } from 'luxon';

import RemoveTask from './RemoveTask';

const { h, Component } = window.preact;

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { task } = this.props;

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

  render({ task, onRemoveTask }, { hours, minutes, seconds, milliseconds }) {
    return (
      h('div', null,
        h(RemoveTask, { id: task.id, onClick: onRemoveTask }),
        h('span', null, `
          ${task.name} — ${hours}:${minutes}:${seconds}:${milliseconds}
        `)
      )
    );
  }
}
