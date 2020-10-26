function Chat() {
  return (
    <div class="mt-4 container content_chat">
         <div class="chat_header">
            Sala de chat
        </div>
        <div class="chat_room" id="chat_room" data-spy="scroll">
        </div>
        <div class="input_content">
            <div class="d-table-cell w-100">
                <input type="text" class="form-control rounded-0" id="textbox"/>
            </div>
            <div class="d-table-cell align-middle">
                <button id="enter" class="btn btn-primary flag_background btn_margin rounded-0">enter</button>
            </div>
        </div>
    </div>
  );
}

export default Chat;