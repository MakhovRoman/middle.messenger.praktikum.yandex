import { BlockClass } from 'core/Block';
import { AppState, User } from '../../typings/app';
import { isEqual } from './isEqual';

type WithUserProps = {user: Nullable<User>};

export function withUser<P extends WithUserProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        static cName = WrappedBlock.cName || WrappedBlock.name;

        constructor(props: P) {
            super({...props, user: window.store.getState().user});
        }

        __onChangedUserCallback = (prevState: AppState, nextState: AppState) => {
            if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
                // @ts-expect-error this is not typed
                this.setProps({...this.props, user: nextState.user});
            }
        }

        componentDidMount(props: P) {
            super.componentDidMount(props);
            window.store.on('changed', this.__onChangedUserCallback);
        }

        componentWillMount() {
            super.componentWillMount();
            window.store.off('changed', this.__onChangedUserCallback);
        }
    } as BlockClass<Omit<P, 'user'>>;
}
