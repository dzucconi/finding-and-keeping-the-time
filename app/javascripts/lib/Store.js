import { DateTime } from 'luxon';

const NAMESPACE = 'FINDING_AND_KEEPING_THE_TIME';
const KEY = `${NAMESPACE}__TASKS`;

export default {
  set(tasks) {
    window.localStorage.setItem(KEY, JSON.stringify(tasks));
  },

  get() {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || '[]');

    return parsed.map(task => {
      if (task.pause) {

        const pause = DateTime.fromISO(task.pause);
        const start = DateTime.fromISO(task.start)
        const apparent = start.plus(DateTime.local().diff(pause));

        return { ...task, start, pause, apparent };
      }

      return {
        ...task,
        start: task.start && DateTime.fromISO(task.start),
      };
    });
  },
};
