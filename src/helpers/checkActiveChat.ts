export function checkActiveChat() {
    const chatList = document.querySelectorAll('.chat__item') as NodeList;
    const currentChat = window.store.getState().currentChat;

    if (!currentChat) {
        chatList?.forEach((item) => {
            if ((item as HTMLElement).classList.contains('chat__item_active')) {
                (item as HTMLElement).classList.remove('chat__item_active');
            }
        });
    } else {
        chatList?.forEach((item) => {
            if ((item as HTMLElement).dataset.id === currentChat.toString()) {
                (item as HTMLElement).classList.add('chat__item_active');
            } else {
                if ((item as HTMLElement).classList.contains('chat__item_active')) {
                    (item as HTMLElement).classList.remove('chat__item_active');
                }
            }
        });
    }
}
