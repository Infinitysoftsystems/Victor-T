/**
 * Grid with unplanned tasks. This is just a react wrapper.
 */
// libraries
import React, { Component } from 'react';

// our stuff
import UnplannedGrid from '../lib/UnplannedGrid.js';
import Task from '../lib/Task.js';

class UnplannedGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEvents : [
                {
                    "id"           : 1,
                    "name"         : "Fun task",
                    "duration"     : 4,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-beer"
                },
                {
                    "id"           : 2,
                    "name"         : "Medium fun task",
                    "duration"     : 8,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-cog"
                },
                {
                    "id"           : 3,
                    "name"         : "Outright boring task",
                    "duration"     : 2,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-book"
                },
                {
                    "id"           : 4,
                    "name"         : "Inspiring task",
                    "duration"     : 2,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-book"
                },
                {
                    "id"           : 5,
                    "name"         : "Mysterious task",
                    "duration"     : 2,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-question"
                },
                {
                    "id"           : 6,
                    "name"         : "Answer forum question",
                    "duration"     : 4,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-life-ring"
                },
                {
                    "id"           : 7,
                    "name"         : "Gym",
                    "duration"     : 1,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-dumbbell"
                },
                {
                    "id"           : 9,
                    "name"         : "Book flight",
                    "duration"     : 7,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-plane"
                },
                {
                    "id"           : 10,
                    "name"         : "Customer support call",
                    "duration"     : 3,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-phone"
                },
                {
                    "id"           : 11,
                    "name"         : "Angular bug fix",
                    "duration"     : 3,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-bug"
                },
                {
                    "id"           : 12,
                    "name"         : "React feature fix",
                    "duration"     : 2,
                    "durationUnit" : "h",
                    "iconCls"      : "b-fa b-fa-fw b-fa-cog"
                }
            ]    
        };
        this.allowDrop = this.allowDrop.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
    }

    componentDidMount() {
        // this.unplannedGrid = new UnplannedGrid({
        //     appendTo   : 'unplannedContainer',
        //     eventStore : this.props.eventStore,
        //     store      : {
        //         modelClass : Task,
        //         readUrl    : 'data/unplanned.json',
        //         autoLoad   : true
        //     }
        // });
        this.props.eventStore.on({
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

    allowDrop(ev) {
        ev.preventDefault();
    }

     drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      

     drop(ev) {
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
      }

    render() {
        const { newEvents } = this.state;
        return (
        <React.Fragment>
            <div id="unplannedContainer">
                {newEvents && newEvents.map((e) => (
                    <div ondrop={(e) => this.drop(e)} ondragover={(e) => this.allowDrop(e)} ondragstart={(e) => this.drag(e)} draggable={true} id={e.id} className="b-grid-row">
                        <span className="name">{e.name}</span>
                        <span className="duration">{e.duration} {e.durationUnit}</span>
                    </div>
                ))}
            </div>
        </React.Fragment>
        );
    }
}

export default UnplannedGridComponent;
