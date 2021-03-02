/**
 * Unplanned grid component
 *
 * Taken from the vanilla dragfromgrid example
 */
// we import schedulerpro.umd for IE11 compatibility only. If you don't use IE import:
// import { Grid } from 'bryntum-schedulerpro';
import { Grid } from 'bryntum-schedulerpro/schedulerpro.umd';

export default class UnplannedGrid extends Grid {

    /**
     * Original class name getter. See Widget.$name docs for the details.
     * @return {string}
     */
    static get $name() {
        return 'UnplannedGrid';
    }

    static get defaultConfig() {
        return {
            features : {
                stripe : false,
                sort   : 'name'
            },

            columns : [{
                flex       : 1,
                field      : 'name',
                htmlEncode : false,
                renderer   : (data) => `<i class="${data.record.iconCls}"></i>${data.record.name}`
            }],

            rowHeight : 50
        };
    }

    construct(config) {
        super.construct(config);

        this.eventStore.on({
            // When a task is updated, check if it was unassigned and if so - move it back to the unplanned tasks grid
            update  : ({ record, changes }) => {
                if ('resourceId' in changes && !record.resourceId) {
                    this.eventStore.remove(record);
                    this.store.add(record);
                }
            },
            thisObj : this
        });
    }
};
