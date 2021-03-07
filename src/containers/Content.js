/**
 * Content component
 */
// libraries
import React, { useEffect, useRef } from 'react';
// we import schedulerpro.umd for IE11 compatibility only. If you don't use IE import:
// import { Toast } from 'bryntum-schedulerpro';
import { Toast, WidgetHelper } from 'bryntum-schedulerpro/schedulerpro.umd';
import { BryntumScheduler } from 'bryntum-react-shared';

// our stuff
import 'bryntum-schedulerpro/schedulerpro.stockholm.css';
import TaskStore from '../lib/TaskStore.js';
import UnplannedGridComponent from '../components/UnplannedGrid.js';
import Drag from '../lib/Drag.js';

const Content = props => {

    // we need there refs for setting up dragging
    const
        scheduler = useRef(),
        grid = useRef(),
        // event store is needed by both scheduler and grid
        // so we create it before to be accessible by both
        eventStore = new TaskStore();

        const events = [
            {
                "id"           : "r1",
                "resourceId"   : 1,
                "name"         : "Restart server",
                "iconCls"      : "b-fa b-fa-movie",
                "startDate"    : "2025-12-01T08:00:00",
                "duration"     : 3,
                "durationUnit" : "h",
                "draggable"    : false,
                "resizable"    : true
            },
            {
                "id"           : "r2",
                "resourceId"   : 1,
                "name"         : "Upgrade memory",
                "iconCls"      : "b-fa b-fa-laptop",
                "startDate"    : "2025-12-01T15:00:00",
                "cls"          : "",
                "duration"     : 3,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            },
            {
                "id"           : "r3",
                "resourceId"   : 2,
                "name"         : "Visit customer",
                "iconCls"      : "b-fa b-fa-user",
                "startDate"    : "2025-12-01T09:00:00",
                "cls"          : "",
                "duration"     : 3,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            },
            {
                "id"           : "r4",
                "resourceId"   : 3,
                "name"         : "Arrange meetup",
                "iconCls"      : "b-fa b-fa-users",
                "startDate"    : "2025-12-01T09:00:00",
                "cls"          : "",
                "duration"     : 3,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            },
            {
                "id"           : "r5",
                "resourceId"   : 7,
                "name"         : "Make coffee",
                "startDate"    : "2025-12-01T12:00:00",
                "iconCls"      : "b-fa b-fa-coffee",
                "duration"     : 4,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            },
            {
                "id"           : "r6",
                "resourceId"   : 9,
                "name"         : "Conference prep",
                "iconCls"      : "b-fa b-fa-building",
                "startDate"    : "2025-12-01T09:00:00",
                "cls"          : "Special",
                "duration"     : 3,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            },
            {
                "id"           : "r16",
                "resourceId"   : 11,
                "name"         : "Presentation",
                "iconCls"      : "b-fa b-fa-video",
                "startDate"    : "2025-12-01T13:00:00",
                "cls"          : "Special",
                "duration"     : 2,
                "durationUnit" : "h",
                "draggable"    : true,
                "resizable"    : true
            }
        ], resources = [
            {
                "id"   : 1,
                "name" : "Arcady",
            },
            {
                "id"   : 2,
                "name" : "Dave",
            },
            {
                "id"   : 3,
                "name" : "Henrik",
            },
            {
                "id"   : 4,
                "name" : "Linda",
            },
            {
                "id"   : 5,
                "name" : "Maxim",
            },
            {
                "id"   : 6,
                "name" : "Mike",
            },
            {
                "id"   : 7,
                "name" : "Lee",
            },
            {
                "id"   : 8,
                "name" : "Amit",
            },
            {
                "id"   : 9,
                "name" : "Kate",
            },
            {
                "id"   : 10,
                "name" : "Jong",
            },
            {
                "id"   : 11,
                "name" : "Lola",
            },
            {
                "id"   : 12,
                "name" : "Lisa",
            },
            {
                "id"   : 13,
                "name" : "Steve",
            },
            {
                "id"   : 14,
                "name" : "Malik",
            }
        ];

    // equivalent of componentDidMount
    useEffect(() => {

        eventStore.on({
            update : onEventStoreUpdate,
            add    : onEventStoreAdd
        });

        new Drag({
            grid         : grid.current.unplannedGrid,
            schedule     : scheduler.current.schedulerInstance,
            constrain    : false,
            outerElement : grid.current.unplannedGrid
        });

        Toast.show({
            timeout : 3500,
            html : 'Please note that this example uses the Bryntum Grid, which is licensed separately.'
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * @param {Event} record Event record
     * @param {TaskStore} eventStore Event store firing the event
     *
     * Reschedules the overlapping events if the button is pressed
     */
    const onEventStoreUpdate = ({ record, source : eventStore }) => {
        if (props.autoReschedule.current) {
            eventStore.rescheduleOverlappingTasks(record);
        }
    };

    /**
     * @param {Event[]} records Array of Event records
     * @param {TaskStore} eventStore Event store firing the event
     *
     * Reschedules the overlapping events if the button is pressed
     */
    const onEventStoreAdd = ({ records, source : eventStore }) => {
        if (props.autoReschedule.current) {
            records.forEach((eventRecord) => eventStore.rescheduleOverlappingTasks(eventRecord));
        }
    };

    return (
        <div id="main">
            <BryntumScheduler
                ref = {scheduler}
                id  = "schedulerComponent"

                resources= {resources}
                events={events}

                stripeFeature           = {true}
                timeRangesFeature       = {true}
                eventMenuFeature = {{
                    items : {
                        // custom item with inline handler
                        unassign : {
                            text   : 'Unassign',
                            icon   : 'b-fa b-fa-user-times',
                            weight : 200,
                            onItem : ({ eventRecord, resourceRecord }) => eventRecord.unassign(resourceRecord)
                        }
                    }
                }}
                rowHeight  = {50}
                barMargin  = {4}
                eventColor = 'indigo'

                columns = {[
                    {
                        type           : 'resourceInfo',
                        text           : 'Name',
                        width          : 200,
                        showEventCount : false,
                    }
                ]}

                // Custom view preset with header configuration
                viewPreset = {{
                    base           : 'hourAndDay',
                    columnLinesFor : 0,
                    headers        : [
                        {
                            unit       : 'd',
                            align      : 'center',
                            dateFormat : 'ddd DD MMM'
                        },
                        {
                            unit       : 'h',
                            align      : 'center',
                            dateFormat : 'HH'
                        }
                    ]
                }}

                startDate   = {new Date(2025, 11, 1, 8)}
                endDate     = {new Date(2025, 11, 1, 18)}
                crudManager = {{
                    autoLoad   : true,
                    eventStore : eventStore,
                    transport  : {
                        load : {
                            url : '../data/data.json'
                        }
                    }
                }}

                tbar = {[
                    {
                        type : 'button',
                        ref  : 'reloadButton',
                        icon : 'b-fa b-fa-sync',
                        text : 'Reload scheduler',
                        onAction() {
                            scheduler.crudManager.load()
                                .then(() => WidgetHelper.toast('Data reloaded'))
                                .catch(() => WidgetHelper.toast('Loading failed'));
                        }
                    },
                    {
                        type  : 'button',
                        ref   : 'resetButton',
                        color : 'b-red',
                        icon  : 'b-fa b-fa-recycle',
                        text  : 'Reset database',
                        onAction() {
                            scheduler.crudManager.load({
                                // Adding a query string parameter "...&reset=1" to let server know that we want to reset the database
                                request : {
                                    params : {
                                        reset : 1
                                    }
                                }
                            })
                                .then(() => WidgetHelper.toast('Database was reset'))
                                .catch(() => WidgetHelper.toast('Database reset failed'));
                        }
                    }
                ]}
            />
            <UnplannedGridComponent
                ref        = { grid }
                eventStore = { eventStore }
            />
        </div>
    );
};

export default Content;
