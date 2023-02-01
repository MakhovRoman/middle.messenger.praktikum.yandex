import { BlockClass } from 'core/Block';
import { AppState, User } from '../../typings/app';
import { isEqual } from './isEqual';
import chatAPI from 'api/chatsAPI';
import apiHasError from 'helpers/apiHasError';
import URL from 'api/urls';

type WithChatProps = {chat: {}};
type T = Record<string, unknown>;

export function withChats<P extends WithChatProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        static cName = WrappedBlock.cName || WrappedBlock.name;

        constructor(props: P) {
            super({...props, chats: window.store.getState().chats});
        }

        // __onChangedChatCallback = (prevState: AppState, nextState: AppState) => {
        //     if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        //         // @ts-expect-error this is not typed
        //         this.setProps({...this.props, user: nextState.user});
        //     }
        // }

        // componentDidMount(props: P) {
        //     super.componentDidMount(props);
        //     window.store.on('changed', this.__onChangedUserCallback);
        // }

        // componentWillMount() {
        //     super.componentWillMount();
        //     window.store.off('changed', this.__onChangedUserCallback);
        // }
    } as BlockClass<Omit<P, 'chat'>>;
}
