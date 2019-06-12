// 继承module, 返回一个新的module，不会改变原有module
export default function ( baseModule, childModule = {} ) {
  if ( !baseModule )
  {
    return childModule;
  }

  // state的合并比较麻烦，因为state可以是一个函数
  const { state: baseState } = baseModule;
  // 归一化baseModule的state
  const normalizeBaseState = ( typeof baseState === 'function' ) ? baseState() : ( baseState || {} );
  const { state: childState } = childModule;
  // 归一化childModule的state,糅合baseModule的state
  const mergedState = ( typeof childState === 'function' ) ?
    () => ( {
      ...normalizeBaseState,
      ...childState(),
    } ) :
    {
      ...normalizeBaseState,
      ...( childState || {} )
    };

  const merge = ( prop, defaultValue = {} ) => ( {
    ...( baseModule[ prop ] || defaultValue ),
    ...( childModule[ prop ] || defaultValue ),
  } )

  return {
    namespaced: childModule.namespaced || baseModule.namespaced || true,
    state: mergedState,
    getters: merge( 'getters' ),
    mutations: merge( 'mutations' ),
    actions: merge( 'actions' ),
    modules: merge( 'modules' ),
    plugins: merge( 'plugins', [] ),
  }
}