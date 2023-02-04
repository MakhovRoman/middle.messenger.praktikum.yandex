import { Store } from 'core/Store';
import { AppState } from '../../typings/app';
import { BlockClass } from 'core/Block';
import { isEqual } from './isEqual';

type WithStateProps = { store: Store<AppState> };

type MapStateToProps<MappedProps> = (state: AppState) => MappedProps

// eslint-disable-next-line max-len
export function withStore<P extends WithStateProps, MappedProps = any>(WrappedBlock: BlockClass<P>, mapStateToProps?: MapStateToProps<MappedProps>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static cName = WrappedBlock.cName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
      console.log('change store callback', window.store);

      if(typeof mapStateToProps === 'function') {
        const prevPropsFromState = mapStateToProps(prevState);
        const nextPropsFromState = mapStateToProps(nextState);

        if(JSON.stringify(prevPropsFromState) !== JSON.stringify(nextPropsFromState)) {
          //@ts-expect-error
          this.setProps(nextPropsFromState);
        }


        return
      }
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}




// export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
//   // @ts-expect-error No base constructor has the specified
//   return class extends WrappedBlock<P> {
//     public static cName = WrappedBlock.cName || WrappedBlock.name;

//     constructor(props: P) {
//       super({ ...props, store: window.store });
//     }

//     __onChangeStoreCallback = () => {
//       console.log('change store callback', window.store);
//       /**
//        * TODO: проверить что стор реально обновлен
//        * и прокидывать не целый стор, а необходимые поля
//        * с помощью метода mapStateToProps
//        */
//       // @ts-expect-error this is not typed
//       this.setProps({ ...this.props, store: window.store });
//     }

//     componentDidMount(props: P) {
//       super.componentDidMount(props);
//       window.store.on('changed', this.__onChangeStoreCallback);
//     }

//     componentWillUnmount() {
//       super.componentWillUnmount();
//       window.store.off('changed', this.__onChangeStoreCallback);
//     }

//   } as BlockClass<Omit<P, 'store'>>;
// }
