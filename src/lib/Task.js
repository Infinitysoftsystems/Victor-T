/**
 * Custom Task model
 *
 * Taken from the vanilla dragfromgrid example
 */
// we import schedulerpro.umd for IE11 compatibility only. If you don't use IE import:
// import { SchedulerEventModel } from 'bryntum-schedulerpro';
import { SchedulerEventModel } from 'bryntum-schedulerpro/schedulerpro.umd';

export default class Task extends SchedulerEventModel {
    static get defaults() {
        return {
            // in this demo, default duration for tasks will be hours (instead of days)
            durationUnit : 'h'
        };
    }
}
