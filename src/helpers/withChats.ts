import { BlockClass } from 'core/Block';

type WithChatProps = {chat: {}};
type T = Record<string, unknown>;

export function withChats<P extends WithChatProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        static cName = WrappedBlock.cName || WrappedBlock.name;

        constructor(props: P) {
            super({...props, chats: window.store.getState().chats});
        }
    } as BlockClass<Omit<P, 'chat'>>;
}
