import React, { Component } from 'react';
import {connect} from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StreamFeed from "./StreamFeed";
import channelSelector, {channelById} from '../../selectors/channels';
import {deleteStream, positionStream, updateStream} from '../../requests/streams';

// fake data generator
// const getItems = streams =>
//   streams.map(k => ({
//     id: k.id,
//     content: k.title,
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0px ${grid}px 0px 5px`,
  width: `500px`,
  minWidth: `320px`,
  height: `auto`,

  // change background colour if dragging
  background: isDragging ? '#efefef' : '#efefef',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getTitleStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    background: isDragging ? 'lightgreen' : 'white',
  
    // styles we need to apply on draggables
    //...draggableStyle,
  });

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

class StreamItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.streams.length ? this.props.streams : [],
      currentItemId: "",
      titleText: ""
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount(){
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    }, () => positionStream(result.draggableId, items));
  }

  handleStreamClose = (currentItem) => {
    this.setState(() => ({
      items: this.state.items.filter(item => item !== currentItem)
    }), () => deleteStream(currentItem.id));
  }

  handleTitleChange = (e) => {
    let val = e.target.value;

    this.setState(() => ({
      titleText: val
    }));
  }

  handleTitleChangeSubmit = () => {
    const currentItemId = this.state.currentItemId;
    const titleText = this.state.titleText;
    this.setState(() => ({
        items: this.state.items.map(item => {
            if(item.id === currentItemId){
              item.title = titleText;
            }
            return item;
        }),
        currentItemId: "",
        titleText: ""
    }), () => updateStream(currentItemId, titleText));
  }
  
  handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    if(typeof e === "undefined") return;

    if(e.target.getAttribute('data-editable')) return;

    let item = {id: "", title: ""};

    if (item = e.target.getAttribute('data-editable-item')) {
      item = JSON.parse(item);
      this.setState(() => ({
        currentItemId: item.id,
        titleText: item.title
      }));
      return;
    }

    this.handleTitleChangeSubmit();
  };

  handleKeyDown = (e) => {

    if(e.key === "Enter") {
      this.handleTitleChangeSubmit();
    }
  }


  render() {
    const {channels} = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => {
                const channel = channelById(channels, {id: item.channel_id});
                return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                    
                      <h3 style={getTitleStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )} className="stream-title">
                        <i className={`fa fa-${item.network} ${item.network}_color`}></i> 
                        
                          { this.state.currentItemId == item.id ? 
                            <input type="text" className="text-cursor" maxLength="14" data-editable={true} onKeyDown={this.handleKeyDown} onChange={this.handleTitleChange} value={this.state.titleText} /> : 
                            <span className="text-cursor" data-editable-item={JSON.stringify(item)}> {item.title} </span> } 
                            
                            <span className="stream-user">{item.network == "twitter" ? channel.username : channel.name}</span>
                        <i className={'fa fa-close pull-right'} onClick={() => this.handleStreamClose(item)}></i>
                        </h3>

                      <StreamFeed streamItem = {item} channel={channel}/>
                      
                    </div>
                  )}
                </Draggable>
              )})}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  const channels = channelSelector(state.channels.list, {selected: undefined, provider: undefined, publishable: true});
  return {
      channels
  }
}

export default connect(mapStateToProps)(StreamItems);
