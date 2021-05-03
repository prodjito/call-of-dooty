import React from 'react'
import { NerdGraphQuery, Spinner } from 'nr1'
import Emoji from './emoji'

const queryString = 
`{
    actor {
        entitySearch(queryBuilder: {alertSeverity: CRITICAL}) {
            results {
                entities {
                    name
                }
            }
        }
    }
}`

export default class CallOfDooty extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMute: true,
            criticalEntities: []
        }

        this.toggleMute = this.toggleMute.bind(this)
    }

    toggleMute() {
        this.setState( state => ({
            isMute: !state.isMute
        }));
    }

    render() {

        return (
            <div>
                <button onClick={this.toggleMute}>{this.state.isMute ? 'Unmute' : 'Mute'}</button>
                <NerdGraphQuery query={queryString}>
                    {({loading, error, data}) => {
                        
                        if(loading){
                            return <Spinner />
                        }
                        if(error){
                            return 'Error!'
                        }

                        let criticalEntities = []
                        let index = 0;
                        data.actor.entitySearch.results.entities.forEach(element => {
                            criticalEntities.push(<Emoji key={index} isMute = {this.state.isMute} serviceName={element.name}/>)
                            index++;
                        });
                        return criticalEntities
                    }}
                </NerdGraphQuery>
            </div>
            
        )
    }
}