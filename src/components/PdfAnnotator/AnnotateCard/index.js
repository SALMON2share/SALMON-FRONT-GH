import React from "react";
import Button from "@material-ui/core/Button";
import EmojiPicker from "emoji-picker-react";
import { connect } from "react-redux";
import { saveReply, updateReply, deleteReply } from "../../../actions";
class AnnotateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReply: false,
      lineHeight: 40,
      displayEmoji: false,
      isEdit: false,
      editIndex: [],
      replySectionEmoji: [],
      reply: ""
    };
    this.replySections = [];
    this.replySmile = [];
    this.replySmilePosition = [];
    this.increaseLineNumber = this.increaseLineNumber.bind(this);
  }
  increaseLineNumber = height => {
    this.setState({ lineHeight: height });
  };
  /**
   * function to update a reply
   */
  updateReply = (isPublic, index, highlight) => {
    let temp = this.state.editIndex;
    let pos = this.state.editIndex.indexOf(index);
    temp = temp.slice(0, pos).concat(temp.slice(pos + 1, temp.length));
    let tempReplySectionEmoji = this.state.replySectionEmoji.slice();
    let position = this.state.replySectionEmoji.indexOf(index);
    tempReplySectionEmoji = tempReplySectionEmoji
      .slice(0, position)
      .concat(
        tempReplySectionEmoji.slice(position + 1, tempReplySectionEmoji.length)
      );
    let replyMessage = this.replySections[index].innerHTML.trim();
    replyMessage = replyMessage.replace(/&nbsp;/g, " ");
    const reply = {
      username: this.props.username,
      isPublic: isPublic,
      comment: replyMessage.trim()
    };
    this.props.onUpdateReply({
      url: this.props.url,
      id: highlight.id,
      position: index,
      reply
    });
    this.setState({
      editIndex: temp,
      replySectionEmoji: tempReplySectionEmoji
    });
    this.props.onDemoCardChange()
  };
  /**
   * function to delete a reply
   */
  deleteReply = (index, highlight) => {
    let temp = this.state.editIndex;
    let pos = this.state.editIndex.indexOf(index);
    temp = temp.slice(0, pos).concat(temp.slice(pos + 1, temp.length));
    let tempReplySectionEmoji = this.state.replySectionEmoji.slice();
    let position = this.state.replySectionEmoji.indexOf(index);
    tempReplySectionEmoji = tempReplySectionEmoji
      .slice(0, position)
      .concat(
        tempReplySectionEmoji.slice(position + 1, tempReplySectionEmoji.length)
      );
    this.props.onDeleteReply({
      url: this.props.url,
      id: highlight.id,
      position: index
    });
    this.setState({
      editIndex: temp,
      replySectionEmoji: tempReplySectionEmoji
    });
    this.props.onDemoCardChange()
  };
  /**
   * function to save a reply
   */
  saveReply = (highlight, isPublic) => {
    let replyMessage = this.replyInput.innerHTML;
    replyMessage = replyMessage.replace(/&nbsp;/g, " ");
    const reply = {
      username: this.props.username,
      isPublic: isPublic,
      comment: replyMessage.trim()
    };
    this.props.onSaveReply({
      url: this.props.url,
      id: highlight.id,
      reply
    });
    this.setState({
      isReply: false,
      displayEmoji: false,
      lineHeight: 40
    });
    this.props.onDemoCardChange()
  };

  setHTML = (index, comment) => {
    if (
      this.replySections !== undefined &&
      this.replySections[index] !== null &&
      this.replySections[index] !== undefined &&
      this.state.editIndex.indexOf(index) === -1
    )
      this.replySections[index].innerHTML = comment;
    //return null;
  };

  shouldComponentUpdate(state, props) {
    if (state.highlight !== this.state.highlight) {
      this.forceUpdate();
    }
    return true;
  }
  render() {
    const { highlight } = this.props;
    return (
      <li
        className="sidebar__highlight"
        onClick={() => {
          this.props.updateHash(highlight);
        }}
      >
        <div>
          <strong>{highlight.comment.text}</strong>
          {highlight.content.text ? (
            <blockquote style={{ marginTop: "0.5rem" }}>
              {`${highlight.content.text.slice(0, 90).trim()}…`}
            </blockquote>
          ) : null}
          {highlight.content.image ? (
            <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
              <div />
              <img src={highlight.content.image} alt={"Screenshot"} />
            </div>
          ) : null}
        </div>
        <div className="highlight__location">
          Page {highlight.position.pageNumber}
        </div>
        {highlight.reply.map((reply, index) => {
          return (
            <div className={"comment_section"}>
              <div className={"reply_username"}>
                {reply.isPublic ? reply.username : "anonymous"}
              </div>
              <div
                className={
                  this.state.editIndex.indexOf(index) === -1
                    ? "reply_text_editable"
                    : "reply_text"
                }
              >
                <div
                  className={"reply_comment"}
                  ref={comment => (this.replySections[index] = comment)}
                  contentEditable={this.state.editIndex.indexOf(index) > -1}
                >
                  {this.setHTML(index, reply.comment)}
                </div>
                {this.state.editIndex.indexOf(index) === -1 ? (
                  <i
                    class="fa fa-pencil"
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      this.setState({
                        editIndex: [...this.state.editIndex, index]
                      });
                    }}
                  />
                ) : (
                  <div>
                    <i
                      class="far fa-smile"
                      style={{ marginRight: 10 }}
                      ref={smile => (this.replySmile[index] = smile)}
                      onClick={event => {
                        this.replySmilePosition[index] = this.replySmile[
                          index
                        ].getBoundingClientRect();
                        let temp = this.state.replySectionEmoji.slice();
                        if (this.state.replySectionEmoji.indexOf(index) > -1) {
                          let pos = this.state.replySectionEmoji.indexOf(index);
                          temp = temp
                            .slice(0, pos)
                            .concat(temp.slice(pos + 1, temp.length));
                        } else {
                          temp.push(index);
                        }
                        this.setState({
                          replySectionEmoji: temp
                        });
                      }}
                    />
                    <i
                      class="fa fa-save"
                      style={{ marginRight: 10 }}
                      onClick={() =>
                        this.updateReply(reply.isPublic, index, highlight)
                      }
                    />
                    <i
                      class="fa fa-trash"
                      style={{ marginRight: 10 }}
                      onClick={() => this.deleteReply(index, highlight)}
                    />
                    {this.state.replySectionEmoji.indexOf(index) > -1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: this.replySmilePosition[index].top + 40,
                          left: 50
                        }}
                      >
                        <EmojiPicker
                          onEmojiClick={event => {
                            this.replySections[index].innerHTML =
                              this.replySections[index].innerHTML +
                              "&#x" +
                              event +
                              ";";
                            let temp = this.state.replySectionEmoji.slice();
                            let pos = this.state.replySectionEmoji.indexOf(
                              index
                            );
                            temp = temp
                              .slice(0, pos)
                              .concat(temp.slice(pos + 1, temp.length));
                            this.setState({
                              replySectionEmoji: temp
                            });
                            console.log(
                              this.state.replySectionEmoji,
                              " ",
                              temp
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {!this.state.isReply && (
          <div
            className="reply_message"
            onClick={() => this.setState({ isReply: !this.state.isReply })}
          >
            Reply
          </div>
        )}

{this.state.isReply && (
  <div className={"reply_section"}>
    <div className={"reply_text"}>
      <div
        className={"reply_input"}
        ref={c => (this.replyInput = c)}
        style={{ height: this.state.lineHeight }}
        placeholder={"Write a Reply"}
        onInput={event => {
          this.setState({ reply: event.target.value });
          this.increaseLineNumber(event.target.scrollHeight);
        }}
        contentEditable={true}
      >
        {this.state.reply}
      </div>
      <i
        class="far fa-smile"
        style={{ fontSize: "1.5em" }}
        ref={smile => (this.smile = smile)}
        onClick={event => {
          this.position = this.smile.getBoundingClientRect();
          this.setState({ displayEmoji: !this.state.displayEmoji });
        }}
      />
    </div>
    {this.state.displayEmoji && (
      <div
        style={{
          position: "absolute",
          top: this.position.top + 40,
          left: 50
        }}
      >
        <EmojiPicker
          onEmojiClick={event => {
            this.replyInput.innerHTML =
              this.replyInput.innerHTML + "&#x" + event + ";";
            this.setState({
              displayEmoji: false
            });
          }}
        />
      </div>
    )}
    <div className={"button_section"}>
      <button
        onClick={() => this.saveReply(highlight, true)}
        className={"btn btn-primary"}
      >
        {"Public Post"}
      </button>
      <button
        onClick={() => this.saveReply(highlight, false)}
        className={"btn btn-primary"}
        style={{ marginLeft: "10px" }}
      >
        {"Private Post"}
      </button>
      <button
        onClick={() =>
          this.setState({
            isReply: false,
            displayEmoji: false,
            lineHeight: 40
          })
        }
        className={"btn btn-primary"}
        style={{ marginLeft: "3%" }}
      >
        {"Dismiss"}
      </button>
    </div>
  </div>
)}
</li>
);
}
}

const mapStateToProps = state => {
  return {
    url:state.pdfURL
  };
};
function mapDispatchToProps(dispatch) {
  return {
    onSaveReply: payload => {
      dispatch(saveReply(payload));
    },
    onUpdateReply: payload => {
      dispatch(updateReply(payload));
    },
    onDeleteReply: payload => {
      dispatch(deleteReply(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnotateCard);
