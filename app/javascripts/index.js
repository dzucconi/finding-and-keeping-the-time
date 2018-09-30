import fps from 'frame-interval';
import { DateTime } from 'luxon';

export default () => {
  const DOM = {
    app: document.getElementById('App'),
    add: document.getElementById('Add'),
    name: document.getElementById('Name'),
    clear: document.getElementById('Clear'),
  };

  const STATE = {
    tasks: [
      // { name, start },
    ],
  };

  const persistState = () => {
    localStorage.setItem('tasks', JSON.stringify(STATE.tasks));
  };

  const hydrateState = () => {
    const payload = localStorage.getItem('tasks') || '[]';
    STATE.tasks = JSON.parse(payload)
      .map(({ name, start }) => ({ name, start: DateTime.fromISO(start) }));
  };

  const addTask = (name) => {
    STATE.tasks = [...STATE.tasks, { name, start: DateTime.local() }];
    persistState();
  };

  const renderTask = now => task => {
    const diff = now.diff(task.start, [
      'hours',
      'minutes',
      'seconds',
      'milliseconds'
    ]);

    const units = [
      `${Math.floor(diff.hours)}`.padStart(2, '0'),
      `${Math.floor(diff.minutes)}`.padStart(2, '0'),
      `${Math.floor(diff.seconds)}`.padStart(2, '0'),
      `${diff.milliseconds}`.padStart(3, '0'),
    ];

    return `
      <div class='Task'>
        ${task.name} - ${units.join(':')}
      </div>
    `;
  };

  const render = () => {
    const now = DateTime.local();
    DOM.app.innerHTML = STATE.tasks.map(renderTask(now)).join('');
  };

  hydrateState();
  render();
  fps(requestAnimationFrame)(60, render)();

  DOM.add.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(DOM.name.value);
    DOM.name.value = '';
  });

  DOM.clear.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    STATE.tasks = [];
  });
};
